import { NgxSpinnerService } from 'ngx-spinner';
import { GuichetService } from './../../services/guichet.service';
import { User } from './../../interfaces/user';
import { Promoteur } from './../../interfaces/promoteur';
import { UserService } from './../../services/user.service';
import { WeekService } from './../../services/week.service';
import { PrintClientService } from './../../services/print-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JsService } from 'src/app/services/js.service';
import { identifierModuleUrl } from '@angular/compiler';
import { Guichet } from 'src/app/interfaces/guichet';

@Component({
  selector: 'app-details-agence',
  templateUrl: './details-agence.component.html',
  styleUrls: ['./details-agence.component.css']
})
export class DetailsAgenceComponent implements OnInit {
  clientFilters: Client[] = [];
  clients: Client[] = [];
  promoteurs: User[] = [];
  promoteursFilters: User[] = [];
  clientsCount: number = 0;
  promoteursCount: number = 0;
  guichetsFilters: Guichet[] = [];
  guichets: Guichet[] = [];

  idUser: any;
  userDetail: User;
  
  sumTotalOM: number = 0;  
  sumTotalMoMo: number = 0;  
  sumTotalST: number = 0;  
  sumTotalTransfert: number = 0;

  soldeWesterDepot: number = 0;  
  soldeWariDepot: number = 0;  
  soldeMoneyDepot: number = 0;

  soldeWesterRetrait: number = 0;  
  soldeWariRetrait: number = 0;  
  soldeMoneyRetrait: number = 0;

  calculSoldeWester: number = 0;  
  calculSoldeWari: number = 0;  
  calculSoldeMoney: number = 0;  

  montantGuichetDay: number = 0;  
  montantGuichetWeek: number = 0;  
  montantGuichetMonth: number = 0;  
  montantGuichetYear: number = 0;
  montantGuichetTotal: number = 0;

  sumDepotAllDay: number = 0;  
  sumDepotAllWeek: number = 0;  
  sumDepotAllMonth: number = 0;  
  sumDepotAllYear: number = 0;
  sumDepotAllTotal: number = 0;

  countDepotAllDay: number = 0;  
  countDepotAllWeek: number = 0;  
  countDepotAllMonth: number = 0;  
  countDepotAllYear: number = 0;
  countDepotAllTotal: number = 0;

  sumRetraitAllDay: number = 0;  
  sumRetraitAllWeek: number = 0;  
  sumRetraitAllMonth: number = 0;  
  sumRetraitAllYear: number = 0;
  sumRetraitAllTotal: number = 0;

  countRetraitAllDay: number = 0;  
  countRetraitAllWeek: number = 0;  
  countRetraitAllMonth: number = 0;  
  countRetraitAllYear: number = 0;
  countRetraitAllTotal: number = 0;

  sumAttributionByAdmiAllDay: number = 0;  
  sumAttributionByAdmiAllWeek: number = 0;  
  sumAttributionByAdmiAllMonth: number = 0;  
  sumAttributionByAdmiAllYear: number = 0;
  sumAttributionByAdmiAllTotal: number = 0;

  countAttributionByAdmiAllDay: number = 0;  
  countAttributionByAdmiAllWeek: number = 0;  
  countAttributionByAdmiAllMonth: number = 0;  
  countAttributionByAdmiAllYear: number = 0;
  countAttributionByAdmiAllTotal: number = 0;

  sumDepotWari: number = 0;  
  sumDepotWester: number = 0;  
  sumDepotMoney: number = 0;  
  sumDepotTotal: number = 0;
  
  countDepotWari: number = 0;  
  countDepotWester: number = 0;  
  countDepotMoney: number = 0;  
  countDepotTotal: number = 0;

  sumRetraitWari: number = 0;  
  sumRetraitWester: number = 0;  
  sumRetraitMoney: number = 0;  
  sumRetraitTotal: number = 0;

  countRetraitWari: number = 0;  
  countRetraitWester: number = 0;  
  countRetraitMoney: number = 0;  
  countRetraitTotal: number = 0;  
  
  sumCreditOM: number = 0;  
  sumCreditMoMo: number = 0;  
  sumCreditST: number = 0;  
  sumCreditTransfert: number = 0;
  
  sumEntrerJour: number = 0;  
  sumEntrerWeek: number = 0;  
  sumEntrerMonth: number = 0;  
  sumEntrerYear: number = 0;  
  sumEntrerAll: number = 0;

  sumCreditJour: number = 0;  
  sumCreditWeek: number = 0;  
  sumCreditMonth: number = 0;  
  sumCreditYear: number = 0;  
  sumCreditAll: number = 0;  
  
