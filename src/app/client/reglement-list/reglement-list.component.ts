import { PrintClientService } from './../../services/print-client.service';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteReglementComponent } from '../delete-reglement/delete-reglement.component';
import { Subscription, timer } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reglement-list',
  templateUrl: './reglement-list.component.html',
  styleUrls: ['./reglement-list.component.css']
})
export class ReglementListComponent implements OnInit, OnDestroy {
  commandes: any;
  reglements: any;
  client: Client;
  cmd_id: any ;
  client_id: any ;
  reglement: any;
  config: any;
  collection : any = {
    count: 0,
    data: []
  };
  nb: any;
  subscription: Subscription;

  constructor(private clientService: ClientService, private route: ActivatedRoute, public dialog: MatDialog, private location: Location, public print: PrintClientService) {
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
    this.subscription = timer(0, 2000).subscribe(res => this.getReglement());
  }
  
  getReglement(){
    this.clientService.reglementList(this.route.snapshot.paramMap.get('cmd_id'), this.route.snapshot.paramMap.get('client_id')).subscribe(res => {
      this.reglements = res[0].reglement.filter(function(res){
        return res.delete == 0;
      })
      this.collection = { count: 20, data: this.reglements  };
      this.nb = this.reglements.length;
    })
    
    this.clientService.detaille(this.route.snapshot.paramMap.get('client_id')).subscribe(res => {
      this.client = res;
    })
  }

  returnBack(){
    this.location.back();
  }

  typeCmd(typeCmd){
    if(typeCmd == 'OM'){
      return 'assets/user/img/logo/orange.png';
    }else if(typeCmd == 'MoMo'){
      return 'assets/user/img/logo/mtn.jpg';
    }else if(typeCmd == 'ST'){
      return 'assets/user/img/logo/images.jpg';
    }else if(typeCmd == 'Transfert'){
      return 'assets/user/img/logo/transfert.png';
    }
  }

  openDelete(reglement_id){
    this.cmd_id = this.route.snapshot.paramMap.get('cmd_id');
    this.client_id = this.route.snapshot.paramMap.get('client_id');
    const dialogRef = this.dialog.open(DeleteReglementComponent, {
      data: {"reglement_id": reglement_id, "cmd_id": this.cmd_id, "client_id": this.client_id}
    });
    
    dialogRef.afterClosed().subscribe(result => { 
      console.log(`Dialog result: ${result}`);
    });
  }

  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
