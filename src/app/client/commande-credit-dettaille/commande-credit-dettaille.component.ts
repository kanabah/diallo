import { of } from 'rxjs';
import { PrintClientService } from './../../services/print-client.service';
import { Client } from 'src/app/interfaces/client';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';
import { count } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-commande-credit-dettaille',
  templateUrl: './commande-credit-dettaille.component.html',
  styleUrls: ['./commande-credit-dettaille.component.css']
})
export class CommandeCreditDettailleComponent implements OnInit {
  config: any;
  collection : any = {
    count: 0,
    data: []
  };
  client: Client;

  constructor(private clientService: ClientService, private route: ActivatedRoute, public print: PrintClientService, private location: Location) {
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
    this.getCommandeCredit();
  }

  getCommandeCredit(){
    let date = new Date();
    let periode = this.route.snapshot.paramMap.get('periode');

    this.clientService.getCommandeCredit(this.route.snapshot.paramMap.get('id')).subscribe(res => {
      this.client = res;
      let resultats = res.commandes.filter(function(result){
        return result.typePay !== 'Total';
      });

      if(periode == 'today'){        
        var resultatFilters = resultats.filter(function(result){
          var dateCmd = new Date(result.dateCmd);
          return  result.delete == 0 && dateCmd.getDate() == date.getDate() && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear();
        }) 
      }

      if(periode == 'month'){
        var resultatFilters = resultats.filter(function(result){
          var dateCmd = new Date(result.dateCmd);
          return  result.delete == 0 && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear();
        }) 
      }

      if(periode == 'year'){
        var resultatFilters = resultats.filter(function(result){
          var dateCmd = new Date(result.dateCmd);
          return  result.delete == 0 && dateCmd.getFullYear() == date.getFullYear();
        }) 
      }

      if(periode == 'all'){
        var resultatFilters = resultats.filter(function(result){
          return  result.delete == 0;
        }) 
      }

      this.collection = { count: 20, data: resultatFilters  };
    })
  }

  typeCmd(typeCmd){
    if(typeCmd == 'OM'){
      return 'assets/user/img/logo/om1.jpg';
    }else if(typeCmd == 'MoMo'){
      return 'assets/user/img/logo/momo.jpg';
    }else if(typeCmd == 'ST'){
      return 'assets/user/img/logo/images.jpg';
    }else if(typeCmd == 'Transfert'){
      return 'assets/user/img/logo/transfert.jpg';
    }
  }

  onReturn(){
    this.location.back();
  }
}
