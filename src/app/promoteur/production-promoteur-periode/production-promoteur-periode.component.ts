import { PrintClientService } from './../../services/print-client.service';
import { PromoteurService } from './../../services/promoteur.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { recherchTelPromoteur } from 'src/app/validators/recherch-tel-promoteur.validator';
import { Promoteur } from 'src/app/interfaces/promoteur';

@Component({
  selector: 'app-production-promoteur-periode',
  templateUrl: './production-promoteur-periode.component.html',
  styleUrls: ['./production-promoteur-periode.component.css']
})
export class ProductionPromoteurPeriodeComponent implements OnInit {
  etatPadding: boolean = true;
  promoteurs: Promoteur[] = [];
  idClient: any;
  search: boolean = true;
  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private fb: FormBuilder, private userService: UserService, private promoteurService: PromoteurService, public print : PrintClientService) {
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

  controlFrom = this.fb.group({
    tel: ['', {
      validators: [Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/)
     ],
      asyncValidators: [recherchTelPromoteur(this.userService)],
      updateOn: 'blur'}
    ],
    type: ['Tout', [Validators.required]],
    date: ['', [Validators.required]],

  });

  onSubmit(){
    this.getProductionPromoteurByPeriode(this.idClient, this.date.value, this.type.value);
    this.search = false;
    
  }
  
  getProductionPromoteurByPeriode(id, dateForm, type){
    let date = new Date(dateForm);
    this.promoteurService.getPromoteurByUserIdForAgenceAndAdmi(id).subscribe(res => {
      this.promoteurs = res.filter(function(result){
        var dateAdd = new Date(result.createdAt);
          if(type != 'Tout'){
            return dateAdd.getDate() == date.getDate() && dateAdd.getMonth() == date.getMonth() && dateAdd.getFullYear() == date.getFullYear() && result.type == type;
          }else{
            return dateAdd.getDate() == date.getDate() && dateAdd.getMonth() == date.getMonth() && dateAdd.getFullYear() == date.getFullYear();
          }
      });
      this.promoteurs.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
        this.collection = { count: 20, data: this.promoteurs  };
        console.log('Promoteur', this.promoteurs);
        
    });
    
  }

  getTelSuccess(){
    if(this.tel.valid){
      return true;
    }
  }

  getTelError(){
    if(this.tel.invalid && (this.tel.dirty || this.tel.touched)){
      if(this.tel.errors.required){
        return 'Le numero de telephone est requis.';
      }else if(this.tel.errors.pattern){
        return 'le numero est incorect.';
      }else if(this.tel.errors.client){
        this.idClient = this.tel.errors.client.value._id;
        this.tel.setErrors(null);
      }else if(this.tel.errors.telNotExist){
        return "Cet Numero de telephone n'existe pas.";
      }
    }
  }

  getDateSuccess(){
    if(this.date.valid){
      return true;
    }
  }

  getDateError(){
    if(this.date.invalid && (this.date.dirty || this.date.touched)){
      if(this.date.errors.required){
        return 'La date est requis.';
      }
    }
  }

  get tel(){
    return this.controlFrom.get('tel');
  }

  get date(){
    return this.controlFrom.get('date');
  }

  get type(){
    return this.controlFrom.get('type');
  }

}
