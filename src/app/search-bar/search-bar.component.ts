import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SnackBarService } from './../services/snack-bar.service';
import { Client } from './../interfaces/client';
import { ClientService } from './../services/client.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() title: string;
  @Input() home: string;
  client: Client;
  border: boolean = false;

  constructor(private fb: FormBuilder, private clientService: ClientService, private snackBar: SnackBarService, private router: Router, public userService: UserService) { }

  ngOnInit() {
  }

  controlForm = this.fb.group({
    recherche: ['', [Validators.required]]
  })

  onRecherhe(){
    var myValue = 0;
    myValue = +this.recherche.value;
    if(myValue && typeof myValue === 'number'){
      this.clientService.getClientByTel(myValue).subscribe(res => {
        this.client = res;
        if(true){
          if(this.client){
            if(this.client.user_id == this.userService.getUserDetails()._id || this.client.user_id == this.userService.getUserDetails().agence_id){
              this.border = false;
              this.router.navigate(['/client/result-serach-client-by-agence-or-promoteur', this.client._id])
            }else{
              this.border = true;
              this.snackBar.openSnackBar("Cet numero de telephone client n'existe pas!!!", "Quitter");
            }
          }else{
            this.border = true;
            this.snackBar.openSnackBar("Cet numero de telephone client n'existe pas!!!", "Quitter");
          }
        }
      })
    }else{
      this.border = true;
      this.snackBar.openSnackBar("Cet numero de telephone client n'existe pas!!!", "Quitter");
    }
  }

  get recherche(){
    return this,this.controlForm.get('recherche');
  }
}
