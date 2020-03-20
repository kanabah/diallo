import { returnInfoClientValidator } from 'src/app/validators/return-info-client-validator';
import { ClientService } from './../../services/client.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-dialog-content-add-transfert',
  templateUrl: './dialog-content-add-transfert.component.html',
  styleUrls: ['./dialog-content-add-transfert.component.css']
})
export class DialogContentAddTransfertComponent implements OnInit {
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
  
  constructor(private fb: FormBuilder, private clientService: ClientService, private changeDedectionRef: ChangeDetectorRef, private snackBar: SnackBarService, private router: Router, public dialogRef: MatDialogRef<DialogContentAddTransfertComponent>, private userService: UserService) { }
  
  ngAfterContentChecked(): void {
    this.changeDedectionRef.detectChanges();
  }
  
  ngOnInit() {
  }

  test(){
    if(this.somCredit.value == ''){
      this.verificationChamp =  false;
    }
  }

  onTransfert(){ 
    this.etatPadding = false;
    this.test();
   
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    
    if(this.verificationChamp){
      this.userService.login(this.user).subscribe(res => {
        if(!res){
          this.passwordIncorect = false;
          this.etatPadding = true;
        }else{
          this.somRest.setValue(this.somCredit.value);

          if(this.getTelTransfertSuccess()){
            this.clientService.addCommande(this.idClient, this.payForm.value, this.userService.getUserDetails()._id).subscribe(res => {
              this.snackBar.openSnackBar('Rechargement Effectuer avec success!!!', 'Fermer');
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
    telTransfert: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^620|621|622|623|624|625|626|627|628|629|660|661|662|664|666|669|655|656|657/i)
     ],
      asyncValidators: [returnInfoClientValidator(this.clientService)],
      updateOn: 'blur'}
   ],
   commandes: this.fb.group({
     somCredit: ['', [Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]],
     traitement: ['1', []],
     typePay: ['Credit', []],
     somPay: ['', []],
     modePay: ['Cache', []],
     somRest: ['', []],
     typeCmd: ['Transfert', []], //Je laisse Le typeCmd a "Transfert" pour ne pas me fatiguer a modifier la logique.
     reglement: this.fb.group({
      
     })
   }),
   password: ['', [Validators.required, Validators.minLength(6)]]
  })

  getTelTransfertError(){
    if(this.telTransfert.invalid && (this.telTransfert.dirty || this.telTransfert.touched)){
      if(this.telTransfert.errors.required){
        return 'Le numero de telephone est requis.';
      }else if(this.telTransfert.errors.pattern){
        return 'le numero est incorect.';
      }else if(this.telTransfert.errors.client){
        this.nom = this.telTransfert.errors.client.value.nom;
        this.prenom = this.telTransfert.errors.client.value.prenom;
        this.commune = this.telTransfert.errors.client.value.adress.commune;
        this.quartier = this.telTransfert.errors.client.value.adress.quartier;
        this.secteur = this.telTransfert.errors.client.value.adress.secteur;
        this.idClient = this.telTransfert.errors.client.value._id;
        this.ok = true;
        this.telTransfert.setErrors(null);
      }else if(this.telTransfert.errors.codeErr){
        return "Verifier le code du numero.";
      }else if(this.telTransfert.errors.telNotExist){
        return "Cet Numero de telephone n'existe pas.";
      }
    }
  }
  
  getTelTransfertSuccess(){
    if(this.telTransfert.valid){
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

  get telTransfert(){
    return this.payForm.get('telTransfert');
  }

  get somCredit(){
    return this.payForm.get('commandes.somCredit');
  }

  get somRest(){
    return this.payForm.get('commandes.somRest');
  }
  get password(){
    return this.payForm.get('password');
  }

}
