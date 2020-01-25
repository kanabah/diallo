import { ClientService } from './../../services/client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-delete-reglement',
  templateUrl: './delete-reglement.component.html',
  styleUrls: ['./delete-reglement.component.css']
})
export class DeleteReglementComponent implements OnInit {
  etatPadding: boolean = true;

  constructor(private snackBar: SnackBarService, private userService: UserService, private clientService: ClientService, private fb: FormBuilder,public dialogRef: MatDialogRef<DeleteReglementComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) { }

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
        this.clientService.deleteReglement(this.data.cmd_id, this.data.reglement_id, this.data.client_id).subscribe(res => {
          this.dialogRef.close();
          this.snackBar.openSnackBar('Supression reuissie aves success!!!', 'Fermer');
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
