import { FormBuilder, Validators } from '@angular/forms';
import { timer, Observable } from 'rxjs';
import { ResourcesService } from './services/resources.service';
import { Component, OnInit } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { UserService } from './services/user.service';
import { JsService } from './services/js.service';
import { emailValidatorRegister } from './validators/email-validator-register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;



  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, public userService: UserService, private js: JsService, private load: ResourcesService,private fb: FormBuilder, private router: Router,) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  ngOnInit(){
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
    // })

      
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
