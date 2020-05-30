import { UserService } from './../../services/user.service';
import { PrintClientService } from './../../services/print-client.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result-serach-client-by-agence-or-promoteur',
  templateUrl: './result-serach-client-by-agence-or-promoteur.component.html',
  styleUrls: ['./result-serach-client-by-agence-or-promoteur.component.css']
})
export class ResultSerachClientByAgenceOrPromoteurComponent implements OnInit {
  clients: Client[] = [];
  clientFilters: Client[] = [];

  p: number = 1;
  nbOM: number = 0;
  nbMoMo: number = 0;
  clis: any;
  count: any;

  constructor(private clientService: ClientService, private router: Router, public print: PrintClientService, public userService: UserService, private route: ActivatedRoute) { }
  
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.allClient(id);
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
    return prenom.concat(' '+nom).slice(0, 20);
  }

  allClient(id){
    this.clientService.allClient().subscribe(res => {
      this.clientFilters = res['clients'];
      this.clients = this.clientFilters.filter(result => {
        return result._id == id;
      })
      this.nbOM = res['nbOM'] 
      this.nbMoMo = res['nbMoMo'] 
      this.clis = res['clis'] 
      // this.collection = { count: 5, data: this.clients  };
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
