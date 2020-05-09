import { WeekService } from './../../services/week.service';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { PrintClientService } from './../../services/print-client.service';
import { Client } from './../../interfaces/client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commandes-list-admi',
  templateUrl: './commandes-list-admi.component.html',
  styleUrls: ['./commandes-list-admi.component.css']
})
export class CommandesListAdmiComponent implements OnInit {
  clientFilters: Client[] = [];
  clients: Client[] = [];

  periode: any;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private clientService: ClientService, public print: PrintClientService, private router: Router, private route: ActivatedRoute, private week: WeekService) {
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
    var result = this.week.getWeekNumber(new Date())
    console.log('DATE WEEK', result);
    this.getClients();
  }

  getClients(){
    this.route.paramMap.pipe(
    switchMap(params => {
      this.periode = params.get('periode');
      return this.clientService.getAllClients();
    })).subscribe(res => {
        var date = new Date();
        this.clientFilters = res;
        // console.log('Periode', this.periode);
        

        if(this.periode == 'total'){
          this.clients = this.clientFilters.filter(result => {
            return result.nbCmd != 0;
          })
        }

        if(this.periode == 'day'){
          this.clients = this.clientFilters.filter(result => {
            var deteCmdUpdate = new Date(result.deteCmdUpdate);
            return result.nbCmd != 0 && deteCmdUpdate.getDate() == date.getDate() && deteCmdUpdate.getMonth() == date.getMonth() && deteCmdUpdate.getFullYear() == date.getFullYear();
          })
        }

        if(this.periode == 'week'){
          this.clients = this.clientFilters.filter(result => {
            var deteCmdUpdate = new Date(result.deteCmdUpdate);
            return result.nbCmd != 0 && this.week.getWeekNumber(date) == this.week.getWeekNumber(deteCmdUpdate) && deteCmdUpdate.getFullYear() == date.getFullYear(); //== this.filterDatesByCurrentWeek([deteCmdUpdate]);
          })
        }

        if(this.periode == 'month'){
          this.clients = this.clientFilters.filter(result => {
            var deteCmdUpdate = new Date(result.deteCmdUpdate);
            return result.nbCmd != 0 && deteCmdUpdate.getMonth() == date.getMonth() && deteCmdUpdate.getFullYear() == date.getFullYear();
          })
        }

        if(this.periode == 'year'){
          this.clients = this.clientFilters.filter(result => {
            var deteCmdUpdate = new Date(result.deteCmdUpdate);
            return result.nbCmd != 0 && deteCmdUpdate.getFullYear() == date.getFullYear();
          })
        }

        this.clients.sort((a: any, b: any) => a.deteCmdUpdate < b.deteCmdUpdate ? 1 : a.deteCmdUpdate > b.deteCmdUpdate ? -1 : 0);
        this.collection = { count: 20, data: this.clients };
    });
  }

  getCreditClient(id){
    var sumTotal = 0;
    var sumOM = 0;
    var sumMoMo = 0;
    var sumST = 0;
    var sumTransfert = 0;

    var clis = this.clients.filter(res => {
      return res._id == id
    })
    clis[0].commandes.forEach(res =>{
      sumTotal +=res.somRest;
      
      if(res.typeCmd == 'OM'){
          sumOM +=res.somRest;
      }

      if(res.typeCmd == 'MoMo'){
          sumMoMo +=res.somRest;
      }
      if(res.typeCmd == 'ST'){
          sumST +=res.somRest;
      }
      if(res.typeCmd == 'Transfert'){
          sumTransfert +=res.somRest;
      }
    });
    
    var resultats = {
        somRestOM: sumOM,
        somRestMoMo: sumMoMo,
        somRestST: sumST,
        somRestTransfert: sumTransfert,
        somRestTotal: sumTotal,
    }

    return resultats;
  }

  getTitleCommande(periode){
    if(periode == 'total'){
      return 'Commandes Total';
    }else if(periode == 'day'){
      return "Commande Ajaurd'hui";
    }else if(periode == 'week'){
      return 'Commande de la semmaine';
    }else if(periode == 'month'){
      return 'Commande du mois';
    }else if(periode == 'year'){
      return "Commande de l'annnee";
    }
  }
  
  getDetail(id){
    this.router.navigate(['/admi/commandes-list/total/details', id, this.periode]);
  }
}
