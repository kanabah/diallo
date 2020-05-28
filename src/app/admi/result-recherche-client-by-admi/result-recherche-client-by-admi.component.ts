import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { PrintClientService } from './../../services/print-client.service';
import { Component, OnInit } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-result-recherche-client-by-admi',
  templateUrl: './result-recherche-client-by-admi.component.html',
  styleUrls: ['./result-recherche-client-by-admi.component.css']
})
export class ResultRechercheClientByAdmiComponent implements OnInit {
  client: Client;
  faUserPlus = faUserPlus;

 

  constructor(private dialog: MatDialog,private clientService: ClientService, public print: PrintClientService, private route: Router, private router: ActivatedRoute) { 
    
  }
  

  ngOnInit() {
    // this.jsService.jsAdmi();
    let id = this.router.snapshot.paramMap.get('id');
    this.getClient(id);
  }

  getClient(id){
    this.clientService.getClient(id).subscribe(res => {
      this.client = res;
    })
  }

  onDetails(id){
    this.route.navigate(['admi/details-client', id]);
  }

}
