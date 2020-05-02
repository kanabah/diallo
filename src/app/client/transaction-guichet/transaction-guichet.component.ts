import { GuichetService } from './../../services/guichet.service';
import {  Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { ClientService } from './../../services/client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Guichet } from 'src/app/interfaces/guichet';

@Component({
  selector: 'app-transaction-guichet',
  templateUrl: './transaction-guichet.component.html',
  styleUrls: ['./transaction-guichet.component.css']
})
export class TransactionGuichetComponent implements OnInit {
  etatPadding: boolean = true;
  passwordIncorect: boolean = true;
  user: any;
  idClient: string;
  name: string;
  guichets: Guichet[] = [];

  sumTotalDepot: number = 0;
  sumTotalRetait: number = 0;
  sumTest: number = 0;

  constructor(private route: Router, private snackBar: SnackBarService, private userService: UserService, private fb: FormBuilder, private clientService: ClientService, private guichetService: GuichetService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.etatPadding = false;
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    this.userService.login(this.user).subscribe(res => {
      if(!res){
        this.passwordIncorect = false;
        this.etatPadding = true;
      }else{
        if(this.type.value != 'Selectioner'){
          if(this.action.value != 'Selectioner'){
            if(this.action.value == 2){
              this.guichetService.getGuichets().subscribe(res => {
                this.guichets = res;
                console.log('result Guichets', this.guichets);
                console.log('Action Value', this.action.value);
                this.guichets.forEach(result => {
                  if(result.user_id == this.userService.getUserDetails()._id && result.type == this.type.value && result.delete == 0){
                    if(result.action == 0 || result.action == 1){
                      this.sumTotalDepot += result.montant;
                    }
                    
                    if(result.action == 2){
                      this.sumTotalRetait += result.montant;
                    }
                  }
                });

                var sumTest = this.sumTotalDepot - this.sumTotalRetait;
                console.log('Sum Test', Number(sumTest));
                console.log('Sum Montant', Number(this.montant.value));
                
                if(Number(this.montant.value) <= Number(sumTest)){
                  this.user_id.setValue(this.userService.getUserDetails()._id);
          
                  this.guichetService.addGuichet(this.controlFrom.value).subscribe(res => {
                    this.snackBar.openSnackBar('Transaction Reuissie!!!', 'Fermer');
                    this.route.navigate(['/'])
                  });
                }else{
                  console.log(' NOT Coolllll');
                  this.sumTotalRetait = 0;
                  this.sumTotalDepot = 0;
                  this.etatPadding = true;
                  this.snackBar.openSnackBar('Impossible!!! Montant de Sortie Supperieure a la caisse!!!', 'Fermer'); 
                }
                
              }) 
            }else{
              this.user_id.setValue(this.userService.getUserDetails()._id);
              
              this.guichetService.addGuichet(this.controlFrom.value).subscribe(res => {
                this.snackBar.openSnackBar('Transaction Reuissie!!!', 'Fermer');
                this.route.navigate(['/'])
              });
            }

            console.log('Control Value', this.controlFrom.value);
        
          }else{
            this.etatPadding = true;
            this.snackBar.openSnackBar("Verifier L'action, Choisissez La Bonne!!!", "Quitter")
          }
        }else{
          this.etatPadding = true;
          this.snackBar.openSnackBar("Verifier Le Type, Choisissez Le Bon!!!", "Quitter")
        }
      }
    });
  }

  controlFrom = this.fb.group({
    tel: ['', {
      validators: [
        Validators.pattern(/^[0-9+]{9,9}$/)
     ]}
   ],
    montant: ['', [Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]],
    code: ['', [Validators.required]],
    type: ['Selectioner', [Validators.required]],
    action: ['Selectioner', [Validators.required]],
    description: [''],
    user_id: [''],
    agence_id: [''],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getMontantError(){
    if(this.montant.invalid && (this.montant.dirty || this.montant.touched)){
      if(this.montant.errors.required){
        return 'Cet Montant est requis.';
      }else if(this.montant.errors.pattern){
        return 'Montant Incorect';
      }
    }
  }

  getMontantSuccess(){
    if(this.montant.valid){
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
        this.name = this.tel.errors.client.value.name;
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
    return this.controlFrom.get('tel');
  }

  get montant(){
    return this.controlFrom.get('montant');
  }

  get description(){
    return this.controlFrom.get('description');
  }

  get user_id(){
    return this.controlFrom.get('user_id');
  }

  get agence_id(){
    return this.controlFrom.get('agence_id');
  }

  get client_id(){
    return this.controlFrom.get('client_id');
  }

  get type(){
    return this.controlFrom.get('type');
  }

  get code(){
    return this.controlFrom.get('code');
  }

  get action(){
    return this.controlFrom.get('action');
  }

  get password(){
    return this.controlFrom.get('password');
  }

}
