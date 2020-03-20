import { PrintClientService } from './../../services/print-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { JsService } from 'src/app/services/js.service';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { telCLientUniqueValidator } from 'src/app/validators/tel-client-validators';
import { emailValidatorClient } from 'src/app/validators/email-client-validators';
import { telUpdateClientValidator } from 'src/app/validators/tel-update-client-validator';
import { emailUpdateClientValidator } from 'src/app/validators/email-update-client-validator';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detaille-client',
  templateUrl: './detaille-client.component.html',
  styleUrls: ['./detaille-client.component.css']
})
export class DetailleClientComponent implements OnInit {
  client$: Observable<Client>;
  client: Client;
  sumTotalPayer: number = 0;

  purcentOm: number = 0;
  purcentST: any = 0;
  purcentMoMo: any = 0;
  purcentTransfert: any = 0;

  purcentCreditOm: any = 0;
  purcentCreditST: any = 0;
  purcentCreditMoMo: any = 0;
  purcentCreditTransfert: any = 0;

  somPayOrangeMoney: any = 0;
  somPayMobileMoney: any = 0;
  somPayStartTimes: any = 0;
  somPayTransfert: any = 0;
  somPayTotal: any = 0;

  somCreditOrangeMoney: any = 0;
  somCreditMobileMoney: any = 0;
  somCreditStartTimes: any = 0;
  somCreditTransfert: any = 0;
  somCreditTotal: any = 0;

  nbCommandeOM = 0;
  nbCommandeMoMo = 0;
  nbCommandeST = 0;
  nbCommandeTransfert = 0;

