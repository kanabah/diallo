import { PromoteurService } from './../../services/promoteur.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-delete-caisse',
  templateUrl: './dialog-delete-caisse.component.html',
  styleUrls: ['./dialog-delete-caisse.component.css']
})
export class DialogDeleteCaisseComponent implements OnInit {
  etatPadding: boolean = true;
  constructor(public dialogRef: MatDialogRef<DialogDeleteCaisseComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private fb: FormBuilder, private promoteurService: PromoteurService, private snackBar: SnackBarService, private router: Router) { }

  ngOnInit() {
  }
  user: any;
  passwordIncorect: boolean = true;

  confirmForm = this.fb.group({
    password: ['',  [Validators.required, Validators.minLength(6)]]
  })

  onConfirm(){
    this.etatPadding = false;
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    -
    this.userService.login(this.user).subscribe(res => {
      if(!res){
        this.passwordIncorect = false;
        this.etatPadding = true;
      }else{
        this.promoteurService.deleteCaisseById(this.data.id).subscribe(res => {
          this.dialogRef.close();
          this.snackBar.openSnackBar('Supression reuissie aves success!!!', 'Fermer');
          this.router.navigate(['/']);
        })
        
      }
    })
  }

  onClose(){
    this.dialogRef.close();
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
  
  get password(){
    return this.confirmForm.get('password');
  }


}
