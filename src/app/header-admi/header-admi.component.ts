import { Subscription, timer } from 'rxjs';
import { JsService } from 'src/app/services/js.service';
import { UserService } from './../services/user.service';
import { PromoteurService } from './../services/promoteur.service';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { GuichetService } from './../services/guichet.service';
import { User } from './../interfaces/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Guichet } from 'src/app/interfaces/guichet';
import { Promoteur } from 'src/app/interfaces/promoteur';

@Component({
  selector: 'app-header-admi',
  templateUrl: './header-admi.component.html',
  styleUrls: ['./header-admi.component.css']
})
export class HeaderAdmiComponent implements OnInit, OnDestroy {
  subscription : Subscription;
  newUsers: User[] = [];
  guichetsFilters: Guichet[] = [];
  guichets: Guichet[] = [];
  clients: Client[] = [];
  commandes: Client[] = [];

  promoteurs: Promoteur[] = [];

  countWesterDay = 0;
  countWariDay = 0;
  countMoneyDay = 0;

  nbCommandeOM: number = 0;
  nbCommandeMoMo: number = 0;
  nbCommandeTransfert: number = 0;
  nbCommandeST: number = 0;

  nbEntrerPromoteur: number = 0;
  nbSortiePromoteur: number = 0;

  constructor(private guichetService: GuichetService, private clientService: ClientService, private promoteurService: PromoteurService, private js: JsService, private userService: UserService) { }

  ngOnInit() {
    this.subscription = timer(0, 10000).subscribe(res => {
      this.countWesterDay = 0;
      this.countWariDay = 0;
      this.countMoneyDay = 0;

      this.nbCommandeOM = 0;
      this.nbCommandeMoMo = 0;
      this.nbCommandeTransfert = 0;
      this.nbCommandeST = 0;

      this.nbEntrerPromoteur = 0;
      this.nbSortiePromoteur = 0;

      this.getNewUsers();
      this.getCommandes();
      this.getPromoteurs();
      this.getGuichets();
      this.js.jsAdmi();
    })
  }

  getGuichets(){
    var date = new Date();
    this.guichetService.getGuichets().subscribe(res => {
      this.guichets = res;

      this.guichets.forEach(element => {
        var createdAt = new Date(element.createdAt);

        if(element.action != 0){
          if(createdAt.getDate() == date.getDate() && createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
            if(element.type == 'wester'){
              this.countWesterDay += 1;
            }

            if(element.type == 'wari'){
              this.countWariDay += 1;
            }

            if(element.type == 'money'){
              this.countMoneyDay += 1;
            }
          }
        }
      })
    })
  }

  getNewUsers(){
    this.userService.newUsers().subscribe(res => {
      this.newUsers = res.filter(result => {
        return result.confirm != 1;
      });
    })
  }

  getCommandes(){
    var date = new Date();
    this.clientService.getAllClients().subscribe(res => {
      this.clients = res;

      this.clients.forEach(result => {
        result.commandes.forEach(element => {
          var dateCmd = new Date(element.dateCmd);
          if(dateCmd.getDate() == date.getDate() && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear()){
            if(element.typeCmd == 'OM'){
                this.nbCommandeOM +=1;
            }else if(element.typeCmd == 'MoMo'){
                this.nbCommandeMoMo +=1;
            }else if(element.typeCmd == 'ST'){
                this.nbCommandeST +=1;
            }else if(element.typeCmd == 'Transfert'){
                this.nbCommandeTransfert +=1;
            }
          }
        })
      })
    })
  }

  getPromoteurs(){
    var date = new Date();
    this.promoteurService.getPromoteurs().subscribe(res => {
      this.promoteurs = res;
      this.promoteurs.forEach(element => {
        var createdAt = new Date(element.createdAt);
        if(createdAt.getDate() == date.getDate() && createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
          if(element.type == 'entrer'){
            this.nbEntrerPromoteur +=1;         
          }
          
          if(element.type == 'sortie'){
            this.nbSortiePromoteur +=1;         
          }
        }
      })
    })
  }

  logout(){
    this.userService.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