  total: number = 0;  
  pourcentOM: number = 0;  
  pourcentMoMo: number = 0;  
  pourcentST: number = 0;  
  pourcentTransfert: number = 0;
  
  nbCommandeOM: number = 0;
  nbCommandeMoMo: number = 0;
  nbCommandeST: number = 0;
  nbCommandeTransfert: number = 0;

  countNbCmdMonth: number = 0;
  countNbCmdDay: number = 0;
  countNbCmdWeek: number = 0;
  countNbCmdYear: number = 0;
  countNbCmdAll: number = 0;
  myDate;
  
  pourcentNbCmdDay: number = 0;
  pourcentNbCmdMonth: number = 0;
  pourcentNbCmdWeek: number = 0;
  pourcentNbCmdYear: number = 0;

  totalEntrerDay: number = 0;
  totalSortieDay: number = 0;
  

  constructor(private clientService: ClientService, private route: ActivatedRoute, private userService: UserService, private fb:FormBuilder, private _snackBar: MatSnackBar, private router: Router, public print: PrintClientService, private week: WeekService, private guichetService: GuichetService, private spiner: NgxSpinnerService) { }
  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');

    this.idUser = id;
    this.getUser(id);
    this.getPromoteurs(id);
    this.getClients(id); 
    this.getGuichets(id); 
  }

  getUser(id){
    this.spiner.show();
    this.userService.getUser(id).subscribe(res => {
      console.log('USER DD', res);
      this.userDetail = res;
      this.spiner.hide();
    })
  }

  getGuichets(id){
    var date = new Date();
    this.guichetService.getGuichets().subscribe(res => {
      this.guichetsFilters = res;
      this.guichets = this.guichetsFilters.filter(result => {
        return result.user_id._id == id;
      })

      this.guichets.forEach(element => {
        var createdAt = new Date(element.createdAt);

        if(element.action != 0){

          if(element.type == 'wari'){
            if(element.action == 1){
              this.sumDepotWari += element.montant;
              this.countDepotWari += 1;
            }
            
            if(element.action == 2){
              this.sumRetraitWari += element.montant;
              this.countRetraitWari += 1;
            }
            
          }
          
          if(element.type == 'money'){
            if(element.action == 1){
              this.sumDepotMoney += element.montant;
              this.countDepotMoney += 1;
            } 

            if(element.action == 2){
              this.sumRetraitMoney += element.montant;
              this.countRetraitMoney += 1;
            }
          }
          
          if(element.type == 'wester'){
            if(element.action == 1){
              this.sumDepotWester += element.montant;
              this.countDepotWester += 1;
            }

            if(element.action == 2){
              this.sumRetraitWester += element.montant;
              this.countRetraitWester += 1;
            }
          }

          if(element.action == 1){
            this.sumDepotTotal += element.montant;
            this.countDepotTotal += 1;
          }

          if(element.action == 2){
            this.sumRetraitTotal += element.montant;
            this.countRetraitTotal += 1;
          }

          //POUR LE DEPOT
          if(element.action == 1){
            if(createdAt.getDate() == date.getDate() && createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
              this.sumDepotAllDay += element.montant;
              this.countDepotAllDay +=1;
            }
  
            if(this.week.getWeekNumber(createdAt) == this.week.getWeekNumber(date) && createdAt.getFullYear() == date.getFullYear()){
              this.sumDepotAllWeek += element.montant;
              this.countDepotAllWeek +=1;
            }
  
            if(createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
              this.sumDepotAllMonth += element.montant;
              this.countDepotAllMonth +=1;
            }
  
            if(createdAt.getFullYear() == date.getFullYear()){
              this.sumDepotAllYear += element.montant;
              this.countDepotAllYear +=1;
            }
  
            if(true){
              this.sumDepotAllTotal += element.montant;
              this.countDepotAllTotal +=1;
            }
          }

          //POUR LE Retrait
          if(element.action == 2){
            if(createdAt.getDate() == date.getDate() && createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
              this.sumRetraitAllDay += element.montant;
              this.countRetraitAllDay +=1;
            }
  
            if(this.week.getWeekNumber(createdAt) == this.week.getWeekNumber(date) && createdAt.getFullYear() == date.getFullYear()){
              this.sumRetraitAllWeek += element.montant;
              this.countRetraitAllWeek +=1;
            }
  
            if(createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
              this.sumRetraitAllMonth += element.montant;
              this.countRetraitAllMonth +=1;
            }
  
            if(createdAt.getFullYear() == date.getFullYear()){
              this.sumRetraitAllYear += element.montant;
              this.countRetraitAllYear +=1;
            }
  
            if(true){
              this.sumRetraitAllTotal += element.montant;
              this.countRetraitAllTotal +=1;
            }
          }
        }

        if(element.action == 0){
          if(createdAt.getDate() == date.getDate() && createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
            this.sumAttributionByAdmiAllDay += element.montant;
            this.countAttributionByAdmiAllDay +=1;
          }

          if(this.week.getWeekNumber(createdAt) == this.week.getWeekNumber(date) && createdAt.getFullYear() == date.getFullYear()){
            this.sumAttributionByAdmiAllWeek += element.montant;
            this.countAttributionByAdmiAllWeek +=1;
          }

          if(createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
            this.sumAttributionByAdmiAllMonth += element.montant;
            this.countAttributionByAdmiAllMonth +=1;
          }

          if(createdAt.getFullYear() == date.getFullYear()){
            this.sumAttributionByAdmiAllYear += element.montant;
            this.countAttributionByAdmiAllYear +=1;
          }

          if(true){
            this.sumAttributionByAdmiAllTotal += element.montant;
            this.countAttributionByAdmiAllTotal +=1;
          }

          if(element.type == 'wester'){
            this.soldeWesterDepot += element.montant;
          }

          if(element.type == 'wari'){
            this.soldeWariDepot += element.montant;
          }

          if(element.type == 'money'){
            this.soldeMoneyDepot += element.montant;
          }
        }

        this.calculSoldeWester = this.sumDepotWester + this.soldeWesterDepot - this.sumRetraitWester;
        
        this.calculSoldeWari = this.sumDepotWari + this.soldeWariDepot - this.sumRetraitWari;
        
        this.calculSoldeMoney = this.sumDepotMoney + this.soldeMoneyDepot - this.sumRetraitMoney;
      })
      
      
    })
  }

  getPromoteurs(id){
    this.userService.getUsers().subscribe(res => {
      this.promoteursFilters = res;
      this.promoteurs = this.promoteursFilters.filter(result => {
        return result.agence_id == id && result.role == 'promoteur' && result.active == 1;
      });

      this.promoteursCount = this.promoteurs.length;

    })
  }

  getClients(id){
   
    this.clientService.getAllClients().subscribe(res => {
      this.clientFilters = res;
      this.clients = this.clientFilters.filter(result => {
        return result.user_id._id == id;
      });

      
      this.clientsCount = this.clients.length;

      this.calculTransactionAgence()
    
    })
  }

  calculTransactionAgence(){
    var date = new Date();

    this.clients.forEach(response => {
      response.commandes.forEach(element => {
        if(element.delete == 0){

          var dateCmd = new Date(element.dateCmd);
          
          if(element.typeCmd == 'OM'){
            this.sumTotalOM += element.somPay;
            this.sumCreditOM += element.somRest;
            this.nbCommandeOM +=1;
          }else if(element.typeCmd == 'MoMo'){
            this.sumTotalMoMo += element.somPay;
            this.sumCreditMoMo += element.somRest;
            this.nbCommandeMoMo +=1;
          }else if(element.typeCmd == 'ST'){
            this.sumTotalST += element.somPay;
            this.sumCreditST += element.somRest;
            this.nbCommandeST +=1;
          }else if(element.typeCmd == 'Transfert'){
            this.sumTotalTransfert += element.somPay
            this.sumCreditTransfert += element.somRest
            this.nbCommandeTransfert +=1;
          }
          
          if(element.delete == 0 && dateCmd.getDate() == date.getDate() && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear()){
            this.sumEntrerJour += element.somPay;
            this.sumCreditJour += element.somRest;
            this.countNbCmdDay += 1;
          }
          
          if(element.delete == 0 && this.week.getWeekNumber(dateCmd) == this.week.getWeekNumber(dateCmd) && dateCmd.getFullYear() == date.getFullYear()){
            this.sumEntrerWeek += element.somPay;
            this.sumCreditWeek += element.somRest;
            this.countNbCmdWeek += 1;
          }
          
          if(element.delete == 0 && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear()){
            this.sumEntrerMonth += element.somPay;
            this.sumCreditMonth += element.somRest;
            this.countNbCmdMonth +=1;
          }
          
          if(element.delete == 0 && dateCmd.getFullYear() == date.getFullYear()){
            this.sumEntrerYear += element.somPay;
            this.sumCreditYear += element.somRest;
            this.countNbCmdYear += 1;
          }
          
          if(element.delete == 0){
            this.sumEntrerAll += element.somPay;
            this.sumCreditAll += element.somRest;
            this.countNbCmdAll += 1;
          }
        }
      })
    })
  }
  
  onClientsVisit(){
    this.router.navigate(['admi/visit-client-for-agence', this.idUser]);
  }

  onPromoteursVisit(){
    this.router.navigate(['admi/visit-promoteur-for-agence', this.idUser]);
  }
}
