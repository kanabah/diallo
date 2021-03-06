import { NgxSpinnerService } from 'ngx-spinner';
import { ResourcesService } from './../../services/resources.service';
import { GuichetService } from './../../services/guichet.service';
import { Subscription, timer, Observable } from 'rxjs';
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
  subscriptionGraph: Subscription;
  users: User[] = [];
  agences: User[] = [];
  agenceActive: User[] = [];
  promoteurs: User[] = [];
  usersGuichet: User[] = [];
  cmds: any[] = [];
  commandes: any[] = [];
  clients: Client[] = [];
  clientForCommandes: Client[] = [];
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

  commandesTest: any[] = [];
  cmdTest: any[] = [];
  commandesFilters: any[] = [];
  commandesResult: any[] = [];
  guichFilters: any[] = [];
  
  TotalSumCommande: number = 0;
  TotalSumGuichet: number = 0;
  TotalSumCommandeLastMonth: number = 0;
  TotalSumGuichetLastMonth: number = 0;

  purcentCommande: number = 0;
  purcentGuichet: number = 0;
  alertPurcenCommande: any;
  alertPurcenGuichet: any;

  purcentCommandeLastMonth: number = 0;
  purcentGuichetLastMonth: number = 0;
  alertPurcenCommandeLastMonth: any;
  alertPurcenGuichetLastMonth: any;

  nombreCmd: number = 0;
  nombreGuichet: number = 0;
  nombreCmdLastMonth: number = 0;
  nombreGuichetLastMonth: number = 0;

  purcentageCmd: number = 0;
  purcentageGuichet: number = 0;
  alertPourcentageCommandes: any;
  alertPourcentageGuichet: any;

  purcentageCmdLastMonth: number = 0;
  purcentageGuichetLastMonth: number = 0;
  alertPourcentageCommandesLastMonth: any;
  alertPourcentageGuichetLastMonth: any;

  totalEspeceMonth: number = 0;
  totalEspeceLastMonth: number = 0;

  month: boolean = true;

  getClients(){
    var date = new Date();
    var dateLastMonth = new Date();
    dateLastMonth.setMonth(dateLastMonth.getMonth() - 1 );
    var lastMonth = dateLastMonth.getMonth();

    console.log('My Date', lastMonth);

    
    var total = 1;
    var totalCmd = 1;
    var totalCmdLastMonth = 1;

    this.clientService.getAllClients().subscribe(res => {
      this.clientForCommandes = res;

      this.commandesFilters = res;
      this.commandesFilters.forEach(result => {
        result.commandes.forEach(element => {
          var dateCmd = new Date(element.dateCmd);
          if(element.delete == 0 && dateCmd.getMonth() == dateLastMonth.getMonth() && dateCmd.getFullYear() == dateLastMonth.getFullYear()){
            this.TotalSumCommandeLastMonth += element.somPay;
            this.nombreCmdLastMonth += 1;
          }

          if(element.delete == 0 && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear()){
            this.TotalSumCommande += element.somPay;
            this.nombreCmd += 1;
          }
        })
      });

      this.guichetService.getGuichets().subscribe(result => {
        this.guichFilters = result;

        this.guichFilters.forEach(response => {
          var createdAt = new Date(response.createdAt);
          if(response.action == 1 && response.delete == 0 && createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
            this.TotalSumGuichet += response.montant;
            this.nombreGuichet += 1;
          }
          
          if(response.action == 1 && response.delete == 0 && createdAt.getMonth() == dateLastMonth.getMonth() && createdAt.getFullYear() == dateLastMonth.getFullYear()){
            this.TotalSumGuichetLastMonth += response.montant;
            this.nombreGuichetLastMonth += 1;
          }
        })

        //CLCULE POUR LES POURCENTAGE EN NOMBRE
        totalCmd = this.nombreCmd + this.nombreGuichet;
        totalCmd = totalCmd == 0 ? 1 : totalCmd;
        this.purcentageCmd = this.roundDown((this.nombreCmd * 100)/totalCmd, 0);
        this.purcentageGuichet = this.roundDown((this.nombreGuichet * 100)/totalCmd, 0);

        totalCmdLastMonth = this.nombreCmdLastMonth + this.nombreGuichetLastMonth;
        totalCmdLastMonth = totalCmdLastMonth == 0 ? 1 : totalCmdLastMonth;
        this.purcentageCmdLastMonth = this.roundDown((this.nombreCmdLastMonth * 100)/totalCmdLastMonth, 0);
        this.purcentageGuichetLastMonth = this.roundDown((this.nombreGuichetLastMonth * 100)/totalCmdLastMonth, 0);

        //CLCULE POUR LES POURCENTAGE EN ESPECE
        total = this.TotalSumGuichet + this.TotalSumCommande;
        total = total == 0 ? 1 : total;
        this.totalEspeceMonth = total;

        this.totalEspeceLastMonth = this.TotalSumGuichetLastMonth + this.TotalSumCommandeLastMonth;
        this.totalEspeceLastMonth = this.totalEspeceLastMonth == 0 ? 1 : this.totalEspeceLastMonth;
        
        this.purcentCommande = this.roundDown((this.TotalSumCommande * 100)/total, 0);
        this.purcentGuichet = this.roundDown((this.TotalSumGuichet * 100)/total, 0);

        this.purcentCommandeLastMonth = this.roundDown((this.TotalSumCommandeLastMonth * 100)/this.totalEspeceLastMonth, 0);
        this.purcentGuichetLastMonth = this.roundDown((this.TotalSumGuichetLastMonth * 100)/this.totalEspeceLastMonth, 0);
        
        //PURCENT COmmandes Espece
        if(this.purcentCommande <= 15){
          this.alertPurcenCommande = 'danger';
        }else if(this.purcentCommande >= 16 && this.purcentCommande <= 40){
          this.alertPurcenCommande = 'warning'
        }else if(this.purcentCommande > 40 ){
          this.alertPurcenCommande = 'success';
        }

        //PURCENT Guichet Espece
        if(this.purcentGuichet <= 15){
          this.alertPurcenGuichet = 'danger';
        }else if(this.purcentGuichet >= 16 && this.purcentGuichet <= 40){
          this.alertPurcenGuichet = 'warning'
        }else if(this.purcentGuichet > 40 ){
          this.alertPurcenGuichet = 'success';
        }

        //PURCENT COmmandes Espece LAST MONTH
        if(this.purcentCommandeLastMonth <= 15){
          this.alertPurcenCommandeLastMonth = 'danger';
        }else if(this.purcentCommandeLastMonth >= 16 && this.purcentCommandeLastMonth <= 40){
          this.alertPurcenCommandeLastMonth = 'warning'
        }else if(this.purcentCommandeLastMonth > 40 ){
          this.alertPurcenCommandeLastMonth = 'success';
        }

        //PURCENT Guichet Espece LAST MONTH
        if(this.purcentGuichetLastMonth <= 15){
          this.alertPurcenGuichetLastMonth = 'danger';
        }else if(this.purcentGuichetLastMonth >= 16 && this.purcentGuichetLastMonth <= 40){
          this.alertPurcenGuichetLastMonth = 'warning'
        }else if(this.purcentGuichetLastMonth > 40 ){
          this.alertPurcenGuichetLastMonth = 'success';
        }


        //PURCENT Quantite Commandes
        if(this.purcentageCmd <= 15){
          this.alertPourcentageCommandes = 'danger';
        }else if(this.purcentageCmd >= 16 && this.purcentageCmd <= 40){
          this.alertPourcentageCommandes = 'warning'
        }else if(this.purcentageCmd > 40 ){
          this.alertPourcentageCommandes = 'success';
        }

        //PURCENT Quantite Guichet
        if(this.purcentageGuichet <= 15){
          this.alertPourcentageGuichet = 'danger';
        }else if(this.purcentageGuichet >= 16 && this.purcentageGuichet <= 40){
          this.alertPourcentageGuichet = 'warning'
        }else if(this.purcentageGuichet > 40 ){
          this.alertPourcentageGuichet = 'success';
        }

        //PURCENT Quantite Commandes LAST MONTH
        if(this.purcentageCmdLastMonth <= 15){
          this.alertPourcentageCommandesLastMonth = 'danger';
        }else if(this.purcentageCmdLastMonth >= 16 && this.purcentageCmdLastMonth <= 40){
          this.alertPourcentageCommandesLastMonth = 'warning'
        }else if(this.purcentageCmdLastMonth > 40 ){
          this.alertPourcentageCommandesLastMonth = 'success';
        }

        //PURCENT Quantite Guichet LAST MONTH
        if(this.purcentageGuichetLastMonth <= 15){
          this.alertPourcentageGuichetLastMonth = 'danger';
        }else if(this.purcentageGuichetLastMonth >= 16 && this.purcentageGuichetLastMonth <= 40){
          this.alertPourcentageGuichetLastMonth = 'warning'
        }else if(this.purcentageGuichetLastMonth > 40 ){
          this.alertPourcentageGuichetLastMonth = 'success';
        }

      });

      

      this.clientForCommandes.sort((n1: any,n2: any) =>  n2.nbCmd - n1.nbCmd);
      // console.log('MY Som Tttal COMMANDES', this.alertPurcenCommande);
      
    })
  }

  roundDown(number, decimals) {
    decimals = decimals || 0;
    return ( Math.floor( number * Math.pow(10, decimals) ) / Math.pow(10, decimals) );
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
  
  thisMonth(){
    this.month = true;
  }

  lastMonth(){
    this.month = false;
  }

  constructor(private userService: UserService, private clientService: ClientService, public print: PrintClientService, private route: Router, private guichetService: GuichetService, private spinner: NgxSpinnerService, private js: JsService, private load: ResourcesService) {
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
    this.subscription = timer(0,3000).subscribe(res => {
      this.getChartsDate();
      this.chartByDate();
    })

    this.subscriptionGraph = timer(0, 15000).subscribe(res => {
      this.caclulForChart();
      this.getChartsColumn();
    })
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    observable.subscribe(res => {
      console.log('JE SUIS LA REPONSE');
      this.caclulForChart();
      this.getChartsColumn();
      this.getChartsDate();
      this.load.loadAdmi();
    })
    
  }
  
  ngOnInit() {
    this.getAllUsers();
    this.getClients();
    
  }
  
  chartByDate(){
    this.cmdTest = [];
    if(this.month){
      this.clientService.commandesByDate().subscribe(res => {
        this.commandesTest = res;
        this.commandesTest.forEach(element => {
          this.cmdTest.push({x: new Date(element.x), y: element.y})
        })
      })
    }else{
      this.clientService.commandesByDateLastMonth().subscribe(res => {
        this.commandesTest = res;
        this.commandesTest.forEach(element => {
          this.cmdTest.push({x: new Date(element.x), y: element.y})
        })
      })
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
        text: "Variations des entrer par mois"
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
      }
      ]                      
    });
    chart.render();
  }

  getAllUsers(){
    this.spinner.show(); 
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.agences = this.users.filter(result => {
        return result.role == 'user' && result.active == 1;
      });

      this.agenceActive = this.users.filter(result => {
        return (result.role == 'user' || result.role == 'guichet') && result.confirm == 1;
        // return result.role == 'user';
      });

      this.collection = { count: 20, data: this.agenceActive };

      this.promoteurs = this.users.filter(result => {
        return result.role == 'promoteur' && result.active == 1;
      });

      this.usersGuichet = this.users.filter(result => {
        return result.role == 'guichet' && result.active == 1;
      })

      this.spinner.hide();
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
    this.subscriptionGraph.unsubscribe();
  }
}
