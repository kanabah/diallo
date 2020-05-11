import { WeekService } from './../../services/week.service';
import { PrintClientService } from './../../services/print-client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { JsService } from 'src/app/services/js.service';
import { controlCodeTelValidator } from 'src/app/validators/tel-required-once-validator';
import { telUpdateClientValidator } from 'src/app/validators/tel-update-client-validator';
import { emailUpdateClientValidator } from 'src/app/validators/email-update-client-validator';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { element } from 'protractor';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  client$: Observable<Client>;
  client: Client;
  sumTotalPayer: number = 0;

  sumEntrerDay: any = 0;
  sumEntrerWeek: any = 0;
  sumEntrerMonth: any = 0;
  sumEntrerYear: any = 0;
  sumEntrerTotal: any = 0;

  sumCreditDay: any = 0;
  sumCreditWeek: any = 0;
  sumCreditMonth: any = 0;
  sumCreditYear: any = 0;
  sumCreditTotal: any = 0;

  countProductDay: any = 0;
  countProductWeek: any = 0;
  countProductMonth: any = 0;
  countProductYear: any = 0;
  countProductTotal: any = 0;

  somPayOrangeMoney: any = 0;
  somPayMobileMoney: any = 0;
  somPayStartTimes: any = 0;
  somPayTransfert: any = 0;
  somPayTotal: any = 0;

  somCreditOrangeMoney: any = 0;
  somCreditMobileMoney: any = 0;
  somCreditStartTimes: any = 0;
  somCreditTransfert: any = 0;
  somCreditTotal: any = 0;

  nbCommandeOM = 0;
  nbCommandeMoMo = 0;
  nbCommandeST = 0;
  nbCommandeTransfert = 0;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private js: JsService, private fb:FormBuilder, private _snackBar: MatSnackBar, private router: Router, public print: PrintClientService, private week: WeekService) { }
  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    // this.detaille();  
    this.clientService.getClient(id).subscribe(res => {
      this.client = res;
      console.log('somPayOrangeMoney', this.client);
      this.calculTransactionClient(this.week);
      
    })
  }
  
  calculTransactionClient(week){
    var sumTotalPayer = 0;
    var sumTotalCredit = 0;

    var somPayerOM = 0;
    var somPayerMoMo = 0;
    var somPayerST = 0;
    var somPayerTransfert = 0;

    var somCreditOM = 0;
    var somCreditMoMo = 0;
    var somCreditST = 0;
    var somCreditTransfert = 0;
    
    var nbCommandeOM = 0;
    var nbCommandeMoMo = 0;
    var nbCommandeST = 0;
    var nbCommandeTransfert = 0;
    
    var entrerDay = 0;
    var entrerWeek = 0;
    var entrerMonth = 0;
    var entrerYear = 0;
    var entrerTotal = 0;

    var creditDay = 0;
    var creditWeek = 0;
    var creditMonth = 0;
    var creditYear = 0;
    var creditTotal = 0;

    var countNbDay = 0;
    var countNbWeek = 0;
    var countNbMonth = 0;
    var countNbYear = 0;
    var countNbTotal = 0;
    
    var date = new Date();

    this.client.commandes.forEach(function(res){
      var dateCmd = new Date(res.dateCmd);
      if(res.delete == 0){
        sumTotalPayer += res.somPay;
        sumTotalCredit += res.somRest;
      }

      if(res.typeCmd == 'OM' && res.delete == 0){
        somPayerOM += res.somPay;
        somCreditOM += res.somRest;
        nbCommandeOM +=1;
      }

      if(res.typeCmd == 'MoMo' && res.delete == 0){
        somPayerMoMo += res.somPay;
        somCreditMoMo += res.somRest;
        nbCommandeMoMo += 1;
      }

      if(res.typeCmd == 'ST' && res.delete == 0){
        somPayerST += res.somPay;
        somCreditST += res.somRest;
        nbCommandeST +=1;
      }

      if(res.typeCmd == 'Transfert' && res.delete == 0){
        somPayerTransfert += res.somPay;
        somCreditTransfert += res.somRest;
        nbCommandeTransfert +=1;
      }

      if(dateCmd.getDate() == date.getDate() && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear()){
        entrerDay += res.somPay;
        creditDay += res.somRest;
        countNbDay +=1;
      }

      if(week.getWeekNumber(date) == week.getWeekNumber(dateCmd) && dateCmd.getFullYear() == date.getFullYear()){
        entrerWeek += res.somPay;
        creditWeek += res.somRest;
        countNbWeek +=1;
      }

      if(dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear()){
        entrerMonth += res.somPay;
        creditMonth += res.somRest;
        countNbMonth +=1;
      }

      if(dateCmd.getFullYear() == date.getFullYear()){
        entrerYear += res.somPay;
        creditYear += res.somRest;
        countNbYear +=1;
      }

      if(true){
        entrerTotal += res.somPay;
        creditTotal += res.somRest;
        countNbTotal +=1;
      }

    })

    if(!sumTotalCredit){
      sumTotalCredit = 1;
    }

    if(!sumTotalPayer){
      sumTotalPayer = 1;
    }
        
    this.sumEntrerDay = entrerDay;
    this.sumEntrerWeek = entrerWeek;
    this.sumEntrerMonth = entrerMonth;
    this.sumEntrerYear = entrerYear;
    this.sumEntrerTotal = entrerTotal;

    this.sumCreditDay = creditDay;
    this.sumCreditWeek = creditWeek;
    this.sumCreditMonth = creditMonth;
    this.sumCreditYear = creditYear;
    this.sumCreditTotal = creditTotal;

    this.countProductDay = countNbDay;
    this.countProductWeek = countNbWeek;
    this.countProductMonth = countNbMonth;
    this.countProductYear = countNbYear;
    this.countProductTotal = countNbTotal;

    this.somPayOrangeMoney = somPayerOM;
    this.somPayMobileMoney = somPayerMoMo;
    this.somPayStartTimes = somPayerST;
    this.somPayTransfert = somPayerTransfert;
    this.somPayTotal = sumTotalPayer;


    this.somCreditOrangeMoney = somCreditOM;
    this.somCreditMobileMoney = somCreditMoMo;
    this.somCreditStartTimes = somCreditST;
    this.somCreditTransfert = somCreditTransfert;
    this.somCreditTotal = sumTotalCredit;
    
    //NOMBRE DES COMMANDE CLIENT

    this.nbCommandeOM = nbCommandeOM;
    this.nbCommandeMoMo = nbCommandeMoMo;
    this.nbCommandeST = nbCommandeST;
    this.nbCommandeTransfert = nbCommandeTransfert;
  }
}
