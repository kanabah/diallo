import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Guichet } from 'src/app/interfaces/guichet';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { GuichetService } from './../../services/guichet.service';
import { UserService } from './../../services/user.service';
import { recherchTelPromoteur } from 'src/app/validators/recherch-tel-promoteur.validator';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { telValidatorRegister } from 'src/app/validators/telephone-validator-register';
import { updateTelUserValidator } from 'src/app/validators/update-tel-user.validators';
import { telAgenceValidator } from 'src/app/validators/tel-agence-validators';

@Component({
  selector: 'app-update-guichet',
  templateUrl: './update-guichet.component.html',
  styleUrls: ['./update-guichet.component.css']
})
export class UpdateGuichetComponent implements OnInit {
  idUser: any;
  name: any;
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;
  guichets: Guichet[] = [];
  guichet: any;

  constructor(private fb: FormBuilder, private userService: UserService, private guichetService: GuichetService, private snackBar: SnackBarService, private route: ActivatedRoute, private router: Router, private spiner: NgxSpinnerService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.getGuichetById(id);
  }

  getGuichetById(id){
    this.spiner.show();
    this.guichetService.getGuichets().subscribe(res => {
      this.guichets = res;
      this.guichet = this.guichets.filter(result => {
        return result._id == id;
      })

      this.initialiseForms();
      this.spiner.hide();
    });

    
  }

  onSubmit(){
    if(this.type.value == 'Selectioner'){
      this.snackBar.openSnackBar("Type De Guichet Imposible!!!", "Quitter");
    }else{
      let id = this.route.snapshot.paramMap.get('id');
      this.etatPadding = false;
      this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
      this.userService.login(this.user).subscribe(res => {
        if(!res){
          this.passwordIncorect = false;
          this.etatPadding = true;
        }else{
          this.guichetService.uodateGuichet(id, this.formControl.value).subscribe(res => {
            this.router.navigate(['admi/guichet-list']);
            this.snackBar.openSnackBar("Modification Reuissie Avec Success!!!", "Quitter");
          })
        }
      });
    }
  }

  private initialiseForms(){
    this.formControl.patchValue({
      montant: this.guichet[0].montant ? this.guichet[0].montant : '',
      description: this.guichet[0].description ? this.guichet[0].description : '',
      type: this.guichet[0].type ? this.guichet[0].type : '',
    })
  }

  formControl = this.fb.group({
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
