import { User } from './../../interfaces/user';
import { Route, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { PromoteurService } from './../../services/promoteur.service';
import { returnInfoClientValidator } from 'src/app/validators/return-info-client-validator';
import { ClientService } from './../../services/client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Promoteur } from 'src/app/interfaces/promoteur';

@Component({
  selector: 'app-depot-agence',
  templateUrl: './depot-agence.component.html',
  styleUrls: ['./depot-agence.component.css']
})
export class DepotAgenceComponent implements OnInit {
  etatPadding: boolean = true;
  passwordIncorect: boolean = true;
  user: any;
  idClient: string;
  userDetails: User;

  resultAfterCalcul: number = 0;

  promoteurs: Promoteur[] = [];

  constructor(private route: Router, private snackBar: SnackBarService, private userService: UserService, private fb: FormBuilder, private clientService: ClientService, private promoteurService: PromoteurService) { }

  ngOnInit() {
    this.promoteurService.getPromoteurs().subscribe(res => {
      this.promoteurs = res;
    });
    
    this.userService.getUser(this.userService.getUserDetails()._id).subscribe(res => {
      this.userDetails = res;
      this.getPromoteurs(this.userService.getUserDetails()._id);
    });

  }

  onSubmit(){
    this.etatPadding = false;
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    this.userService.login(this.user).subscribe(res => {
      
      if(!res){
        this.passwordIncorect = false;
        this.etatPadding = true;
      }else{
        if(this.resultAfterCalcul > 1 && this.montant.value < this.resultAfterCalcul){
          this.userService.addSoldeSortie(this.userService.getUserDetails()._id, this.entrerForm.value).subscribe(res => {
            this.snackBar.openSnackBar("Solde Ajouter Avec Success!!!", "Quitter");
            this.route.navigate(['/']);
          })
        }else{
          this.etatPadding = true;
          this.snackBar.openSnackBar("Impossible Le Montant Est Trop Grand!!!", "Quitter");
        }
      }
    });
  }

  getPromoteurs(id){
    var sumEntrer = 0;
    var sumSortie = 0;
    var montantSoldActuel = 0;
    var montantSoldSortie = 0;

      this.promoteurs.forEach(element => {
        if(element.user_id == id){
          if(element.type == 'entrer'){
            sumEntrer += element.montant;
          }else if(element.type == 'sortie'){
            sumSortie += element.montant;
          }
        }
      })

      this.userDetails.soldActuel.forEach(element => {
        montantSoldActuel += element.montant;
      })

      this.userDetails.soldSortie.forEach(element => {
        montantSoldSortie += element.montant;
      })
      
      this.resultAfterCalcul = sumEntrer + montantSoldActuel - sumSortie - montantSoldSortie;
      console.log('AFTER CALCUL', this.resultAfterCalcul);
      
    return this.resultAfterCalcul;
  }


  entrerForm = this.fb.group({
    montant: ['', [Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]],
    description: [''],
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

  get montant(){
    return this.entrerForm.get('montant');
  }

  get description(){
    return this.entrerForm.get('description');
  }

  get password(){
    return this.entrerForm.get('password');
  }

}
