import { Route, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { PromoteurService } from './../../services/promoteur.service';
import { ClientService } from './../../services/client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { recherchTelPromoteur } from 'src/app/validators/recherch-tel-promoteur.validator';

@Component({
  selector: 'app-attribute-espece',
  templateUrl: './attribute-espece.component.html',
  styleUrls: ['./attribute-espece.component.css']
})
export class AttributeEspeceComponent implements OnInit {
  etatPadding: boolean = true;
  passwordIncorect: boolean = true;
  user: any;
  idClient: string;
  name: string;

  constructor(private route: Router, private snackBar: SnackBarService, private userService: UserService, private fb: FormBuilder, private clientService: ClientService, private promoteurService: PromoteurService) { }

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
        this.user_id.setValue(this.userService.getUserDetails()._id);
        this.agence_id.setValue(this.userService.getUserDetails().agence_id);
        this.client_id.setValue(this.idClient);
        this.type.setValue('entrer');

        this.userService.addSoldePromoteur(this.idClient, this.controlFrom.value).subscribe(res => {
          this.snackBar.openSnackBar('Ajout Reusie!!', 'Fermer');
          this.route.navigate(['/'])
        });
      }
    });
  }

  controlFrom = this.fb.group({
    tel: ['', {
      validators: [Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/)
     ],
      asyncValidators: [recherchTelPromoteur(this.userService)],
      updateOn: 'blur'}
   ],
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

  get password(){
    return this.controlFrom.get('password');
  }

}
