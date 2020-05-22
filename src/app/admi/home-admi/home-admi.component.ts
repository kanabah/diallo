import { GuichetService } from './../../services/guichet.service';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { JsService } from 'src/app/services/js.service';
import { PrintClientService } from './../../services/print-client.service';
import { Client } from './../../interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import CanvasJS from '../../../assets/admi/canvasjs.min';

@Component({
  selector: 'app-home-admi',
  templateUrl: './home-admi.component.html',
  styleUrls: ['./home-admi.component.css']
})
export class HomeAdmiComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription;
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

  transactions: any[] = [];
  guichets: any[] = [];
  
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

  countWester = 0;
  countWari = 0;
  countMoney = 0;

  nbCommandeOM: number = 0;
  nbCommandeMoMo: number = 0;
  nbCommandeTransfert: number = 0;
  nbCommandeST: number = 0;

  countTotal: number = 1;
  
  someTotalCommande: number = 0;
  someTotalGUichet: number = 0;
  
  dataPoints: any[] = [];

  commandeArray: any[] = [];

  objet: any;
  tab: any;

   getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }
  
  caclulForChart(){
    this.someTotalCommande = 0;
    this.someTotalGUichet = 0;
    this.commandeArray = [];
    var date = new Date();

    this.clientService.getAllClients().subscribe(res => {
      this.transactions = res;
      this.transactions.forEach(result => {
       result.commandes.forEach(element => {
        if(element.delete == 0){

           var dateCmd = new Date(element.dateCmd);
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
      });
    })

      this.guichetService.getGuichets().subscribe(res => {
        this.guichets = res;
  
        this.guichets.forEach(element => {
          if(element.action != 0){
            var createdAt = new Date(element.createdAt);
            if(element.type == 'wester'){
              this.countWester += 1;
            }
    
            if(element.type == 'wari'){
              this.countWari += 1;
            }
    
            if(element.type == 'money'){
              this.countMoney += 1;
            }

            if(createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
              this.someTotalGUichet += element.montant;
            }

          }
        })

        var total = this.someTotalGUichet + this.someTotalCommande;

        this.setCalcul(this.nbCommandeOM, this.nbCommandeMoMo, this.nbCommandeST, this.nbCommandeTransfert, this.countWari, this.countWester, this.countMoney, total)
      })

    }) 
  }

  setCalcul(om, momo, st, rechargement, wari, wester, money, total){
    var purcentOM = 0;
    var purcentMoMo = 0;
    var purcentST = 0;
    var purcentRechargement = 0;
    var purcentWari = 0;
    var purcentWester = 0;
    var purcentMoney = 0;
    var date = new Date();

    this.countTotal = om + momo + st + rechargement + wari + wester + money;

    purcentOM = (om * 100)/this.countTotal;
    purcentMoMo = (momo * 100)/this.countTotal;
    purcentST = (st * 100)/this.countTotal;
    purcentRechargement = (rechargement * 100)/this.countTotal;
    purcentWari = (wari * 100)/this.countTotal;
    purcentWester = (wester * 100)/this.countTotal;
    purcentMoney = (money * 100)/this.countTotal;

    console.log('PURCCENT OM', purcentOM);
    console.log('PURCCENT MOMO', purcentMoMo);
    console.log('PURCCENT ST', purcentST);
    console.log('PURCCENT RECHARGEMENT', purcentRechargement);
    console.log('PURCCENT mONEY GRAM', purcentMoney);
    console.log('TOTAL', total);



    this.dataPoints = [
      { y: purcentOM, label: "OM" },
      { y: purcentMoMo, label: "MoMo" },
      { y: purcentST, label: "ST" },
      { y: purcentRechargement, label: "Rechargement" },
      { y: purcentWari, label: "Wari" },
      { y: purcentWester, label: "Wester Union" },
      { y: purcentMoney, label: "Money Gram" },
    ]
    
  }

  constructor(private userService: UserService, private clientService: ClientService, public print: PrintClientService, private route: Router, private guichetService: GuichetService) {
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
    this.subscription = timer(0,5000).subscribe(res => {
      this.caclulForChart();
      this.getChartsColumn();
      this.getChartsDate();

    })

  }
  
  ngOnInit() {
    // this.jsService.jsAdmi();
    // this.caclulForChart();
    
    this.getAllUsers();
    this.test();

  }
  commandesTest: any[] = [];
  cmdTest: any[] = [];

  test(){
    var date = new Date();
    this.clientService.commandesByDate().subscribe(res => {
      this.commandesTest = res;
      this.commandesTest.forEach(element => {
        this.cmdTest.push({x: new Date(element.x), y: element.y})
      })
    })

    for(var i=0; i<29; i++){
      var dateTest = new Date(date.getFullYear(), date.getMonth(), i)
      
    }
  }

  getChartsColumn(){
    let chart = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Pourcentage des transactions"
      },
      data: [{
        type: "column",
        dataPoints: this.dataPoints
      }]
    });
      
    chart.render();
  }

  getChartsDate(){
    let chart = new CanvasJS.Chart("chartContainer2",
    {
      title: {
        text: "Using formatDate inside Custom Formatter"
      },
      axisX: {
        labelFormatter: function (e) {
          return CanvasJS.formatDate( e.value, "DD MMM");
        },
      },
      
      data: [
      {
        type: "spline",
        dataPoints:  this.cmdTest
        // [
        //   { x: new Date(2010, 0, 3), y: 10 },
        //   { x: new Date(2010, 0, 5), y: 100 },
        //   { x: new Date(2010, 0, 7), y: 110 },
        //   { x: new Date(2010, 0, 9), y: 158 },
        //   { x: new Date(2010, 0, 11), y: 34 },
        //   { x: new Date(2010, 0, 13), y: 363 },
        //   { x: new Date(2010, 0, 15), y: 247 },
        //   { x: new Date(2010, 0, 17), y: 253 },
        //   { x: new Date(2010, 0, 19), y: 269 },
        //   { x: new Date(2010, 0, 21), y: 343 },
        //   { x: new Date(2010, 0, 23), y: 370 },
        //   { x: new Date(2010, 0, 25), y: 588 },
        //   { x: new Date(2010, 0, 27), y: 900 },
        //   { x: new Date(2010, 0, 29), y: 200 },
        // ]
      }
      ]                      
    });
    chart.render();
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
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
