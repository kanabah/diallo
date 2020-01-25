import { ClientService } from './../../services/client.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-dialog-delete-commande',
  templateUrl: './dialog-delete-commande.component.html',
  styleUrls: ['./dialog-delete-commande.component.css']
})
export class DialogDeleteCommandeComponent implements OnInit {
  user: any;
  passwordIncorect: boolean = true;
  etatPadding: boolean = true;

  constructor(private clientService: ClientService, private snackBar: SnackBarService ,private fb: FormBuilder, private userService: UserService, public dialogRef: MatDialogRef<DialogDeleteCommandeComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) { }

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
        this.clientService.deleteCommande(this.data.id, this.data.client_id).subscribe(res => {
          this.snackBar.openSnackBar('Supression reuissie aves success!!!', 'Fermer');
          this.dialogRef.close();
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
