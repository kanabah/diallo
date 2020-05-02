import { Router } from '@angular/router';
import { GuichetService } from './../../services/guichet.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-coter-user',
  templateUrl: './delete-coter-user.component.html',
  styleUrls: ['./delete-coter-user.component.css']
})
export class DeleteCoterUserComponent implements OnInit {
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;

  constructor(private fb: FormBuilder,private userService: UserService,public dialogRef: MatDialogRef<DeleteCoterUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snacKbar: SnackBarService, private guichetService: GuichetService, private route: Router ) { }

  ngOnInit() {
  }

  confirmForm = this.fb.group({
    password: ['',  [Validators.required, Validators.minLength(6)]]
  })

  onConfirm(){
    this.etatPadding = false;
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    
    this.userService.login(this.user).subscribe(res => {
      if(!res){
        this.passwordIncorect = false;
        this.etatPadding = true;
      }else{
        if(this.data.object == 'delete-guichet'){
          this.guichetService.deleteGuichet(this.data.id).subscribe(res => {
            this.dialogRef.close();
            this.snacKbar.openSnackBar('Suppresion en attente de confirmation!!!', 'Fermer');
            this.route.navigate(['/']);
          });
        }
      }
    })
  }

  onClose(){
    this.dialogRef.close();
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
    return this.confirmForm.get('password');
  }

}
