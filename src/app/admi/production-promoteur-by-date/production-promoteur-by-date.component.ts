import { PromoteurService } from './../../services/promoteur.service';
import { WeekService } from './../../services/week.service';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { Router } from '@angular/router';
import { PrintClientService } from './../../services/print-client.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../interfaces/client';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { telAgenceValidator } from 'src/app/validators/tel-agence-validators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-production-promoteur-by-date',
  templateUrl: './production-promoteur-by-date.component.html',
  styleUrls: ['./production-promoteur-by-date.component.css']
})
export class ProductionPromoteurByDateComponent implements OnInit {
  name: any;
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;
  promoteurFilters: any[] = [];
  client: Client[] = [];
  clientFilters: Client[] = [];
  promoteurs: any[] = [];
  recherche: boolean = true;

  idUser: any;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private fb: FormBuilder, private userService: UserService, private promoteurService: PromoteurService, public print: PrintClientService, private location: Location, private week: WeekService) { 
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
      "type": 'tout',
      "date": '',
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
        let date = new Date(this.date.value);
        this.promoteurService.getPromoteurs().subscribe(res => {
          this.promoteurFilters = res;
          this.promoteurs = this.promoteurFilters.filter(result => {
            var createdAt = new Date(result.createdAt);
            if(createdAt.getDate() == date.getDate() && createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
              if(result.user_id == this.idUser){
                if(this.type.value == 'entrer'){
                  return result.type == 'entrer';
                }else if(this.type.value == 'sortie'){
                  return result.type == 'sortie';
                }else {
                  return result;
                }
              }
            }
          });
          console.log('getPromoteurs', this.promoteurs);

          
          this.promoteurs.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
          this.collection = { count: 20, data: this.promoteurs };
        })
      }
    });
  }

  formControl = this.fb.group({
    tel: ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/), controlCodeTelValidator(/^620|621|622|623|624|625|626|627|628|629|660|661|662|664|666|669|655|656|657/i)
     ],
      asyncValidators: [telAgenceValidator(this.userService)],
      updateOn: 'blur'}
   ],
    date: ['', [Validators.required]],
    type: ['tout', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


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

  getTelError(){
    if(this.tel.invalid && (this.tel.dirty || this.tel.touched)){
      if(this.tel.errors.required){
        return 'Le numero de telephone est requis.';
      }else if(this.tel.errors.pattern){
        return 'le numero est incorect.';
      }else if(this.tel.errors.user){
        // this.nom = this.tel.errors.client.value.nom;
        // this.prenom = this.tel.errors.client.value.prenom;
        // this.commune = this.tel.errors.client.value.adress.commune;
        // this.quartier = this.tel.errors.client.value.adress.quartier;
        // this.secteur = this.tel.errors.client.value.adress.secteur;
        // console.log('JE SUIS UTILISATEUR', this.tel.errors.user.value.name);
        
        this.idUser = this.tel.errors.user.value._id;
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

  geDateError(){
    if(this.date.invalid && (this.date.dirty || this.date.touched)){
      if(this.date.errors.required){
        return 'La date est requis.';
      }
    }
  }
  
  getDateSuccess(){
    if(this.date.valid){
      return true;
    }
  }

  get tel(){
    return this.formControl.get('tel');
  }

  get password(){
    return this.formControl.get('password');
  }

  get date(){
    return this.formControl.get('date');
  }

  get type(){
    return this.formControl.get('type');
  }

}
