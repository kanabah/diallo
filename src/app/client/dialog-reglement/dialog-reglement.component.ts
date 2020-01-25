import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { testMontantValidator } from 'src/app/validators/test-montant-validator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-dialog-reglement',
  templateUrl: './dialog-reglement.component.html',
  styleUrls: ['./dialog-reglement.component.css']
})
export class DialogReglementComponent implements OnInit {
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;

  constructor(private fb: FormBuilder, private clientService: ClientService, public dialogRef: MatDialogRef<DialogReglementComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private snackBar: SnackBarService) { }

  ngOnInit() {
  }

  reglementForm = this.fb.group({
    modePay: ['Cache', [Validators.required]],
    montant:  ['', {
      validators: [
        Validators.required,
        Validators.pattern(/^[0-9+]{1,}$/),
     ],
      asyncValidators: [testMontantValidator(this.clientService, this.data.id)],
      updateOn: 'blur'}
   ], 
    password: ['', [Validators.required , Validators.minLength(6)]]
  });

  onReglement(){
    this.etatPadding = false;
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    
    this.userService.login(this.user).subscribe(res => {
      if(!res){
        this.passwordIncorect = false;
        this.etatPadding = true;
      }else{
          if(this.getMontantSuccess()){
            this.clientService.addReglement(this.data.id, this.reglementForm.value, this.data.client_id).subscribe(res => {
              this.dialogRef.close();
              this.snackBar.openSnackBar('Reglemnt effectuer aves success!!!', 'Fermer');
            })
          }else{
            this.etatPadding = true;
          }
        }
      })
    
  }

  getMontantError(){
    if(this.montant.invalid && (this.montant.dirty || this.montant.touched)){
      if(this.montant.errors.required){
        return 'Le Mont de passe est requis.';
      }else if(this.montant.errors.pattern){
        return 'Montant Incorect.';
      }else if(this.montant.errors.imposible){
        return "Montant superieur a ce qu'il doit.";
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
        return 'Au minimum 6 caracters.';
      }
    }
  }
  
  getPasswordSuccess(){
    if(this.password.valid){
      return true;
    }
  }

  get modePay(){
    return this.reglementForm.get('modePay');
  }
  get montant(){
    return this.reglementForm.get('montant');
  }
  get password(){
    return this.reglementForm.get('password');
  }
}
