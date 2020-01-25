import { PrintClientService } from './../../services/print-client.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-client',
  templateUrl: './all-client.component.html',
  styleUrls: ['./all-client.component.css']
})
export class AllClientComponent implements OnInit {
  clients: Client[] = [];

  p: number = 1;
  nbOM: number = 0;
  nbMoMo: number = 0;
  clis: any;
  count: any;

  constructor(private clientService: ClientService, private router: Router, public print: PrintClientService) { }
  
  
  ngOnInit() {
    this.allClient();
  }

  printAdress(commnune, quartier, secteur){
    if(commnune == 'none' && quartier == '' && secteur == ''){
      return "Pas d'adresse";
    }else{
      if(commnune == 'none'){
        commnune = '';
      }
      return commnune.concat(' '+quartier).concat(' '+secteur).slice(0, 27);
    }
  }

  printFullName(prenom, nom){
    return prenom.concat(' '+nom).slice(0, 29);
  }

  allClient(){
    this.clientService.allClient().subscribe(res => {
      this.clients = res['clients'];
      this.nbOM = res['nbOM'] 
      this.nbMoMo = res['nbMoMo'] 
      this.clis = res['clis'] 
      // this.collection = { count: 5, data: this.clients  };
      console.log('Clis', this.clis);
    });
        
  }

  returnNbCmdClient(typeCmd, id){
    this.count = this.clis.filter(function(res){
      // console.log('Count', res);
      return res.commandes.typeCmd == typeCmd && res._id == id && res.commandes.delete == 0;
    })
    return this.count.length;

        
  }

  onDetailleClient(id){
    this.router.navigate(['client/all/detaille/', id])
  }

}
