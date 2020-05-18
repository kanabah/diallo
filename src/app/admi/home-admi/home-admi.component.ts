import { Router } from '@angular/router';
import { JsService } from 'src/app/services/js.service';
import { PrintClientService } from './../../services/print-client.service';
import { Client } from './../../interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import CanvasJS from '../../../assets/admi/canvasjs.min';

@Component({
  selector: 'app-home-admi',
  templateUrl: './home-admi.component.html',
  styleUrls: ['./home-admi.component.css']
})
export class HomeAdmiComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  agences: User[] = [];
  agenceActive: User[] = [];
  promoteurs: User[] = [];
  cmds: any[] = [];
  commandes: any[] = [];
  clients: Client[] = [];
  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  redirect: boolean = false;
  
  sumTotalOM: number = 0;
  sumTotalMoMo: number = 0;
  sumTotalST: number = 0;
  sumTotalTransfert: number = 0;

  sumTotalOMDay: number = 0;
  sumTotalMoMoDay: number = 0;
  sumTotalSTDay: number = 0;
  sumTotalRechargementDay: number = 0;

  pourcentOM: number = 0;
  pourcentMoMo: number = 0;
  pourcentST: number = 0;
  pourcentRechargement: number = 0;  

  alertOM: any;
  alertMoMo: any;
  alertST: any;
  alertRechargement: any;

  alertOMDay: any;
  alertMoMoDay: any;
  alertSTDay: any;
  alertRechargementDay: any;

  constructor(private userService: UserService, private clientService: ClientService, public print: PrintClientService, private route: Router) {
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

  
  changeEtat(id){
    this.userService.changeEtatUser(id).subscribe(res => {
      this.redirect = false;
    })
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  ngAfterViewInit(){
  }
  
  ngOnInit() {
    this.getChartsColumn();
    // this.jsService.jsAdmi();
    this.getAllUsers();
  }

  getChartsColumn(){
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart.render();
  }

  getChartCercle(){
    
  }

  getAllUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.agences = this.users.filter(result => {
        return result.role == 'user' && result.active == 1;
      });

      this.agenceActive = this.users.filter(result => {
        return result.role == 'user' && result.confirm == 1;
        // return result.role == 'user';
      });

      this.collection = { count: 20, data: this.agenceActive };

      this.promoteurs = this.users.filter(result => {
        return result.role == 'promoteur' && result.active == 1;
      })
    });

    this.clientService.getClients().subscribe(res => {
      this.clients = res;
    });
    
    this.clientService.allCommande().subscribe(res => {
      this.cmds = res;

      this.commandes = this.cmds.filter(result => {
        return result.delete == 0;
      });

      let date = new Date();
      this.commandes.forEach(element => {
        var dateCmdElement = new Date(element.dateCmd)
        if(element.typeCmd == 'OM'){
          if(dateCmdElement.getDate() == date.getDate() && dateCmdElement.getMonth() == date.getMonth() && dateCmdElement.getFullYear() == date.getFullYear()){
            this.sumTotalOMDay += element.somPay;
          }

          this.sumTotalOM += element.somPay
        }else if(element.typeCmd == 'MoMo'){
          if(dateCmdElement.getDate() == date.getDate() && dateCmdElement.getMonth() == date.getMonth() && dateCmdElement.getFullYear() == date.getFullYear()){
            this.sumTotalMoMoDay += element.somPay;
          }

          this.sumTotalMoMo += element.somPay
        }else if(element.typeCmd == 'ST'){
          if(dateCmdElement.getDate() == date.getDate() && dateCmdElement.getMonth() == date.getMonth() && dateCmdElement.getFullYear() == date.getFullYear()){
            this.sumTotalSTDay += element.somPay;
          }

          this.sumTotalST += element.somPay
        }else if(element.typeCmd == 'Transfert'){
          if(dateCmdElement.getDate() == date.getDate() && dateCmdElement.getMonth() == date.getMonth() && dateCmdElement.getFullYear() == date.getFullYear()){
            this.sumTotalRechargementDay += element.somPay;
          }

          this.sumTotalTransfert += element.somPay
        }

      })

      var total = this.sumTotalOM + this.sumTotalMoMo + this.sumTotalST + this.sumTotalTransfert;
        this.pourcentOM = Math.round((this.sumTotalOM * 100)/ total);
        this.pourcentMoMo = Math.round((this.sumTotalMoMo * 100)/ total);
        this.pourcentST = Math.round((this.sumTotalST * 100)/ total);
        this.pourcentRechargement = Math.round((this.sumTotalTransfert * 100)/ total);
        this.calculPourcentageColor();
    })

  }

  calculPourcentageColor(){

    //PURCENT ORANGE MONEY
    if(this.pourcentOM <= 15){
      this.alertOM = 'danger';
    }else if(this.pourcentOM >= 16 && this.pourcentOM <= 40){
      this.alertOM = 'warning'
    }else if(this.pourcentOM > 40 ){
      this.alertOM = 'success';
    }

    //PURCENT MoMo
    if(this.pourcentMoMo <= 15){
      this.alertMoMo = 'danger';
    }else if(this.pourcentMoMo >= 16 && this.pourcentMoMo <= 40){
      this.alertMoMo = 'warning'
    }else if(this.pourcentMoMo > 40 ){
      this.alertMoMo = 'success';
    }

    //PURCENT Start Times
    if(this.pourcentST <= 15){
      this.alertST = 'danger';
    }else if(this.pourcentST >= 16 && this.pourcentST <= 40){
      this.alertST = 'warning'
    }else if(this.pourcentST > 40 ){
      this.alertST = 'success';
    }

    //PURCENT Transfert
    if(this.pourcentRechargement <= 15){
      this.alertRechargement = 'danger';
    }else if(this.pourcentRechargement >= 16 && this.pourcentRechargement <= 40){
      this.alertRechargement = 'warning'
    }else if(this.pourcentRechargement > 40 ){
      this.alertRechargement = 'success';
    }

    var born1 = 7000000;
    var born2 = 7000001;
    var born3 = 19000000;
    // var born4 = 8000001;

    //PURCENT SOME TOTAL JOURNER ORANGE MONEY
    if(this.sumTotalOMDay <= born1){
      this.alertOMDay = 'danger';
    }else if(this.sumTotalOMDay >= born2 && this.sumTotalOMDay <= born3){
      this.alertOMDay = 'warning'
    }else if(this.sumTotalOMDay > born3 ){
      this.alertOMDay = 'success';
    }

    //PURCENT SOME TOTAL JOURNER  MoMo
    if(this.sumTotalMoMoDay <= born1){
      this.alertMoMoDay = 'danger';
    }else if(this.sumTotalMoMoDay >= born2 && this.sumTotalMoMoDay <= born3){
      this.alertMoMoDay = 'warning'
    }else if(this.sumTotalMoMoDay > born3 ){
      this.alertMoMoDay = 'success';
    }

    //PURCENT SOME TOTAL JOURNER  Start Times
    if(this.sumTotalSTDay <= born1){
      this.alertSTDay = 'danger';
    }else if(this.sumTotalSTDay >= born2 && this.sumTotalSTDay <= born3){
      this.alertSTDay = 'warning'
    }else if(this.sumTotalSTDay > born3 ){
      this.alertSTDay = 'success';
    }

    //PURCENT SOME TOTAL JOURNER  Transfert
    if(this.sumTotalRechargementDay <= born1){
      this.alertRechargementDay = 'danger';
    }else if(this.sumTotalRechargementDay >= born2 && this.sumTotalRechargementDay <= born3){
      this.alertRechargementDay = 'warning'
    }else if(this.sumTotalRechargementDay > born3 ){
      this.alertRechargementDay = 'success';
    }

  }

  onDetails(id){
    if(!this.redirect){
      this.route.navigate(['/admi/details-agence', id])
    }
  }
}
