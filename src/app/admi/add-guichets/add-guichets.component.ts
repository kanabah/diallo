import { GuichetService } from './../../services/guichet.service';
import { UserService } from './../../services/user.service';
import { recherchTelPromoteur } from 'src/app/validators/recherch-tel-promoteur.validator';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { telValidatorRegister } from 'src/app/validators/telephone-validator-register';
import { updateTelUserValidator } from 'src/app/validators/update-tel-user.validators';
import { telAgenceValidator } from 'src/app/validators/tel-agence-validators';

@Component({
  selector: 'app-add-guichets',
  templateUrl: './add-guichets.component.html',
  styleUrls: ['./add-guichets.component.css']
})
export class AddGuichetsComponent implements OnInit {
  idClient: any;
  name: any;
  constructor(private fb: FormBuilder, private userService: UserService, private guichetService: GuichetService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.guichetService.addGuichet(this.formControl.value).subscribe(res => {
      console.log("RESULTAT", res);
      
    })
  }

  formControl = this.fb.group({
    tel: ['', {
      validators: [Validators.required,
        Validators.pattern(/^[0-9+]{9,9}$/)
     ],
      asyncValidators: [telAgenceValidator(this.userService)],
      updateOn: 'blur'}
    ],
    type: ['Selectioner', [Validators.required]],
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
      }else if(this.tel.errors.telExist){
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

  get type(){
    return this.formControl.get('type');
  }

  get montant(){
    return this.formControl.get('montant');
  }

  get password(){
    return this.formControl.get('password');
  }

}
