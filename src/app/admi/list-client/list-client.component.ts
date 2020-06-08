import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { PrintClientService } from './../../services/print-client.service';
import { Component, OnInit } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  clients: Client[] = [];
  faUserPlus = faUserPlus;

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private dialog: MatDialog,private clientService: ClientService, public print: PrintClientService, private route: Router, private spinner: NgxSpinnerService) { 
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
    // this.jsService.jsAdmi();
    this.getAllClients();
  }

  getAllClients(){
    this.spinner.show(); 
    this.clientService.getAllClients().subscribe(res => {
      this.clients = res;
      this.spinner.hide(); 
      this.collection = { count: 20, data: this.clients };
    })
  }

  onDetails(id){
    this.route.navigate(['admi/details-client', id]);
  }

}
