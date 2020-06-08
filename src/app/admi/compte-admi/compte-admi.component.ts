import { NgxSpinnerService } from 'ngx-spinner';
import { User } from './../../interfaces/user';
import { updateTelUserValidator } from 'src/app/validators/update-tel-user.validators';
import { UpdatePasswordComponent } from './../../update-password/update-password.component';
import { PrintClientService } from './../../services/print-client.service';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { updateEmailUserValidator } from 'src/app/validators/update-email-user.validators';

@Component({
  selector: 'app-compte-admi',
  templateUrl: './compte-admi.component.html',
  styleUrls: ['./compte-admi.component.css']
})
export class CompteAdmiComponent implements OnInit {
  user: User;
  etatPadding: boolean = true;

  constructor(public dialog: MatDialog, public print: PrintClientService, public userService: UserService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private snackBar: SnackBarService, private spiner: NgxSpinnerService) { }

  ngOnInit() {
    this.getUser();
  }

  changePassword(){
    const dialogRef = this.dialog.open(UpdatePasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onUpdateUser(){
    this.etatPadding = false;
    this.userService.updateUser(this.userService.getUserDetails()._id, this.registerForm.value).subscribe(res => {
      this.snackBar.openSnackBar('Modification Reuissie', 'Fermer');
      this.router.navigate(['/admi/home']);
    })
  }

  getUser(){
    this.spiner.show();
    this.userService.profile().subscribe(res => {
      this.user = res;
      this.initialiseForms();
      this.spiner.hide();
    })
  }

  registerForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      nameAgence: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      email: ['', {
        validators: [
         Validators.required,
          Validators.email,
       ],
        asyncValidators: [updateEmailUserValidator(this.userService, this.userService.getUserDetails()._id) ],
        updateOn: 'blur'}
     ],
     tel: ['', {
      validators: [
      Validators.required,
        Validators.minLength(9),
    ],
      asyncValidators: [updateTelUserValidator(this.userService, this.userService.getUserDetails()._id)],
      updateOn: 'blur'}
    ]
    }
  );


  getNameError(){
    if(this.name.invalid && (this.name.dirty || this.name.touched)){
      if(this.name.errors.required){
        return 'Le nom est requis';
      }else if(this.name.errors.minLength){
        return 'Nom incorect';
      }
    }
  }

  getNameSuccess(){
    if(this.name.valid){
      return true;
    }
  }

  getNameAgenceError(){
    if(this.nameAgence.invalid && (this.nameAgence.dirty || this.nameAgence.touched)){
      if(this.nameAgence.errors.required){
        return "Le nom de l'agence est requis";
      }else if(this.nameAgence.errors.minLength){
        return 'Nom Agence incorect';
      }
    }
  }

  getNameAgenceSuccess(){
    if(this.nameAgence.valid){
      return true;
    }
  }

  getAdressError(){
    if(this.adress.invalid && (this.adress.dirty || this.adress.touched)){
      if(this.adress.errors.required){
        return "L'adresse de l'agence est requis";
      }else if(this.adress.errors.minLength){
        return 'Adresse incorect';
      }
    }
  }

  getAdressSuccess(){
    if(this.adress.valid){
      return true;
    }
  }

  getTelError(){
    if(this.tel.invalid && (this.tel.dirty || this.tel.touched)){
      if(this.tel.errors.required){
        return "Le telephone de l'agence est requis";
      }else if(this.tel.errors.minLength){
        return 'Telephone incorect';
      }else if(this.tel.errors.telExist){
        return 'Cet numero est deja utiliser';
      }
    }
  }

  getTelSuccess(){
    if(this.tel.valid){
      return true;
    }
  }

  getEmailError(){
    if(this.email.invalid && (this.email.dirty || this.email.touched)){
      if(this.email.errors.required){
        return 'Le mail est requis';
      }else if(this.email.errors.email){
        return 'Le email est incorect';
      }else if(this.email.errors.emailExist){
        return 'Cet email est deja utiliser';
      }
    }
  }

  getEmailSuccess(){
    if(this.email.valid){
      return true;
    }
  }

  getPasswordError(){
    if(this.password.invalid && (this.password.dirty || this.password.touched)){
      if(this.password.errors.required){
        return 'Le mot de passe est requis';
      }else if(this.password.errors.minlength){
        return 'Mot de passe minimum 6 caracters';
      }
    }
  }

  getPasswordSuccess(){
    if(this.password.valid){
      return true;
    }
  }

  
  getPasswordConfirmError(){
    if(this.passwordConfirm.invalid && (this.passwordConfirm.dirty || this.passwordConfirm.touched)){
      if(this.passwordConfirm.errors.required){
        return 'Champs requis';
      }else if(this.passwordConfirm.errors.minlength){
        return 'Au moins 6 caractres'
      }
    }
  }

  getPasswordConfirmSuccess(){
    if(this.passwordConfirm.valid){
      return true;
    }
  }

  private initialiseForms(){
    this.registerForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      nameAgence: this.user.nameAgence,
      adress: this.user.adress,
      tel: this.user.tel
    })
  }

  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  }
  get nameAgence(){
    return this.registerForm.get('nameAgence');
  }

  get adress(){
    return this.registerForm.get('adress');
  }

  get tel(){
    return this.registerForm.get('tel');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get passwordConfirm(){
    return this.registerForm.get('passwordConfirm');
  }
}
