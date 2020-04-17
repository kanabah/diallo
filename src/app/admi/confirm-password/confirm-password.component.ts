import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;

  constructor(private fb: FormBuilder,private userService: UserService,public dialogRef: MatDialogRef<ConfirmPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snacKbar: SnackBarService) { }

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
        if(this.data.object == 'confirm'){
          this.userService.acpetUser(this.data.id).subscribe(res => {
            this.dialogRef.close();
            this.snacKbar.openSnackBar('Agence Accpter Avec Success!!!', 'Fermer');
          });
        }

        if(this.data.object == 'decline'){
          this.userService.declineUser(this.data.id).subscribe(res => {
          this.dialogRef.close();
            this.snacKbar.openSnackBar('Agence Supprimer Avec Success!!!', 'Fermer');
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
