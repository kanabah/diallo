import { Location } from '@angular/common';
import { PrintClientService } from './../../services/print-client.service';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { WeekService } from 'src/app/services/week.service';

@Component({
  selector: 'app-commandes-detaille-admi',
  templateUrl: './commandes-detaille-admi.component.html',
  styleUrls: ['./commandes-detaille-admi.component.css']
})
export class CommandesDetailleAdmiComponent implements OnInit {
  clients: Client[] = [];
  clientFilters: Client[] = [];
  commandes: any[];
  client: Client;

  periode: any;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private clientService: ClientService, private route: ActivatedRoute, public print: PrintClientService, private location: Location, private week: WeekService) {
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

  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let periode = this.route.snapshot.paramMap.get('periode');

    this.getClient(id, periode);
  }

  getClient(id, periode){
    this.clientService.getAllClients().subscribe(res => {
      this.clientFilters = res;
      this.client = res[0];
      var date = new Date();

      this.clients = this.clientFilters.filter(result => {
        return result._id == id;
      })

      this.commandes = this.clients[0].commandes.filter(response => {
        var dateCmd = new Date(response.dateCmd);
        if(periode == 'day'){
          return dateCmd.getDate() == date.getDate() && dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear();
        }else if(periode == 'week'){
          return this.week.getWeekNumber(date) == this.week.getWeekNumber(dateCmd)  && dateCmd.getFullYear() == date.getFullYear();
        }else if(periode == 'month'){
          return dateCmd.getMonth() == date.getMonth() && dateCmd.getFullYear() == date.getFullYear();
        }else if(periode == 'year'){
          return dateCmd.getFullYear() == date.getFullYear();
        }else{
          return response;
        }
      });

      this.commandes.sort((a: any, b: any) => a.dateCmd < b.dateCmd ? 1 : a.dateCmd > b.dateCmd ? -1 : 0);
      this.collection = { count: 20, data: this.commandes  };  
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

  onRetour(){
    this.location.back();
  }

}
