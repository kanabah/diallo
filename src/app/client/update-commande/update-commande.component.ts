import { ClientService } from './../../services/client.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { returnInfoClientValidator } from 'src/app/validators/return-info-client-validator';

@Component({
  selector: 'app-update-commande',
  templateUrl: './update-commande.component.html',
  styleUrls: ['./update-commande.component.css']
})
export class UpdateCommandeComponent implements OnInit {
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
  commande: any;
  modeModePay: boolean = false;

  etatPadding: boolean = true;
  verificationChamp: boolean = true;


  select(event){
    this.modeModePay = true;
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

  defaultSelect(){
    if(!this.modeModePay){
      if(this.commande.typePay === 'Tranche'){
      
        this.ngSomRest = true;
        this.ngSomPay = true;
        this.ngSomCredit = false;
  
        this.somCredit.setValue('');
  
        this.somPay.setValidators([Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]);
        this.somRest.setValidators([Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]);
        this.somCredit.clearValidators();
  
      }else if(this.commande.typePay === 'Credit'){
        this.ngSomRest = false;
        this.ngSomPay = false;
        this.ngSomCredit = true;
  
        this.somPay.setValue('');
        this.somRest.setValue('');
        
        this.somPay.clearValidators();
        this.somRest.clearValidators();
        this.somCredit.setValidators([Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]);
        
      }else if(this.commande.typePay === 'Total'){
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
  }

  
  
  constructor(private clientService: ClientService, private snackBar: SnackBarService ,private fb: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<UpdateCommandeComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private changeDedectionRef: ChangeDetectorRef) { }

  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
  }
  
  ngOnInit() {
    this.clientService.getCommande(this.data.cmd_id, this.data.client_id).subscribe(res => {
      this.commande = res[0];
      this.initialiseForms();
      this.defaultSelect()
    })
  }

  private initialiseForms(){
    this.payForm.patchValue({
      commandes:{
        modePay: this.commande.modePay ? this.commande.modePay : '',
        typePay: this.commande.typePay ? this.commande.typePay : '',
        somPay: this.commande.somPay,
        somRest: this.commande.somRest ? this.commande.somRest : '',
        somCredit: this.commande.somCredit ? this.commande.somCredit : '',
        opperateur: this.commande.opperateur ? this.commande.opperateur : '',
        nbStartTimes: this.commande.nbStartTimes ? this.commande.nbStartTimes : '',
        typeCmd: this.commande.typeCmd ? this.commande.typeCmd : '',
      }
      
    })
  }

  onUpdate(){
    this.etatPadding = false;

    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
  
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

          console.log('Type Commande', this.typeCmd.value);
          
          if(this.typeCmd.value == 'ST'){
            if(!this.nbStartTimes.value){
              this.snackBar.openSnackBar('Le nombre de decodeur est requis', 'Quitter');
              return;
            }
          }

          this.clientService.onUpdateCommande(this.data.cmd_id, this.data.client_id,this.userService.getUserDetails()._id, this.payForm.value).subscribe(res => {
            this.snackBar.openSnackBar('Commande Modifier Avec Success!!!', 'Fermer');
            this.dialogRef.close();
          })
        }
      })
    
  }

  payForm = this.fb.group({
   commandes: this.fb.group({
     somPay: ['', [Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]],
     typePay: ['Total', [Validators.required]],
     modePay: ['Cache', [Validators.required]],
     typeCmd: ['OM', []],
     somRest: ['', []],
     somCredit: ['', []],
     opperateur: ['', []],
     nbStartTimes: ['', [Validators.min(1) ,Validators.pattern(/^[0-9+]{1,}$/)]],
     traitement: ['0', []],
     reglement: this.fb.group({
      
     })
   }),
   password: ['', [Validators.required, Validators.minLength(6)]]
  })

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


  get traitement(){
    return this.payForm.get('commandes.traitement');
  }
  
  get typeCmd(){
    return this.payForm.get('commandes.typeCmd');
  }
  
  get nbStartTimes(){
    return this.payForm.get('commandes.nbStartTimes');
  }

  get modePay(){
    return this.payForm.get('commandes.modePay');
  }
  get opperateur(){
    return this.payForm.get('commandes.opperateur');
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
