import { Observable, timer, Subscription } from 'rxjs';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { emailValidatorRegister } from '../validators/email-validator-register';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;
  color: boolean = true;
  subcription: Subscription;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit() {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    observable.subscribe(res => {
      console.log('JE SUIS LA REPONSE');
      // this.cmdTest = [];
      // this.chartByDate();
      
    })

    // this.refresh();
    
  }

  onGoToRegister(){
    this.router.navigate(["/register"]);
  }
  
  ngOnDestroy(){
    // this.subcription.unsubscribe();
  }
    
  ngAfterViewInit(){

      
    // const observable = new Observable(subscriber => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 1000);
    // });

    // observable.subscribe(res => {
    //   // this.chartByDate();
    //   this.load.loadNull()
    // })
    
    //   timer(0, 3000).subscribe(result => {
    //     this.load.loadResources()
    //   })
  }

  onLogin(){
    this.etatPadding = false;
    this.userService.login(this.loginForm.value).subscribe(res => {
      if(!res){
        this.passwordIncorect = false;
        this.etatPadding = true;
      }else{
        if(this.userService.getUserDetails().role != 'admi'){
          // this.load.loadUser();
          this.router.navigate(['/']);
        }else{
          this.router.navigate(['/admi/home']);
        }
      }
    })
  }

  loginForm = this.fb.group({
    email: ['', {
      validators: [
       Validators.required,
        Validators.email,
     ],
      asyncValidators: [emailValidatorRegister(this.userService, 'login')],
      updateOn: 'blur'}
   ],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getEmailError(){
    if(this.email.invalid && (this.email.dirty || this.email.touched)){
      if(this.email.errors.required){
        return 'Le mail est requis';
      }else if(this.email.errors.email){
        return 'Le email est incorect';
      }else if(this.email.errors.emailExist){
        return "Cet email n'existe pas!!!";
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
        return 'Le mot de passe est requis ';
      }else if(this.password.errors.minlength){
        return 'Mot de passe minimum 6 caracters ';
      }
    }
  }

  getPasswordSuccess(){
    if(this.password.valid){
      return true;
    }
  }


  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
