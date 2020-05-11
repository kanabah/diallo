import { Promoteur } from 'src/app/interfaces/promoteur';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { PromoteurService } from './../../services/promoteur.service';
import { returnInfoClientValidator } from 'src/app/validators/return-info-client-validator';
import { ClientService } from './../../services/client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-update-caisse-promoteur',
  templateUrl: './update-caisse-promoteur.component.html',
  styleUrls: ['./update-caisse-promoteur.component.css']
})
export class UpdateCaissePromoteurComponent implements OnInit {
  etatPadding: boolean = true;
  passwordIncorect: boolean = true;
  user: any;
  idClient: string;
  id: any;
  promoteur: Promoteur;

  constructor(private route: ActivatedRoute,private snackBar: SnackBarService ,private userService: UserService, private fb: FormBuilder, private clientService: ClientService, private promoteurService: PromoteurService) { }

  ngOnInit() {
    this.getCaisseById();
  }

  getCaisseById(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.promoteurService.getCaisseById(this.id).subscribe(res => {
      this.promoteur = res[0];
      
      this.initialiseForms();
    });
  }

  private initialiseForms(){
    this.updateForm.patchValue({
      montant: this.promoteur.montant ? this.promoteur.montant : '',
      description: this.promoteur.description ? this.promoteur.description : '',
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
        this.client_id.setValue(this.idClient);

        this.promoteurService.updatedCaisse(this.id, this.updateForm.value).subscribe(res => {
          this.snackBar.openSnackBar('Modification Reuissie!!', 'Fermer');
        });
      }
    });
  }

  updateForm = this.fb.group({
    montant: ['', [Validators.required, Validators.pattern(/^[0-9+]{1,}$/)]],
    description: [''],
    client_id: [''],
    agence_id: [''],
    user_id: [''],
    type: [''],
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
        // this.nom = this.tel.errors.client.value.nom;
        // this.prenom = this.tel.errors.client.value.prenom;
        // this.commune = this.tel.errors.client.value.adress.commune;
        // this.quartier = this.tel.errors.client.value.adress.quartier;
        // this.secteur = this.tel.errors.client.value.adress.secteur;
        // this.avatar = this.tel.errors.client.value.avatar;
        // this.ok = true;
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
    return this.updateForm.get('tel');
  }

  get montant(){
    return this.updateForm.get('montant');
  }

  get description(){
    return this.updateForm.get('description');
  }

  get user_id(){
    return this.updateForm.get('user_id');
  }

  get agence_id(){
    return this.updateForm.get('agence_id');
  }

  get client_id(){
    return this.updateForm.get('client_id');
  }

  get type(){
    return this.updateForm.get('type');
  }

  get password(){
    return this.updateForm.get('password');
  }

}
