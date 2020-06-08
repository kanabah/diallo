import { NgxSpinnerService } from 'ngx-spinner';
import { WeekService } from './../../services/week.service';
import { returnInfoClientByAdmiValidator } from 'src/app/validators/return-info-client-by-admi.validators';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { Router } from '@angular/router';
import { PrintClientService } from './../../services/print-client.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../interfaces/client';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { telAgenceValidator } from 'src/app/validators/tel-agence-validators';

@Component({
  selector: 'app-commande-recherche-by-client',
  templateUrl: './commande-recherche-by-client.component.html',
  styleUrls: ['./commande-recherche-by-client.component.css']
})
export class CommandeRechercheByClientComponent implements OnInit {
  name: any;
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;
  commandesFilter: any[] = [];
  client: Client[] = [];
  clientFilters: Client[] = [];
  commandes: any[] = [];
  recherche: boolean = true;

  idClient: any;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private fb: FormBuilder, private userService: UserService, private clientService: ClientService, public print: PrintClientService, private router: Router, private week: WeekService, private spiner: NgxSpinnerService) { 
    //Create dummy data
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          value: "items number " + (i + 1)
        }
      );
    }
 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit() {
    
  }

  onRecherche(){
    
    this.formControl.setValue({
      "tel" : '',
      "periode": 'tout',
      "password": ''
    });
    this.recherche = true;
  }

  onSubmit(){
    this.etatPadding = false;
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    this.userService.login(this.user).subscribe(res => {
      if(!res){
        this.passwordIncorect = false;
        this.etatPadding = true;
      }else{
        this.spiner.show();
        this.recherche = false;
        let date = new Date();
        this.clientService.getAllClients().subscribe(res => {
          this.client = res.filter(result => {
            return result._id == this.idClient;
          })
          console.log('CLient', this.client);
          

          this.commandes = this.client[0].commandes.filter(response => {
            var dateCmd = new Date(response.dateCmd);
            if(this.periode.value == 'day'){
              return dateCmd.getDate() == date.getDate() && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear();
            }else if(this.periode.value == 'week'){
              return this.week.getWeekNumber(dateCmd) == this.week.getWeekNumber(date) && dateCmd.getFullYear() == date.getFullYear();
            }else if(this.periode.value == 'month'){
              return dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear();
            }else if(this.periode.value == 'year'){
              return dateCmd.getFullYear() == date.getFullYear();
            }else{
              return response;
            }
          })

          this.spiner.hide();
          this.commandes.sort((a: any, b: any) => a.dateCmd < b.dateCmd ? 1 : a.dateCmd > b.dateCmd ? -1 : 0);
          this.collection = { count: 20, data: this.commandes };
        })
        
        console.log('Je suis laaaa!!');
        
      }
    });
  }

  formControl = this.fb.group({
    tel: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^620|621|622|623|624|625|626|627|628|629|660|661|662|664|666|669|655|656|657/i)
     ],
      asyncValidators: [returnInfoClientByAdmiValidator(this.clientService)],
      updateOn: 'blur'}
   ],
    periode: ['tout', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getDetail(id){
    this.router.navigate(['/admi/commandes-list/total/details', id, this.periode.value]);
  }

  typeCmd(typeCmd){
    if(typeCmd == 'OM'){
      return 'assets/user/img/logo/om1.jpg';
    }else if(typeCmd == 'MoMo'){
      return 'assets/user/img/logo/momo.jpg';
    }else if(typeCmd == 'ST'){
      return 'assets/user/img/logo/images.jpg';
    }else if(typeCmd == 'Transfert'){
      return 'assets/user/img/logo/transfert.jpg';
    }
  }

  // getCreditClient(id){
  //   var sumTotal = 0;
  //   var sumOM = 0;
  //   var sumMoMo = 0;
  //   var sumST = 0;
  //   var sumTransfert = 0;

  //   var clis = this.clients.filter(res => {
  //     return res._id == id
  //   })
  //   clis[0].commandes.forEach(res =>{
  //     sumTotal +=res.somRest;
      
  //     if(res.typeCmd == 'OM'){
  //         sumOM +=res.somRest;
  //     }

  //     if(res.typeCmd == 'MoMo'){
  //         sumMoMo +=res.somRest;
  //     }
  //     if(res.typeCmd == 'ST'){
  //         sumST +=res.somRest;
  //     }
  //     if(res.typeCmd == 'Transfert'){
  //         sumTransfert +=res.somRest;
  //     }
  //   });
    
  //   var resultats = {
  //       somRestOM: sumOM,
  //       somRestMoMo: sumMoMo,
  //       somRestST: sumST,
  //       somRestTransfert: sumTransfert,
  //       somRestTotal: sumTotal,
  //   }

  //   return resultats;
  // }


  getTelError(){
    if(this.tel.invalid && (this.tel.dirty || this.tel.touched)){
      if(this.tel.errors.required){
        return 'Le numero de telephone est requis.';
      }else if(this.tel.errors.pattern){
        return 'le numero est incorect.';
      }else if(this.tel.errors.client){
        // this.nom = this.tel.errors.client.value.nom;
        // this.prenom = this.tel.errors.client.value.prenom;
        // this.commune = this.tel.errors.client.value.adress.commune;
        // this.quartier = this.tel.errors.client.value.adress.quartier;
        // this.secteur = this.tel.errors.client.value.adress.secteur;
        this.idClient = this.tel.errors.client.value._id;
        // this.ok = true;
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

  get tel(){
    return this.formControl.get('tel');
  }

  get password(){
    return this.formControl.get('password');
  }

  get periode(){
    return this.formControl.get('periode');
  }

}
