import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { PrintClientService } from './../../services/print-client.service';
import { Component, OnInit } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-visit-client-for-agence',
  templateUrl: './visit-client-for-agence.component.html',
  styleUrls: ['./visit-client-for-agence.component.css']
})
export class VisitClientForAgenceComponent implements OnInit {
  clients: Client[] = [];
  faUserPlus = faUserPlus;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private dialog: MatDialog,private clientService: ClientService, public print: PrintClientService, private route: Router, private router: ActivatedRoute) { 
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
    var id = this.router.snapshot.paramMap.get('id');

    this.getAllClients(id);
  }

  getAllClients(id){
    this.clientService.getAllClients().subscribe(res => {
      this.clients = res.filter(result => {
        return result.user_id._id == id;
      });
      
      this.collection = { count: 20, data: this.clients };
    })
  }

  onDetails(id){
    this.route.navigate(['admi/details-client', id]);
  }

}
