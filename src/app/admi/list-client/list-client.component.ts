import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { JsService } from 'src/app/services/js.service';
import { AttributeRoleComponent } from './../attribute-role/attribute-role.component';
import { ConfirmPasswordComponent } from './../confirm-password/confirm-password.component';
import { MatDialog } from '@angular/material/dialog';
import { PrintClientService } from './../../services/print-client.service';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private dialog: MatDialog,private clientService: ClientService, public print: PrintClientService, private jsService: JsService) { 
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
    this.clientService.getAllClients().subscribe(res => {
      this.clients = res;
      
      this.collection = { count: 20, data: this.clients };
    })
  }

}