  faFileUpload = faFileUpload;
  etatPadding: boolean = true;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private js: JsService, private fb:FormBuilder, private _snackBar: MatSnackBar, private router: Router, public print: PrintClientService) { }
  ngOnInit() {
    
    this.detaille();  
    this.client$.subscribe(res => {
      this.client = res;
      
      this.initialiseForms();
      this.calculTransactionClient()    
    })
  }
  
  calculTransactionClient(){
    var sumTotalPayer = 0;
    var sumTotalCredit = 0;

    var purcentPayerOM = 0;
    var purcentPayerST = 0;
    var purcentPayerMoMo = 0;
    var purcentPayerTransfert = 0;

    var somPayerOM = 0;
    var somPayerMoMo = 0;
    var somPayerST = 0;
    var somPayerTransfert = 0;

    var somCreditOM = 0;
    var somCreditMoMo = 0;
    var somCreditST = 0;
    var somCreditTransfert = 0;
    
    var nbCommandeOM = 0;
    var nbCommandeMoMo = 0;
    var nbCommandeST = 0;
    var nbCommandeTransfert = 0;
    

    this.client.commandes.forEach(function(res){
      if(res.delete == 0){
        sumTotalPayer += res.somPay;
        sumTotalCredit += res.somRest;
      }

      if(res.typeCmd == 'OM' && res.delete == 0){
        somPayerOM += res.somPay;
        somCreditOM += res.somRest;
        nbCommandeOM +=1;
      }

      if(res.typeCmd == 'MoMo' && res.delete == 0){
        somPayerMoMo += res.somPay;
        somCreditMoMo += res.somRest;
        nbCommandeMoMo += 1;
      }

      if(res.typeCmd == 'ST' && res.delete == 0){
        somPayerST += res.somPay;
        somCreditST += res.somRest;
        nbCommandeST +=1;
      }

      if(res.typeCmd == 'Transfert' && res.delete == 0){
        somPayerTransfert += res.somPay;
        somCreditTransfert += res.somRest;
        nbCommandeTransfert +=1;
      }

    })

    if(!sumTotalCredit){
      sumTotalCredit = 1;
    }

    if(!sumTotalPayer){
      sumTotalPayer = 1;
    }
    
    //PURCENTAGE SOMME PAYER
    this.purcentOm = Math.round((somPayerOM * 100)/sumTotalPayer); 
    this.purcentMoMo = Math.round((somPayerMoMo * 100)/sumTotalPayer);
    this.purcentST = Math.round((somPayerST * 100)/sumTotalPayer);
    this.purcentTransfert = Math.round((somPayerTransfert * 100)/sumTotalPayer);
    
    this.somPayOrangeMoney = somPayerOM;
    this.somPayMobileMoney = somPayerMoMo;
    this.somPayStartTimes = somPayerST;
    this.somPayTransfert = somPayerTransfert;
    this.somPayTotal = sumTotalPayer;

    //PURCENTAGE CREDIT
    this.purcentCreditOm = Math.round((somCreditOM * 100)/sumTotalCredit);
    this.purcentCreditMoMo = Math.round((somCreditMoMo * 100)/sumTotalCredit);
    this.purcentCreditST = Math.round((somCreditST * 100)/sumTotalCredit);
    this.purcentCreditTransfert = Math.round((somCreditTransfert * 100)/sumTotalCredit);

    this.somCreditOrangeMoney = somCreditOM;
    this.somCreditMobileMoney = somCreditMoMo;
    this.somCreditStartTimes = somCreditST;
    this.somCreditTransfert = somCreditTransfert;
    this.somCreditTotal = sumTotalCredit;
    
    //NOMBRE DES COMMANDE CLIENT

    this.nbCommandeOM = nbCommandeOM;
    this.nbCommandeMoMo = nbCommandeMoMo;
    this.nbCommandeST = nbCommandeST;
    this.nbCommandeTransfert = nbCommandeTransfert;
  }

  getColorProgress(purcent){
    if(purcent <= 20){
      return 'progress-bar progress-red';
    }else if(purcent >20 && purcent <= 55){
      return 'progress-bar progress-green';
    }else if(purcent > 55){
      return 'progress-bar progress-blue'
    }
  }

  getColorProgressCredit(purcent){
    if(purcent <= 20){
      return 'progress-bar progress-blue';
    }else if(purcent >20 && purcent <= 55){
      return 'progress-bar progress-green';
    }else if(purcent > 55){
      return 'progress-bar progress-red'
    }
  }

  getColorText(purcent){
    if(purcent <= 20){
      return 'text-danger';
    }else if(purcent >20 && purcent <= 55){
      return 'text-info';
    }else if(purcent > 55){
      return 'text-success'
    }
  }

  getColorTextCredit(purcent){
    if(purcent <= 20){
      return 'text-success';
    }else if(purcent >20 && purcent <= 55){
      return 'text-info';
    }else if(purcent > 55){
      return 'text-danger'
    }
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

  onUpdateClient(){
    this.etatPadding = false;
    const formData = new FormData();
    formData.append('file', this.avatar.value);

    if((!this.telOrange.value)  && (!this.telMtn.value)  && (!this.telCelcom.value)){
      this.etatPadding = true;
      this.openSnackBar('Vous devez saisir au moins un numero de telephone!!', 'Fermer');
      
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

      if(this.okOrange){
        if(this.okMtn){
          if(this.okCelecom){
            
          }
        }
      }

      if(this.okCelecom || this.okMtn || this.okOrange){
      this.clientService.upload(formData).subscribe(res => {
        this.avatar.setValue(res);
          this.clientService.updateClient(this.route.snapshot.paramMap.get('id'), this.clientForm.value).subscribe(res => {
            this.openSnackBar('Modification reuissie', 'Fermer');
            this.router.navigate(['/client/all'])
          })
        })
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  private initialiseForms(){
    this.clientForm.patchValue({
      nom: this.client.nom,
      prenom: this.client.prenom,
      email: this.client.email ? this.client.email : '',
      telOrange: this.client.telOrange ? this.client.telOrange : '',
      telMtn: this.client.telMtn ? this.client.telMtn : '',
      genre: this.client.genre ? this.client.genre : '',
      telCelcom: this.client.telCelcom ? this.client.telCelcom : '',
      telPerso: this.client.telPerso ? this.client.telPerso : '',
      avatar: this.client.avatar ? this.client.avatar : '',
      adress: {
        commune: this.client.adress.commune ? this.client.adress.commune : '',
        quartier: this.client.adress.quartier ? this.client.adress.quartier : '',
        secteur: this.client.adress.secteur ? this.client.adress.secteur : '',
      },
      description: this.client.description ? this.client.description : '',
      entreprise: this.client.entreprise ? this.client.entreprise : '',
    })
  }

  clientForm = this.fb.group({
    nom: ['', [Validators.required]],
    prenom: ['', [Validators.required]],
    avatar: ['', []],
    telOrange: ['', {
      validators: [
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^620|621|622|623|624|625|626|627|628|629/i)
     ],
      asyncValidators: [telUpdateClientValidator(this.clientService, this.route.snapshot.paramMap.get('id'))],
      updateOn: 'blur'}
   ],
    telMtn: ['', {
      validators: [
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^660|661|662|664|666|669/i)
     ],
      asyncValidators: [telUpdateClientValidator(this.clientService, this.route.snapshot.paramMap.get('id'))],
      updateOn: 'blur'}
   ],
    telCelcom: ['', {
      validators: [
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^655|656|657/i)
     ],
      asyncValidators: [telUpdateClientValidator(this.clientService, this.route.snapshot.paramMap.get('id'))],
      updateOn: 'blur'}
   ],
   telPerso: ['', {
      validators: [
        Validators.pattern(/^[0-9+]{9,9}$/)
     ],
      asyncValidators: [telUpdateClientValidator(this.clientService, this.route.snapshot.paramMap.get('id'))],
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
      asyncValidators: [emailUpdateClientValidator(this.clientService, this.route.snapshot.paramMap.get('id'))],
      updateOn: 'blur'}
   ],
    genre: ['none'], 
  } )

  public afficheTel(){
    if(this.client.telOrange){
      return this.client.telOrange;
    }else if(this.client.telMtn){
      return this.client.telMtn;
    }else if(this.client.telCelcom){
      return this.client.telCelcom;
    }
  }

  private detaille(){
    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.clientService.detaille(params.get('id')))
    );
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
        return 'Le telMtn est requis';
      }else if(this.telMtn.errors.pattern){
        return 'telMtn incorect';
      }else if(this.telMtn.errors.telExist){
        return 'Cet numero est dejat utiliser';
      }else if(this.telMtn.errors.codeErr){
        return 'Verifier le code ';
      }
    }
  }

  getTelMtnSuccess(){
    if(this.telMtn.valid){
      return true;
    }
  }

  getTelCelcomError(){
    if(this.telCelcom.invalid && (this.telCelcom.dirty || this.telCelcom.touched)){
      if(this.telCelcom.errors.required){
        return 'Le telCelcom est requis';
      }else if(this.telCelcom.errors.pattern){
        return 'telCelcom incorect';
      }else if(this.telCelcom.errors.telExist){
        return 'Cet numero est dejat utiliser';
      }else if(this.telCelcom.errors.codeErr){
        return 'Verifier le code ';
      }
    }
  }

  getTelCelcomSuccess(){
    if(this.telCelcom.valid){
      return true;
    }
  }

  getTelPersoError(){
    if(this.telPerso.invalid && (this.telPerso.dirty || this.telPerso.touched)){
      if(this.telPerso.errors.required){
        return 'Le telephone personel est requis';
      }else if(this.telPerso.errors.pattern){
        return 'telphone personel est incorect';
      }else if(this.telPerso.errors.telExist){
        return 'Cet numero est dejat utiliser';
      }
    }
  }

  getTelPersoSuccess(){
    if(this.telPerso.valid){
      return true;
    }
  }

  getTelOrangeError(){
    if(this.telOrange.invalid && (this.telOrange.dirty || this.telOrange.touched)){
      if(this.telOrange.errors.required){
        return 'Le telOrange est requis';
      }else if(this.telOrange.errors.pattern){
        return 'telOrange incorect';
      }else if(this.telOrange.errors.telExist){
        return 'Cet numero est dejat utiliser';
      }else if(this.telOrange.errors.codeErr){
        return 'Verifier le code ';
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

  get telPerso(){
    return this.clientForm.get('telPerso');
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
