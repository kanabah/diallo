import { ResourcesService } from './../services/resources.service';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { passwordValidator } from './../validators/password-register-validators';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidatorRegister } from '../validators/email-validator-register';
import { telValidatorRegister } from '../validators/telephone-validator-register';
import { SnackBarService } from '../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  etatPadding: boolean = true;

  constructor(private fb:FormBuilder, private userService: UserService, private snackBra: SnackBarService, private router: Router, private load: ResourcesService) { }

  ngOnInit() {
    this.load.loadUser();
  }

  onRedirectToLogin(){
    this.router.navigateByUrl('/login');
    // window.location.reload();
  }
  
  onRegister(){
    this.etatPadding = false;
    this.userService.register(this.registerForm.value).subscribe(res => {
      this.router.navigate(['/login']);
      this.snackBra.openSnackBar('Compte Creer Avec Success!!!', 'Fermer');
      window.location.reload();

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
        asyncValidators: [emailValidatorRegister(this.userService, 'register')],
        updateOn: 'blur'}
     ],
     tel: ['', {
      validators: [
      Validators.required,
        Validators.minLength(9),
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^620|621|622|623|624|625|626|627|628|629|660|661|662|664|666|669|655|656|657/i)
    ],
      asyncValidators: [telValidatorRegister(this.userService)],
      updateOn: 'blur'}
    ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    }, {validator: passwordValidator}
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
      }else if(this.tel.errors.codeErr){
        return 'Code telephone incorect';
      }else if(this.tel.errors.pattern){
        return 'Telephone incorect';
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
      }else if(this.password.errors.errorPassword){
        return 'Mot de passe non identique';
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

  validatorPassword(){
    if(this.passwordConfirm.value.length > 6)
    if(this.registerForm.errors.errorPassword && (this.registerForm.touched || this.registerForm.dirty)){
      return 'Not COOL';
    }
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