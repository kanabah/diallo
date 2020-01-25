import { PrintClientService } from './../../services/print-client.service';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { Location } from '@angular/common';

@Component({
  selector: 'app-periode-commande-detaille',
  templateUrl: './periode-commande-detaille.component.html',
  styleUrls: ['./periode-commande-detaille.component.css']
})
export class PeriodeCommandeDetailleComponent implements OnInit {
  config: any;
  collection : any = {
    count: 0,
    data: []
  };
  client: Client;
  commandes: any;
  somCreditClient: any;
  somPayClient: any;
  nbCmd: any;
  
  constructor(private clientService: ClientService, private route: ActivatedRoute, private location: Location ,public print: PrintClientService ) {
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

  getCommandes(){
    let myParams = this.route.snapshot.paramMap.get('myParams');
    let id = this.route.snapshot.paramMap.get('id');

    this.clientService.periodeDetailleCommande(id, myParams).subscribe(res => {
      this.commandes = res['commandes'];
      this.somCreditClient = res['somCreditClient']
      this.somPayClient = res['somPayClient']
      this.nbCmd = res['nbCmd']
      this.client = res['client'][0];
      
      this.collection = { count: 20, data: this.commandes  };   
      console.log('CLients Detaille commande', res['somCreditClient']);
    }) 

  }

  ngOnInit() {
    this.getCommandes();
  }
  
  typeCmd(typeCmd){
    if(typeCmd == 'OM'){
      return 'assets/user/img/logo/om1.jpg';
    }else if(typeCmd == 'MoMo'){
      return 'assets/user/img/logo/momo.jpg';
    }else if(typeCmd == 'ST'){
      return 'assets/user/img/logo/images.jpg';
    }else if(typeCmd == 'Transfert'){
      return 'assets/user/img/logo/transfert.png';
    }
  }

  goBack(){
    this.location.back();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

}
