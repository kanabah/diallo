import { PrintClientService } from './../../services/print-client.service';
import { Client } from './../../interfaces/client';
import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-commande-all',
  templateUrl: './commande-all.component.html',
  styleUrls: ['./commande-all.component.css']
})
export class CommandeAllComponent implements OnInit, OnDestroy {
dataSource: any[] = [];
commandes: any[] = [];
client: Client;
clientsAll: Client[] = [];
infoSome: any = {};
clients = new MatTableDataSource();
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;
subscription: Subscription;
cool: any = '';

  constructor(private clientService: ClientService, private router: Router, private snackBar: SnackBarService, public print: PrintClientService) { }

  ngOnInit() {
    this.allCommandes();
  }

  //DATA TABLE
  displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'adress.commune', 'adress.quartier', 'adress.secteur', 'telOrange', 'telMtn', 'telCelcom', 'telPerso', 'genre', 'email', 'description','entreprise', '_id', 'nbCmd'];
  
  applyFilter(filterValue: string) {
    this.clients.filter = filterValue.trim().toLowerCase();
  }

  allCommandes(){
    this.subscription = this.clientService.allClientCommande().subscribe((resuts: Client[]) => {
      resuts.sort((a: any, b: any) => a.deteCmdUpdate < b.deteCmdUpdate ? 1 : a.deteCmdUpdate > b.deteCmdUpdate ? -1 : 0);
      this.clients = new MatTableDataSource(resuts);
      this.clients.paginator = this.paginator;
      this.clients.sort = this.sort;
      this.clientsAll = resuts;
    })
  }

  getClientDetailles(id: string){
    this.clientService.clientDetailleCommande(id).subscribe(res => {
      this.client = res;
    })  
  }

  onCommande(id){
    this.clientService.clientDetailleCommande(id).subscribe(res => {
      this.client = res;
      if(this.client.commandes.length > 0){
        this.router.navigate(['client/commandes/commande-detaill', id])
      }else{
        this.snackBar.openSnackBar("Cet client n'a pas effectuer des commandes!!!", 'Fermer')
      }
    })  
  }


  getCreditClient(id){
    var sumTotal = 0;
    var sumOM = 0;
    var sumMoMo = 0;
    var sumST = 0;
    var sumTransfert = 0;

    var clis = this.clientsAll.filter(res => {
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
