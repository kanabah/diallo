import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { timer } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { telCLientUniqueValidator } from 'src/app/validators/tel-client-validators';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { emailValidatorClient } from 'src/app/validators/email-client-validators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  faFileUpload = faFileUpload;
  etatPadding: boolean = true;

  constructor(private fb: FormBuilder, private clientService: ClientService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    
  }

  //================DEBUT UPLOADE IMAGE AVATAR============================================
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.clientForm.get('avatar').setValue(file);
      // console.log('AVATAR', this.clientForm.get('avatar').value);
      
    }
  }
  //================FIN UPLOADE IMAGE AVATAR============================================
  okOrange: boolean = false;
  okMtn: boolean = false;
  okCelecom: boolean = false;

  onSubmit(){
    this.etatPadding = false;
    const formData = new FormData();
    formData.append('file', this.clientForm.get('avatar').value);
  
    if((!this.telOrange.value)  && (!this.telMtn.value)  && (!this.telCelcom.value)){
      this.openSnackBar('Vous devez saisir au moins un numero de telephone!!', 'Fermer');
      this.etatPadding = true;
    }else{
      if(this.telOrange.value != ''){
        if(this.getTelOrangeSuccess()){
          this.okOrange = true;
        }else{
          this.etatPadding = true;
        }
      }

      if(this.telMtn.value != ''){
        if(this.getTelMtnSuccess()){
          this.okMtn = true;
        }else{
          this.etatPadding = true;
        }
      }

      if(this.telCelcom.value != ''){
        if(this.getTelCelcomSuccess()){
          this.okCelecom = true;
        }else{
          this.etatPadding = true;
        }
      }

      if(this.okCelecom || this.okMtn || this.okOrange){
        this.clientService.upload(formData).subscribe(res => {
          this.avatar.setValue(res);

          this.clientService.addClient(this.clientForm.value).subscribe(res => {
            this.openSnackBar('Client ajouter avec success', 'Fermer');
            this.router.navigate(['/']);
          })
        });
      }else{
        // this.etatPadding = true;
      }      
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  clientForm = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    avatar: ['', []],
    telOrange: ['', {
      validators: [
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^620|621|622|623|624|625|626|627|628|629/i)
     ],
      asyncValidators: [telCLientUniqueValidator(this.clientService)],
      updateOn: 'blur'}
   ],
    telMtn: ['', {
      validators: [
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^660|661|662|664|666|669/i)
     ],
      asyncValidators: [telCLientUniqueValidator(this.clientService)],
      updateOn: 'blur'}
   ],
    telCelcom: ['', {
      validators: [
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^655|656|657/i)
     ],
      asyncValidators: [telCLientUniqueValidator(this.clientService)],
      updateOn: 'blur'}
   ],
    adress: this.fb.group({
      commune: ['none'],
      quartier: [''],
      secteur: ['']
    }),
    entreprise: [''],
    description: [''],
    email: ['', {
      validators: [
        Validators.email
     ],
      asyncValidators: [emailValidatorClient(this.clientService)],
      updateOn: 'blur'}
   ],
    genre: ['none'],
  } )

  
  onChange($event){
    console.log($event);
    
  }

  getNomError(){
    if(this.nom.invalid && (this.nom.dirty || this.nom.touched)){
      if(this.nom.errors.required){
        return 'Le nom est requis';
      }else if(this.nom.errors.minLength){
        return 'Nom incorect';
      }
    }
  }

  getNomSuccess(){
    if(this.nom.valid){
      return true;
    }
  }

  getPrenomError(){
    if(this.prenom.invalid && (this.prenom.dirty || this.prenom.touched)){
      if(this.prenom.errors.required){
        return 'Le prenom est requis';
      }else if(this.prenom.errors.minLength){
        return 'Prenom incorect';
      }
    }
  }

  getPrenomSuccess(){
    if(this.prenom.valid){
      return true;
    }
  }

  getTelMtnError(){
    if(this.telMtn.invalid && (this.telMtn.dirty || this.telMtn.touched)){
      if(this.telMtn.errors.required){
        return 'Le numero de telephone est requis';
      }else if(this.telMtn.errors.pattern){
        return 'Numero telephone incorect';
      }else if(this.telMtn.errors.telExist){
        return 'Cet numero est dejat utiliser';
      }else if(this.telMtn.errors.codeErr){
        return "Le code MTN n'est pas valide";
      }
    }
  }

  getTelMtnSuccess(){
    if(this.telMtn.valid){
      return true;
    }
  }

  
  sucessMtn(){
    if(this.telMtn.valid || this.telMtn.value == ''){
      return true;
    }
  }

  
  sucessOrange(){
    if(this.telOrange.valid || this.telOrange.value == ''){
      return true;
    }
  }

  
  successCelcom(){
    if(this.telCelcom.valid || this.telCelcom.value == ''){
      return true;
    }
  }

  getTelCelcomError(){
    if(this.telCelcom.invalid && (this.telCelcom.dirty || this.telCelcom.touched)){
      if(this.telCelcom.errors.required){
        return 'Le numero de telephone est requis';
      }else if(this.telCelcom.errors.pattern){
        return 'Numero telephone incorect';
      }else if(this.telCelcom.errors.telExist){
        return 'Cet numero est dejat utiliser';
      }else if(this.telCelcom.errors.codeErr){
        return "Le code Celcom n'est pas valide";
      }
    }
  }

  getTelCelcomSuccess(){
    if(this.telCelcom.valid){
      return true;
    }
  }

  getTelOrangeError(){
    if(this.telOrange.invalid && (this.telOrange.dirty || this.telOrange.touched)){
      if(this.telOrange.errors.required){
        return 'Le numero de telephone est requis';
      }else if(this.telOrange.errors.pattern){
        return 'Numero telephone incorect';
      }else if(this.telOrange.errors.telExist){
        return 'Cet numero est dejat utiliser';
      }else if(this.telOrange.errors.codeErr){
        return "Le code Orange n'est pas valide";
      }
    }
  }
  
  getTelOrangeSuccess(){
    if(this.telOrange.valid){
      return true;
    }
  }

  getEmailError(){
    if(this.email.invalid && (this.email.dirty || this.email.touched)){
      if(this.email.errors.email){
        return 'Email Incorect';
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

  get nom(){
    return this.clientForm.get('nom');
  }

  get prenom(){
    return this.clientForm.get('prenom');
  }

  get telOrange(){
    return this.clientForm.get('telOrange');
  }

  get telMtn(){
    return this.clientForm.get('telMtn');
  }

  get telCelcom(){
    return this.clientForm.get('telCelcom');
  }

  get nomEntreprise(){
    return this.clientForm.get('nomEntreprise');
  }

  get description(){
    return this.clientForm.get('description');
  }

  get email(){
    return this.clientForm.get('email');
  }

  get genre(){
    return this.clientForm.get('genre');
  }

  get commune(){
    return this.clientForm.get('adress.commune');
  }

  get quartier(){
    return this.clientForm.get('adress.quartier');
  }

  get secteur(){
    return this.clientForm.get('adress.secteur');
  }

  get avatar(){
    return this.clientForm.get('avatar');
  }

}