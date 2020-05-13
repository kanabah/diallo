import { ActivatedRoute } from '@angular/router';
import { PromoteurService } from './../../services/promoteur.service';
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
  selector: 'app-visit-promoteur-for-agence',
  templateUrl: './visit-promoteur-for-agence.component.html',
  styleUrls: ['./visit-promoteur-for-agence.component.css']
})
export class VisitPromoteurForAgenceComponent implements OnInit {
  userFilters: User[] = [];
  users: User[] = [];
  faUserPlus = faUserPlus;
  promoteurs: Promoteur[] = [];
  soldActuel: User[] = [];
  soldSortie: User[] = [];

  config: any;
  collection : any = {
    count: 0,
    data: []
  };
  constructor(private dialog: MatDialog,private userService: UserService, public print: PrintClientService, private promoteurService: PromoteurService, private route: ActivatedRoute) { 
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
    var id = this.route.snapshot.paramMap.get('id');
    
    this.promoteurService.getPromoteurs().subscribe(res => {
      this.promoteurs = res;
    })
    this.getUsers(id);
  }

  getUsers(id){
    this.userService.getUsers().subscribe(res => {
      this.userFilters = res;
      
      this.users = this.userFilters.filter(result => {
        return result.role == 'promoteur' && result.agence_id == id;
      });
      
      this.users.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
      this.collection = { count: 20, data: this.users };
    })
  }

  getPromoteurs(id){
    var sumEntrer = 0;
    var sumSortie = 0;
    var montantSoldActuel = 0;
    var montantSoldSortie = 0;

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

      this.soldSortie = this.users.filter(result =>{
        if(result._id == id){
          return result.soldSortie;
        }
      })
      console.log('soldSORTIE', this.soldSortie);

      this.soldActuel.filter(response => {
        response.soldActuel.forEach(element => {
          montantSoldActuel += element.montant;
        })
      })
      
      this.soldSortie.filter(response => {
        response.soldSortie.forEach(element => {
          montantSoldSortie += element.montant;
        })
      })
      
      
      var resultats = {
        sumPromoteurEntrer: sumEntrer,
        sumPromoteurSortie: sumSortie,
        montantSoldActuel: montantSoldActuel,
        montantSoldSortie: montantSoldSortie
      }
      // console.log('RESULT Sold Actu', resultats);

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
