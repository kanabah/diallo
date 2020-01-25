import { PrintClientService } from './../../services/print-client.service';
import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { ClientService } from 'src/app/services/client.service';
import { returnInfoClientValidator } from 'src/app/validators/return-info-client-validator';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-content-add-commande-orange-money',
  templateUrl: './dialog-content-add-commande-orange-money.component.html',
  styleUrls: ['./dialog-content-add-commande-orange-money.component.css']
})
export class DialogContentAddCommandeOrangeMoneyComponent implements OnInit, AfterContentChecked {
  nom: string = '';
  prenom: string = '';
  commune: string = '';
  secteur: string = '';
  quartier: string = '';
  ok: boolean = false;
  idClient: string;
  avatar: string;
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
  
  constructor(private fb: FormBuilder, private clientService: ClientService, private changeDedectionRef: ChangeDetectorRef, private snackBar: SnackBarService, private router: Router, public dialogRef: MatDialogRef<DialogContentAddCommandeOrangeMoneyComponent>, private userService: UserService, public print: PrintClientService) { }
  
  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
  }
  
  ngOnInit() {
  }

  test(){
    if(this.somPay.value == '' && this.somRest.value == '' && this.somCredit.value == ''){
      this.verificationChamp =  false;
    }
  }

  onOrangeMoney(){
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
          if(this.getTelOrangeSuccess()){
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
    telOrange: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^620|621|622|623|624|625|626|627|628|629/i)
     ],
      asyncValidators: [returnInfoClientValidator(this.clientService)],
      updateOn: 'blur'}
   ],
   commandes: this.fb.group({
     somPay: ['', [Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]],
     typePay: ['Total', [Validators.required]],
     modePay: ['Cache', [Validators.required]],
     typeCmd: ['OM', []],
     somRest: ['', []],
     somCredit: ['', []],
     traitement: ['0', []],
     reglement: this.fb.group({
      
     })
   }),
   password: ['', [Validators.required, Validators.minLength(6)]]
  })

  getTelOrangeError(){
    if(this.telOrange.invalid && (this.telOrange.dirty || this.telOrange.touched)){
      if(this.telOrange.errors.required){
        return 'Le numero de telephone est requis.';
      }else if(this.telOrange.errors.pattern){
        return 'le numero est incorect.';
      }else if(this.telOrange.errors.client){
        this.nom = this.telOrange.errors.client.value.nom;
        this.prenom = this.telOrange.errors.client.value.prenom;
        this.commune = this.telOrange.errors.client.value.adress.commune;
        this.quartier = this.telOrange.errors.client.value.adress.quartier;
        this.secteur = this.telOrange.errors.client.value.adress.secteur;
        this.idClient = this.telOrange.errors.client.value._id;
        this.avatar = this.telOrange.errors.client.value.avatar;
        this.ok = true;
        this.telOrange.setErrors(null);
      }else if(this.telOrange.errors.codeErr){
        return "Il sagit d'un numero Orange verifier le code.";
      }else if(this.telOrange.errors.telNotExist){
        return "Cet Numero de telephone n'existe pas.";
      }
    }
  }
  
  getTelOrangeSuccess(){
    if(this.telOrange.valid){
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

  get telOrange(){
    return this.payForm.get('telOrange');
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