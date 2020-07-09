import { NgxSpinnerService } from 'ngx-spinner';
import { GuichetService } from './../../services/guichet.service';
import { WeekService } from './../../services/week.service';
import { Router } from '@angular/router';
import { PrintClientService } from './../../services/print-client.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../interfaces/client';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Guichet } from 'src/app/interfaces/guichet';
import { telGuichetValidator } from 'src/app/validators/tel-guichet-validators';

@Component({
  selector: 'app-guichet-by-code',
  templateUrl: './guichet-by-code.component.html',
  styleUrls: ['./guichet-by-code.component.css']
})
export class GuichetByCodeComponent implements OnInit {
  idUser: any;
  name: any;
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;
  commandesFilter: Client[] = [];
  guichets: Guichet[] = [];
  guichetFilters: Guichet[] = [];
  commandes: any[] = [];
  recherche: boolean = true;
  ok: boolean = false;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private fb: FormBuilder, private userService: UserService, private clientService: ClientService, public print: PrintClientService, private router: Router, private week: WeekService, private guichetService: GuichetService, private spiner: NgxSpinnerService) { 
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
      "code": '',
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
        this.guichetService.getGuichets().subscribe(res => {
          this.guichetFilters = res;
          this.guichets = this.guichetFilters.filter(result => {
            var createdAt = new Date(result.createdAt);
            if(result.delete == 0 &&  result.user_id._id == this.idUser && result.action != 0){
              return result.code == this.code.value;
            }
          })
          
          this.spiner.hide();
          this.guichets.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
          this.collection = { count: 20, data: this.guichets };
        })
      }
    });
  }

  formControl = this.fb.group({
    tel: ['', {
      validators: [Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/)
     ],
      asyncValidators: [telGuichetValidator(this.userService)],
      updateOn: 'blur'}
    ],
    code: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getType(type){
    if(type == 'wester'){
      return 'Wester Union';
    }else if(type == 'money'){
      return 'Money Gram';
    }else if(type == 'wari'){
      return 'Wari';
    }
  }

  getBadge(action){
    if(action == 1){
      return 'badge badge-success';
    }else if(action == 2){
      return 'badge badge-warning';
    }
  }

  getAction(action){
    if(action == 1){
      return 'Depot';
    }else if(action == 2){
      return 'Retrait';
    }
  }

  getTelError(){
    if(this.tel.invalid && (this.tel.dirty || this.tel.touched)){
      if(this.tel.errors.required){
        return 'Le numero de telephone est requis.';
      }else if(this.tel.errors.pattern){
        return 'le numero est incorect.';
      }else if(this.tel.errors.user){
        this.idUser = this.tel.errors.user.value._id;
        this.name = this.tel.errors.user.value.nameAgence;
        this.ok = true;
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

  getCodeError(){
    if(this.code.invalid && (this.code.dirty || this.code.touched)){
      if(this.code.errors.required){
        return 'Le code est requis.';
      }
    }
  }
  
  getCodeSuccess(){
    if(this.code.valid){
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

  get code(){
    return this.formControl.get('code');
  }

  get password(){
    return this.formControl.get('password');
  }

  get periode(){
    return this.formControl.get('periode');
  }

  get type(){
    return this.formControl.get('type');
  }

  get action(){
    return this.formControl.get('action');
  }

}
