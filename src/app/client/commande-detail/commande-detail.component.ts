import { PrintClientService } from './../../services/print-client.service';
import { UpdateCommandeComponent } from './../update-commande/update-commande.component';
import { DialogDeleteCommandeComponent } from './../dialog-delete-commande/dialog-delete-commande.component';
import { DialogReglementComponent } from './../dialog-reglement/dialog-reglement.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-commande-detail',
  templateUrl: './commande-detail.component.html',
  styleUrls: ['./commande-detail.component.css']
})
export class CommandeDetailComponent implements OnInit, OnDestroy {
  faCoffee = faCoffee;
  faCartArrowDown = faCartArrowDown;
  faBook = faBook;
  client: any;
  config: any;
  collection : any = {
    count: 0,
    data: []
  };
  subscription: Subscription;
  commandes: any;
  periode: string = 'total';
  order: string = 'cmd.modePay';
  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router, public dialog: MatDialog, private location: Location, public print: PrintClientService) {
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

  returnToClientCommande(){
    this.router.navigate(['client/commandes/all'])
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.subscription = timer(0, 10000).subscribe(res => this.getClient());
  }
  
  public getClient(){
    if((this.periode == 'total')){

      this.clientService.detaille(this.route.snapshot.paramMap.get('id')).subscribe(res => {
        this.client = res;
        
        this.commandes = res.commandes.filter(function(res){
          return res.delete == 0;
        })
        
        this.commandes.sort((a: any, b: any) => a.dateCmd < b.dateCmd ? 1 : a.dateCmd > b.dateCmd ? -1 : 0);
        this.collection = { count: 20, data: this.commandes  };
      })
    }else if(this.periode == 'aujourdhui'){
      this.onAujourdhui(this.route.snapshot.paramMap.get('id'));
    }else if(this.periode == 'semaine'){
      this.onSemaine(this.route.snapshot.paramMap.get('id'));
    }else if(this.periode == 'mois'){
      this.onMonth(this.route.snapshot.paramMap.get('id'));
    }else if(this.periode == 'tranche'){
      this.onTranche(this.route.snapshot.paramMap.get('id'));
    }else if(this.periode == 'credit'){
      this.onCredit(this.route.snapshot.paramMap.get('id'));
    }else if(this.periode == 'totalCmd'){
      this.onTotalCmd(this.route.snapshot.paramMap.get('id'));
    }
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

  onReturn(){
    this.location.back();
  }

  openDialog(id, client_id) {
    const dialogRef = this.dialog.open(DialogReglementComponent, {
      data: {"id": id, "client_id": client_id}
    });
    
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDelete(id, client_id){
    this.dialog.open(DialogDeleteCommandeComponent, {
      data: {"id": id, "client_id": client_id}
    });
  }

  onUpdateCommande(cmd_id, client_id){
    this.dialog.open(UpdateCommandeComponent, {
      data: {"cmd_id": cmd_id, "client_id": client_id}
    });
  }

  goToListReglement(cmd_id, client_id){
    this.router.navigate(['client/commandes/commande-detaill/reglement-list/', cmd_id, client_id])
  }

  onAujourdhui(client_id){
    this.clientService.onAujourdhui(client_id).subscribe(res => {
      this.periode = 'aujourdhui';
      this.collection = { count: 20, data: res  };
    })
  }

  onSemaine(client_id){
    this.clientService.onSemaine(client_id).subscribe(res => {
      this.periode = 'semaine';
      this.collection = { count: 20, data: res  };
    })
  }

  onMonth(client_id){
    this.clientService.onMonth(client_id).subscribe(res => {
      this.periode = 'mois';
      this.collection = { count: 20, data: res  };
    })
  }

  onTranche(client_id){
    this.clientService.onTranche(client_id).subscribe(res => {
      this.periode = 'tranche';
      this.collection = { count: 20, data: res  };
    })
    // this.ngOnDestroy();
  }

  onCredit(client_id){
    this.clientService.onCredit(client_id).subscribe(res => {
      this.periode = 'credit';
      this.collection = { count: 20, data: res  };
    })
  }

  onTotalCmd(client_id){
    this.clientService.onTotalCmd(client_id).subscribe(res => {
      this.periode = 'totalCmd';
      this.collection = { count: 20, data: res  };
    })
  }

  onTotal(){
    this.periode = 'total';
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
