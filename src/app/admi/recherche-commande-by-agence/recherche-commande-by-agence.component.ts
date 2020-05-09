import { WeekService } from './../../services/week.service';
import { Router } from '@angular/router';
import { PrintClientService } from './../../services/print-client.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../interfaces/client';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { telAgenceValidator } from 'src/app/validators/tel-agence-validators';

@Component({
  selector: 'app-recherche-commande-by-agence',
  templateUrl: './recherche-commande-by-agence.component.html',
  styleUrls: ['./recherche-commande-by-agence.component.css']
})
export class RechercheCommandeByAgenceComponent implements OnInit {
  idUser: any;
  name: any;
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;
  commandesFilter: Client[] = [];
  clients: Client[] = [];
  clientFilters: Client[] = [];
  commandes: any[] = [];
  recherche: boolean = true;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private fb: FormBuilder, private userService: UserService, private clientService: ClientService, public print: PrintClientService, private router: Router, private week: WeekService) { 
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
        this.recherche = false;
        let date = new Date();
        this.clientService.getAllClients().subscribe(res => {
          this.commandesFilter = res;
          this.clients = this.commandesFilter.filter(result => {
            var deteCmdUpdate = new Date(result.deteCmdUpdate)
            if(result.user_id._id == this.idUser && result.nbCmd != 0){

              if(this.periode.value == 'tout'){
                return result;
              }
              else if(this.periode.value == 'day'){
                return deteCmdUpdate.getDate() == date.getDate() && deteCmdUpdate.getMonth() == date.getMonth() && deteCmdUpdate.getFullYear() == date.getFullYear();
              }
              else if(this.periode.value == 'week'){
                return this.week.getWeekNumber(deteCmdUpdate) == this.week.getWeekNumber(date) && deteCmdUpdate.getFullYear() == date.getFullYear();
              }
              else if(this.periode.value == 'month'){
                return deteCmdUpdate.getMonth() == date.getMonth() && deteCmdUpdate.getFullYear() == date.getFullYear();
              }
              else if(this.periode.value == 'year'){
                return deteCmdUpdate.getFullYear() == date.getFullYear();
              }
            }
          });


          this.clients.sort((a: any, b: any) => a.deteCmdUpdate < b.deteCmdUpdate ? 1 : a.deteCmdUpdate > b.deteCmdUpdate ? -1 : 0);
          this.collection = { count: 20, data: this.clients };
        })
        
        console.log('Je suis laaaa!!');
        
      }
    });
  }

  formControl = this.fb.group({
    tel: ['', {
      validators: [Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/)
     ],
      asyncValidators: [telAgenceValidator(this.userService)],
      updateOn: 'blur'}
    ],
    periode: ['tout', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getDetail(id){
    this.router.navigate(['/admi/commandes-list/total/details', id, this.periode.value]);
  }

  getCreditClient(id){
    var sumTotal = 0;
    var sumOM = 0;
    var sumMoMo = 0;
    var sumST = 0;
    var sumTransfert = 0;

    var clis = this.clients.filter(res => {
      return res._id == id
    })
    clis[0].commandes.forEach(res =>{
      sumTotal +=res.somRest;
      
      if(res.typeCmd == 'OM'){
          sumOM +=res.somRest;
      }

      if(res.typeCmd == 'MoMo'){
          sumMoMo +=res.somRest;
      }
      if(res.typeCmd == 'ST'){
          sumST +=res.somRest;
      }
      if(res.typeCmd == 'Transfert'){
          sumTransfert +=res.somRest;
      }
    });
    
    var resultats = {
        somRestOM: sumOM,
        somRestMoMo: sumMoMo,
        somRestST: sumST,
        somRestTransfert: sumTransfert,
        somRestTotal: sumTotal,
    }

    return resultats;
  }


  getTelError(){
    if(this.tel.invalid && (this.tel.dirty || this.tel.touched)){
      if(this.tel.errors.required){
        return 'Le numero de telephone est requis.';
      }else if(this.tel.errors.pattern){
        return 'le numero est incorect.';
      }else if(this.tel.errors.user){
        this.idUser = this.tel.errors.user.value._id;
        this.name = this.tel.errors.user.value.name;
        this.tel.setErrors(null);
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
