import { returnInfoClientValidator } from 'src/app/validators/return-info-client-validator';
import { ClientService } from './../../services/client.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';

@Component({
  selector: 'app-dialog-content-add-start-times',
  templateUrl: './dialog-content-add-start-times.component.html',
  styleUrls: ['./dialog-content-add-start-times.component.css']
})
export class DialogContentAddStartTimesComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  commune: string = '';
  secteur: string = '';
  quartier: string = '';
  ok: boolean = false;
  idClient: string;
  ngSomPay: boolean = true;
  ngSomRest: boolean = false;
  ngSomDoit: boolean = true;
  ngSomCredit: boolean = false;
  passwordIncorect= true;
  user: any;

  etatPadding: boolean = true;
  verificationChamp: boolean = true;

  select(event){
    if(event.target.value === 'Tranche'){
      this.ngSomRest = true;
      this.ngSomPay = true;
      this.ngSomCredit = false;

      this.somCredit.setValue('');

      this.somPay.setValidators([Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]);
      this.somRest.setValidators([Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]);
      this.somCredit.clearValidators();

    }else if(event.target.value === 'Credit'){
      this.ngSomRest = false;
      this.ngSomPay = false;
      this.ngSomCredit = true;

      this.somPay.setValue('');
      this.somRest.setValue('');
      
      this.somPay.clearValidators();
      this.somRest.clearValidators();
      this.somCredit.setValidators([Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]);
      
    }else if(event.target.value === 'Total'){
      this.ngSomRest = false;
      this.ngSomPay = true;
      this.ngSomCredit = false;

      this.somRest.setValue('');
      this.somCredit.setValue('');

      this.somPay.setValidators([Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]);
      this.somRest.clearValidators();
      this.somCredit.clearValidators();
    }
    this.somPay.updateValueAndValidity();
    this.somRest.updateValueAndValidity();
    this.somCredit.updateValueAndValidity();
  }
  
  constructor(private fb: FormBuilder, private clientService: ClientService, private changeDedectionRef: ChangeDetectorRef, private snackBar: SnackBarService, private router: Router, public dialogRef: MatDialogRef<DialogContentAddStartTimesComponent>, private userService: UserService) { }
  
  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
  }
  
  ngOnInit() {
  }

  test(){
    if(this.somPay.value == '' && this.somRest.value == '' && this.somCredit.value == '' && this.nbStartTimes.value == ''){
      this.verificationChamp =  false;
    }
  }


  onStartTimes(){
    this.etatPadding = false;
    this.test();
    
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};

    if(this.verificationChamp){ 
      
      this.userService.login(this.user).subscribe(res => {
        if(!res){
          this.passwordIncorect = false;
          this.etatPadding = true;
        }else{
          if(this.typePay.value == 'Tranche'){
            this.traitement.setValue(1);
          }else if(this.typePay.value == 'Credit'){
            this.traitement.setValue(1);
          }

          if(this.typePay.value == 'Credit'){
            this.somRest.setValue(this.somCredit.value);
          }

          if(this.getTelSuccess()){
            this.clientService.addCommande(this.idClient, this.payForm.value, this.userService.getUserDetails()._id).subscribe(res => {
              this.snackBar.openSnackBar('Commande Ajouter Avec Success!!!', 'Fermer');
              this.etatPadding = true;
              this.dialogRef.close();
            })
          }else{
            this.etatPadding = true;
          }
        }
      })
    }else{
      this.snackBar.openSnackBar('Veuiller Remplire tout les champs', 'Fermer');
    }
  }

  payForm = this.fb.group({
    tel: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^620|621|622|623|624|625|626|627|628|629|660|661|662|664|666|669|655|656|657/i)
     ],
      asyncValidators: [returnInfoClientValidator(this.clientService)],
      updateOn: 'blur'}
   ],
   commandes: this.fb.group({
     somPay: ['', [Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]],
     typePay: ['Total', [Validators.required]],
     modePay: ['Cache', [Validators.required]],
     typeCmd: ['ST', []],
     somRest: ['', []],
     somCredit: ['', []],
     traitement: ['0', []],
     nbStartTimes: ['', [Validators.required, Validators.min(1) ,Validators.pattern(/^[0-9+]{1,}$/)]],
     reglement: this.fb.group({
      
     })
   }),
   password: ['', [Validators.required, Validators.minLength(6)]]
  })

  getTelError(){
    if(this.tel.invalid && (this.tel.dirty || this.tel.touched)){
      if(this.tel.errors.required){
        return 'Le numero de telephone est requis.';
      }else if(this.tel.errors.pattern){
        return 'le numero est incorect.';
      }else if(this.tel.errors.client){
        this.nom = this.tel.errors.client.value.nom;
        this.prenom = this.tel.errors.client.value.prenom;
        this.commune = this.tel.errors.client.value.adress.commune;
        this.quartier = this.tel.errors.client.value.adress.quartier;
        this.secteur = this.tel.errors.client.value.adress.secteur;
        this.idClient = this.tel.errors.client.value._id;
        this.ok = true;
        this.tel.setErrors(null);
      }else if(this.tel.errors.codeErr){
        return "Verifier le code.";
      }else if(this.tel.errors.telNotExist){
        return "Cet Numero de telephone n'existe pas.";
      }
    }
  }
  
  getTelSuccess(){
    if(this.tel.valid){
      return true;
    }
  }

  getSomPayError(){
    if(this.somPay.invalid && (this.somPay.dirty || this.somPay.touched)){
      if(this.somPay.errors.required){
        return 'Cet Montant est requis.';
      }else if(this.somPay.errors.pattern){
        return 'Montant Incorect';
      }
    }
  }
  
  getSomPaySuccess(){
    if(this.somPay.valid){
      return true;
    }
  }

  getNbStartTimesError(){
    if(this.nbStartTimes.invalid && (this.nbStartTimes.dirty || this.nbStartTimes.touched)){
      if(this.nbStartTimes.errors.required){
        return 'Le nombre est requis.';
      }else if(this.nbStartTimes.errors.pattern){
        return 'Nombre Incorect';
      }else if(this.nbStartTimes.errors.min){
        return 'Minimun 1 decodeur';
      }
    }
  }
  
  getNbStartTimesSuccess(){
    if(this.nbStartTimes.valid){
      return true;
    }
  }

  getSomRestError(){
    if(this.somRest.invalid && (this.somRest.dirty || this.somRest.touched)){
      if(this.somRest.errors.required){
        return 'Cet Montant est requis';
      }else if(this.somRest.errors.pattern){
        return 'Montant incorect';
      }
    }
  }
  
  getSomRestSuccess(){
    if(this.somRest.valid){
      return true;
    }
  }
  getSomCreditError(){
    if(this.somCredit.invalid && (this.somCredit.dirty || this.somCredit.touched)){
      if(this.somCredit.errors.required){
        return 'Cet Montant est requis';
      }else if(this.somCredit.errors.pattern){
        return 'Montant incorect';
      }
    }
  }
  
  getSomCreditSuccess(){
    if(this.somCredit.valid){
      return true;
    }
  }

  getPasswordError(){
    if(this.password.invalid && (this.password.dirty || this.password.touched)){
      if(this.password.errors.required){
        return 'Le Mont de passe est requis.';
      }else if(this.password.errors.minlength){
        return 'Le mot de passe doit avoir au minimum 6 caracters.';
      }
    }
  }
  
  getPasswordSuccess(){
    if(this.password.valid){
      return true;
    }
  }

  get traitement(){
    return this.payForm.get('commandes.traitement');
  }

  get nbStartTimes(){
    return this.payForm.get('commandes.nbStartTimes');
  }

  get tel(){
    return this.payForm.get('tel');
  }
  
  get modePay(){
    return this.payForm.get('commandes.modePay');
  }
  get typePay(){
    return this.payForm.get('commandes.typePay');
  }
  get somPay(){
    return this.payForm.get('commandes.somPay');
  }
  get somRest(){
    return this.payForm.get('commandes.somRest');
  }
  get somCredit(){
    return this.payForm.get('commandes.somCredit');
  }
  get password(){
    return this.payForm.get('password');
  }

}
