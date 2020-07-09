import { User } from './../../interfaces/user';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from './../../services/snack-bar.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-attribute-role',
  templateUrl: './attribute-role.component.html',
  styleUrls: ['./attribute-role.component.css']
})
export class AttributeRoleComponent implements OnInit {
  users: User[] = [];
  promoteur: boolean = false;
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;

  constructor(private fb: FormBuilder,private userService: UserService,public dialogRef: MatDialogRef<AttributeRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snacKbar: SnackBarService) { }

  ngOnInit() {
    this.getAllUsersActive();
  }

  select(event){
    if(event.target.value === 'promoteur'){
      this.promoteur = true;
      this.agence_id.setValue('Select')
      this.agence_id.setValidators([Validators.required]);
    }

    if(event.target.value === 'user'){
      this.promoteur = false;
      this.agence_id.setValidators(null);
      this.agence_id.setValue('')
    }

    if(event.target.value === 'guichet'){
      this.promoteur = false;
      this.agence_id.setValidators(null);
      this.agence_id.setValue('')
    }
  }

  controlForm = this.fb.group({
    role: ['user', [Validators.required]],
    agence_id: [''],
    password: ['', [Validators.required]]
  });

  onSubmit(){
    this.etatPadding = false;
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    
    if(this.agence_id.value == 'Select'){
      this.snacKbar.openSnackBar("Vous Devez Choisir L'Agence", "Quitter");
    }else{
      this.userService.login(this.user).subscribe(res => {
        if(!res){
          this.passwordIncorect = false;
          this.etatPadding = true;
        }else{
          this.userService.attriButeRole(this.data.id, this.role.value, this.agence_id.value).subscribe(res => {
            this.dialogRef.close();
            this.snacKbar.openSnackBar("Attribution Role Reuissie!!!", "Quitter");
          })
        }

      })  
    }
    // console.log('ùControl Form', this.data.id);
    
  }

  getAllUsersActive(){
    this.userService.getAllUsersActive().subscribe(res => {
      this.users = res;
    })
  }

  get role(){
    return this.controlForm.get('role');
  }

  get agence_id(){
    return this.controlForm.get('agence_id');
  }

  getPasswordError(){
    if(this.password.invalid && (this.password.dirty || this.password.touched)){
      if(this.password.errors.required){
        return 'Le Mont de passe est requis.';
      }else if(this.password.errors.minlength){
        return 'Au minimum 6 caracters.';
      }
    }
  }
  
  getPasswordSuccess(){
    if(this.password.valid){
      return true;
    }
  }
  
  get password(){
    return this.controlForm.get('password');
  }

}
