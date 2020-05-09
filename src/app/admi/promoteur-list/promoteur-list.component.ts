import { PromoteurService } from './../../services/promoteur.service';
import { JsService } from 'src/app/services/js.service';
import { AttributeRoleComponent } from './../attribute-role/attribute-role.component';
import { ConfirmPasswordComponent } from './../confirm-password/confirm-password.component';
import { MatDialog } from '@angular/material/dialog';
import { PrintClientService } from './../../services/print-client.service';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Promoteur } from 'src/app/interfaces/promoteur';

@Component({
  selector: 'app-promoteur-list',
  templateUrl: './promoteur-list.component.html',
  styleUrls: ['./promoteur-list.component.css']
})
export class PromoteurListComponent implements OnInit {
  userFilters: User[] = [];
  users: User[] = [];
  faUserPlus = faUserPlus;
  promoteurs: Promoteur[] = [];
  soldActuel: User[] = [];

  // sumPromoteurEntrer: number = 0;
  // sumPromoteurSortie: number = 0;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };
  constructor(private dialog: MatDialog,private userService: UserService, public print: PrintClientService, private promoteurService: PromoteurService) { 
    //Create dummy data
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          value: "items number " + (i + 1)
        }
      );
    }
 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
  
  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit() {
    // this.jsService.jsAdmi();
    this.promoteurService.getPromoteurs().subscribe(res => {
      this.promoteurs = res;
    })
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.userFilters = res;
      
      this.users = this.userFilters.filter(result => {
        return result.role == 'promoteur';
      });
      // console.log('USER FILTERS', this.users);
      
      this.users.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
      this.collection = { count: 20, data: this.users };
    })
  }

  getPromoteurs(id){
    var sumEntrer = 0;
    var sumSortie = 0;
    var montant = 0;
      this.promoteurs.forEach(element => {
        if(element.user_id == id){
          if(element.type == 'entrer'){
            sumEntrer += element.montant;
          }else if(element.type == 'sortie'){
            sumSortie += element.montant;
          }
        }
      })

      this.soldActuel = this.users.filter(result =>{
        if(result._id == id){
          return result.soldActuel;
        }
      })

      var soldResult = this.soldActuel.filter(response => {
        response.soldActuel.forEach(element => {
          montant += element.montant;
        })
      })
      
      console.log('RESULT Sold Actu', montant);

    var resultats = {
      sumPromoteurEntrer: sumEntrer,
      sumPromoteurSortie: sumSortie,
      montant: montant
    }

    // console.log('ENTRER', resultats);
    return resultats;
  }

  acceptUser(id){
    this.dialog.open(AttributeRoleComponent, {
      data: {"id": id}
    });
  }

  declineUser(id){
    this.dialog.open(ConfirmPasswordComponent, {
      data: {"id": id, "object": 'decline'}
      
    });
  }
}
