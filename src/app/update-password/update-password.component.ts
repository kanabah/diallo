import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { passwordUpdate } from '../validators/password-update.validators';
import { passwordUpdateUserValidator } from '../validators/password-confirm-update-user.validators';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UpdatePasswordComponent>, private fb: FormBuilder, public userService: UserService) { }

  ngOnInit() {
  }

  onUpdatePassword(){
    this.userService.updatePassword(this.updatePassword.value, this.userService.getUserDetails()._id).subscribe(res => {
      console.log('resu;tat', res);
      
    })
  }

  updatePassword = this.fb.group({
    passwordEncien: ['', {
      validators: [
       Validators.required,
        Validators.minLength(6),
     ],
      asyncValidators: [passwordUpdate(this.userService)],
      updateOn: 'blur'}
   ],
    passwordNew: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
  }, {validator: passwordUpdateUserValidator});

  onReglement(){
    // this.etatPadding = false;
    // this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    
    // this.userService.login(this.user).subscribe(res => {
    //   if(!res){
    //     this.passwordIncorect = false;
    //     this.etatPadding = true;
    //   }else{
    //       if(this.getMontantSuccess()){
    //         this.clientService.addReglement(this.data.id, this.reglementForm.value, this.data.client_id).subscribe(res => {
    //           this.dialogRef.close();
    //           this.snackBar.openSnackBar('Reglemnt effectuer aves success!!!', 'Fermer');
    //         })
    //       }else{
    //         this.etatPadding = true;
    //       }
    //     }
    //   })
    
  }

  getPasswordEncientError(){
    if(this.passwordEncien.invalid && (this.passwordEncien.dirty || this.passwordEncien.touched)){
      if(this.passwordEncien.errors.required){
        return 'Le Mont de passe est requis.';
      }else if(this.passwordEncien.errors.minlength){
        return 'Au minimum 6 caracters.';
      }else if(this.passwordEncien.errors.passwordWrong){
        return 'Mot de passe incorect.';
      }
    }
  }
  
  getPasswordEncientSuccess(){
    if(this.passwordEncien.valid){
      return true;
    }
  }

  getPasswordNewError(){
    if(this.passwordNew.invalid && (this.passwordNew.dirty || this.passwordNew.touched)){
      if(this.passwordNew.errors.required){
        return 'Le Mont de passe est requis.';
      }else if(this.passwordNew.errors.minlength){
        return 'Au minimum 6 caracters.';
      }
    }
  }
  
  getPasswordNewSuccess(){
    if(this.passwordNew.valid){
      return true;
    }
  }

  getPasswordConfirmError(){
    if(this.passwordConfirm.invalid && (this.passwordConfirm.dirty || this.passwordConfirm.touched)){
      if(this.passwordConfirm.errors.required){
        return 'Le Mont de passe est requis.';
      }else if(this.passwordConfirm.errors.minlength){
        return 'Au minimum 6 caracters.';
      }
    }
  }
  
  getPasswordConfirmSuccess(){
    if(this.passwordConfirm.valid){
      return true;
    }
  }

  get passwordEncien(){
    return this.updatePassword.get('passwordEncien');
  }
  get passwordNew(){
    return this.updatePassword.get('passwordNew');
  }
  get passwordConfirm(){
    return this.updatePassword.get('passwordConfirm');
  }
}
