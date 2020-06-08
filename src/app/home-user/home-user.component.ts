import { ResourcesService } from './../services/resources.service';
import { PromoteurService } from './../services/promoteur.service';
import { User } from './../interfaces/user';
import { GuichetService } from './../services/guichet.service';
import { UserService } from './../services/user.service';
import { PrintClientService } from './../services/print-client.service';
import { Subscription, timer, Observable } from 'rxjs';
import { ClientService } from './../services/client.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { JsService } from '../services/js.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentAddCommandeOrangeMoneyComponent } from '../client/dialog-content-add-commande-orange-money/dialog-content-add-commande-orange-money.component';
import { DialogContentAddCommandeMobileMoneyComponent } from '../client/dialog-content-add-commande-mobile-money/dialog-content-add-commande-mobile-money.component';
import { DialogContentAddTransfertComponent } from '../client/dialog-content-add-transfert/dialog-content-add-transfert.component';
import { DialogContentAddStartTimesComponent } from '../client/dialog-content-add-start-times/dialog-content-add-start-times.component';
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import { faBraille } from '@fortawesome/free-solid-svg-icons';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { faDollyFlatbed } from '@fortawesome/free-solid-svg-icons';
import { Guichet } from '../interfaces/guichet';
import { Promoteur } from '../interfaces/promoteur';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
  soldPromoteur: any;
  soldPromoteurToday = 0;
  someActuJour = 0;

  resultAfterCalcul: number = 0;
  userDetails: User;
  promoteurs: Promoteur[] = [];

  constructor(private js: JsService, public dialog: MatDialog, private clientService: ClientService, public print: PrintClientService, public userService : UserService, private guichetService: GuichetService, private promoteurService: PromoteurService, private load: ResourcesService) { }
  infoTotal: any;
  purcentDay: any = 0;
  purcentMonth: any = 0;
  purcentWeek: any = 0;
  purcentYear: any = 0;
  arowDay: any;
  arowWeek: any;
  arowMonth: any;
  arowYear: any;
  alertOM: any;
  alertMoMo: any;
  alertTransfert: any;
  alertST: any;
  colorCreditOM: any;
  colorCreditMoMo: any;
  colorCreditST: any;
  colorCreditTransfert: any;
  
  faAlignCenter = faAlignCenter;
  faBraille = faBraille;
  faAlignJustify = faAlignJustify;
  faDollyFlatbed = faDollyFlatbed;

  ok: boolean = false;

  guichetResults: Guichet[] = [];

  depotWester: number = 0;
  depotWari: number = 0;
  depotMoney: number = 0;
  totalDepot: number = 0;

  depotDayWester: number = 0;
  depotDayWari: number = 0;
  depotDayMoney: number = 0;
  totalDayDepot: number = 0;

  retraitDayWester: number = 0;
  retraitDayWari: number = 0;
  retraitDayMoney: number = 0;
  totalDayRetrait: number = 0;
  
  retraitWester: number = 0;
  retraitWari: number = 0;
  retraitMoney: number = 0;
  totalRetrait: number = 0;

  caisseWester: number = 0;
  caisseWari: number = 0;
  caisseMoney: number = 0;
  TotalcaisseGuichet: number = 0;

  ngOnInit() {
    this.subscription = timer(0, 10000).subscribe(res => {
      this.infoHome();
    });
    this.getGuichets();

    // const observable = new Observable(subscriber => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 1000);
    // });

    // observable.subscribe(res => {
    //   this.load.loadUser()
    // })
  }

  getGuichets(){
    this.guichetService.getGuichets().subscribe(res => {
      this.guichetResults = res;

      this.guichetResults.forEach(element => {
        var date = new Date();
        var dateElement = new Date(element.createdAt);
        if(element.user_id._id == this.userService.getUserDetails()._id){
          if(element.delete == 0){
            //ADDITION DES DEPOTS
            if((element.action == 1 || element.action == 0)  ){
              if(element.type == 'wester'){
                this.depotWester += element.montant;
                
                if(dateElement.getDate() == date.getDate() && dateElement.getMonth() == date.getMonth() && dateElement.getFullYear() == date.getFullYear()){
                  this.depotDayWester += element.montant;
                }
              }
  
              if(element.type == 'wari'){
                this.depotWari += element.montant;

                if(dateElement.getDate() == date.getDate() && dateElement.getMonth() == date.getMonth() && dateElement.getFullYear() == date.getFullYear()){
                  this.depotDayWari += element.montant;
                }
              }
  
              if(element.type == 'money'){
                this.depotMoney += element.montant;

                if(dateElement.getDate() == date.getDate() && dateElement.getMonth() == date.getMonth() && dateElement.getFullYear() == date.getFullYear()){
                  this.depotDayMoney += element.montant;
                }
              }
            }
            //ADDITION DES RETRAITS
            if((element.action == 2)  ){
              if(element.type == 'wester'){
                this.retraitWester += element.montant;

                if(dateElement.getDate() == date.getDate() && dateElement.getMonth() == date.getMonth() && dateElement.getFullYear() == date.getFullYear()){
                  this.retraitDayWester += element.montant;
                }
              }
  
              if(element.type == 'wari'){
                this.retraitWari += element.montant;

                if(dateElement.getDate() == date.getDate() && dateElement.getMonth() == date.getMonth() && dateElement.getFullYear() == date.getFullYear()){
                  this.retraitDayWari += element.montant;
                }
              }
  
              if(element.type == 'money'){
                this.retraitMoney += element.montant;

                if(dateElement.getDate() == date.getDate() && dateElement.getMonth() == date.getMonth() && dateElement.getFullYear() == date.getFullYear()){
                  this.retraitDayMoney += element.montant;
                }
              }
            }
          }
        }
      });

      this.caisseWester = this.depotWester - this.retraitWester;
      this.caisseWari = this.depotWari - this.retraitWari;
      this.caisseMoney = this.depotMoney - this.retraitMoney;

      this.totalDepot = this.depotWester + this.depotWari + this.depotMoney;
      this.totalRetrait = this.retraitWester + this.retraitWari + this.retraitMoney;

      this.totalDayDepot = this.depotDayWester + this.depotDayWari + this.depotDayMoney;
      this.totalDayRetrait = this.retraitDayWester + this.retraitDayWari + this.retraitDayMoney;

      this.TotalcaisseGuichet = this.caisseWester + this.caisseWari + this.caisseMoney;
    })
  }
  
  infoHome(){
    let date = new Date();
    var somActuel = 0;
    
    this.clientService.returnInfoHome().subscribe(res => {
      this.ok = true;
      this.infoTotal = res;

      //GET MONTANT JOURNALIERE DU PROMOTEUR
      this.soldPromoteur = this.infoTotal['promoteur'][0].soldActuel;
      var filtreSoldeJour = this.soldPromoteur.filter(function(res){  
        var deteResult = new Date(res.date);
          return deteResult.getDate() == date.getDate() && deteResult.getMonth() == date.getMonth() && deteResult.getFullYear() == date.getFullYear();
      });

      var oups = 0
      filtreSoldeJour.forEach(element => {
        oups += element.montant;
      });

      this.soldPromoteurToday = oups;
      
      this.calculPurcentCommande();
      this.someActuJour = this.soldPromoteurToday + this.infoTotal['totalEntrerDay'] - this.infoTotal['totalSortieDay'];//this.infoTotal['totalEntrerDay'] - this.infoTotal['totalSortieDay']; 
    })
    
  }

  calculPurcentCommande(){
    //PURCENT FOR DAY
    if(this.infoTotal['countNbCmdDay'] < 10){
      this.purcentDay = 4;
      this.arowDay = 'fa fa-level-down text-success ctn-ic-4';
    }else if(this.infoTotal['countNbCmdDay'] > 9 && this.infoTotal['countNbCmdDay'] < 20){
      this.purcentDay = 1;
      this.arowDay = 'fa fa-level-up text-danger ctn-ic-1';
    }else if(this.infoTotal['countNbCmdDay'] > 19 ){
      this.purcentDay = 3;
      this.arowDay = 'fa fa-level-up text-success ctn-ic-3';
    }
    //PURCENT FOR WEEK
    if(this.infoTotal['pourcentNbCmdWeek'] < 80){
      this.purcentWeek = 4;
      this.arowWeek = 'fa fa-level-down text-success ctn-ic-4';
    }else if(this.infoTotal['pourcentNbCmdWeek'] > 79 && this.infoTotal['pourcentNbCmdWeek'] < 150){
      this.purcentWeek = 1;
      this.arowWeek = 'fa fa-level-up text-danger ctn-ic-1';
    }else if(this.infoTotal['pourcentNbCmdWeek'] > 149 ){
      this.purcentWeek = 3;
      this.arowWeek = 'fa fa-level-up text-success ctn-ic-3';
    }

    //PURCENT FOR MONTH
    if(this.infoTotal['pourcentNbCmdMonth'] < 160){
      this.purcentMonth = 4;
      this.arowMonth = 'fa fa-level-down text-success ctn-ic-4';
    }else if(this.infoTotal['pourcentNbCmdMonth'] > 159 && this.infoTotal['pourcentNbCmdMonth'] < 750){
      this.purcentMonth = 1;
      this.arowMonth = 'fa fa-level-up text-danger ctn-ic-1';
    }else if(this.infoTotal['pourcentNbCmdMonth'] > 749 ){
      this.purcentMonth = 3;
      this.arowMonth = 'fa fa-level-up text-success ctn-ic-3';
    }

    //PURCENT FOR YEAR
    if(this.infoTotal['pourcentNbCmdYear'] < 2000){
      this.purcentYear = 4;
      this.arowYear = 'fa fa-level-down text-success ctn-ic-4';
    }else if(this.infoTotal['pourcentNbCmdYear'] > 1999 && this.infoTotal['pourcentNbCmdYear'] < 7000){
      this.purcentYear = 1;
      this.arowYear = 'fa fa-level-up text-danger ctn-ic-1';
    }else if(this.infoTotal['pourcentNbCmdYear'] > 6999 ){
      this.purcentYear = 3;
      this.arowYear = 'fa fa-level-up text-success ctn-ic-3';
    }

    //PURCENT ORANGE MONEY
    if(this.infoTotal['pourcentOM'] <= 15){
      this.alertOM = 'inverse';
    }else if(this.infoTotal['pourcentOM'] >= 16 && this.infoTotal['pourcentOM'] <= 40){
      this.alertOM = 'success'
    }else if(this.infoTotal['pourcentOM'] > 40 ){
      this.alertOM = 'info';
    }

    //PURCENT MoMo
    if(this.infoTotal['pourcentMoMo'] <= 15){
      this.alertMoMo = 'inverse';
    }else if(this.infoTotal['pourcentMoMo'] >= 16 && this.infoTotal['pourcentMoMo'] <= 40){
      this.alertMoMo = 'success'
    }else if(this.infoTotal['pourcentMoMo'] > 40 ){
      this.alertMoMo = 'info';
    }

    //PURCENT Start Times
    if(this.infoTotal['pourcentST'] <= 15){
      this.alertST = 'inverse';
    }else if(this.infoTotal['pourcentST'] >= 16 && this.infoTotal['pourcentST'] <= 40){
      this.alertST = 'success'
    }else if(this.infoTotal['pourcentST'] > 40 ){
      this.alertST = 'info';
    }

    //PURCENT Transfert
    if(this.infoTotal['pourcentTransfert'] <= 15){
      this.alertTransfert = 'inverse';
    }else if(this.infoTotal['pourcentTransfert'] >= 16 && this.infoTotal['pourcentTransfert'] <= 40){
      this.alertTransfert = 'success'
    }else if(this.infoTotal['pourcentTransfert'] > 40 ){
      this.alertTransfert = 'info';
    }

    //TOTAL CREDIT ORANGE MONEY COLOR
    if(this.infoTotal['sumCreditOM'] <= 70000){
      this.colorCreditOM = 'pull-right label-success label-3 label';
    }else if(this.infoTotal['sumCreditOM'] > 70000 && this.infoTotal['sumCreditOM'] <= 150000){
      this.colorCreditOM = 'pull-right label-warning label-5 label'
    }else if(this.infoTotal['sumCreditOM'] > 150000 ){
      this.colorCreditOM = 'pull-right label-info label-4 label';
    }

    //TOTAL CREDIT MOBILE MONEY COLOR 
    if(this.infoTotal['sumCreditMoMo'] <= 70000){
      this.colorCreditMoMo = 'pull-right label-success label-3 label';
    }else if(this.infoTotal['sumCreditMoMo'] > 70000 && this.infoTotal['sumCreditMoMo'] <= 150000){
      this.colorCreditMoMo = 'pull-right label-warning label-5 label'
    }else if(this.infoTotal['sumCreditMoMo'] > 150000 ){
      this.colorCreditMoMo = 'pull-right label-info label-4 label';
    }

    //TOTAL CREDIT START TIMES COLOR 
    if(this.infoTotal['sumCreditST'] <= 70000){
      this.colorCreditST = 'pull-right label-success label-3 label';
    }else if(this.infoTotal['sumCreditST'] > 70000 && this.infoTotal['sumCreditST'] <= 150000){
      this.colorCreditST = 'pull-right label-warning label-5 label'
    }else if(this.infoTotal['sumCreditST'] > 150000 ){
      this.colorCreditST = 'pull-right label-info label-4 label';
    }

    //TOTAL CREDIT TRANSFERT COLOR 
    if(this.infoTotal['sumCreditTransfert'] <= 70000){
      this.colorCreditTransfert = 'pull-right label-success label-3 label';
    }else if(this.infoTotal['sumCreditTransfert'] > 70000 && this.infoTotal['sumCreditTransfert'] <= 150000){
      this.colorCreditTransfert = 'pull-right label-warning label-5 label'
    }else if(this.infoTotal['sumCreditTransfert'] > 150000 ){
      this.colorCreditTransfert = 'pull-right label-info label-4 label';
    }
  }


  ngAfterViewInit(){
    // setTimeout(() => {
    //   // this.js.jsHomeUser();
    // }, 1000)

    
    // const observable = new Observable(subscriber => {
    //   subscriber.next(1);
    //   subscriber.next(2);
    //   subscriber.next(3);
    //   setTimeout(() => {
    //     subscriber.next(4);
    //     subscriber.complete();
    //   }, 1000);
    // });

    // observable.subscribe(res => {
    //   // this.chartByDate();
    //   this.load.loadUser()
    // })
  }

  printFirstNameAndLastName(prenom, nom){
    return prenom.concat(' '+nom).slice(0, 20);
  }

  openDialog() {
    this.dialog.open(DialogContentAddCommandeOrangeMoneyComponent);
  }
  
    openDialogMoMo(){
      this.dialog.open(DialogContentAddCommandeMobileMoneyComponent);
    }
  
    openTransfert(){
      this.dialog.open(DialogContentAddTransfertComponent);
    }
  
    openStartTimes(){
      this.dialog.open(DialogContentAddStartTimesComponent);
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
  
}
