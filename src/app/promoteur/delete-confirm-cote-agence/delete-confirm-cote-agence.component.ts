import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserService } from 'src/app/services/user.service';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirm-cote-agence',
  templateUrl: './delete-confirm-cote-agence.component.html',
  styleUrls: ['./delete-confirm-cote-agence.component.css']
})
export class DeleteConfirmCoteAgenceComponent implements OnInit {
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;

  constructor(private router: Router, private fb: FormBuilder,private userService: UserService,public dialogRef: MatDialogRef<DeleteConfirmCoteAgenceComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snacKbar: SnackBarService) { }

  ngOnInit() {
  }

  confirmForm = this.fb.group({
    password: ['',  [Validators.required, Validators.minLength(6)]]
  })

  onConfirm(){
    this.etatPadding = false;
    this.user = {"email": this.userService.getUserDetails().email, "password": this.password.value};
    
    this.userService.login(this.user).subscribe(res => {
      if(!res){
        this.passwordIncorect = false;
        this.etatPadding = true;
      }else{
        if(this.data.object == 'delete-debit'){
          this.userService.deleteDebitPromoteurForAgence(this.data.user_id, this.data.id).subscribe(res => {
            this.dialogRef.close();
            this.router.navigate(['/']);
            this.snacKbar.openSnackBar('Suppresion Reuissie!!!', 'Fermer');
          });
        }

        if(this.data.object == 'delete-depot-agence'){
          this.userService.deleteDepotAgence(this.data.user_id, this.data.id_sold).subscribe(res => {
            this.dialogRef.close();
            this.router.navigate(['/']);
            this.snacKbar.openSnackBar('Suppresion Reuissie!!!', 'Fermer');
          });
        }
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
