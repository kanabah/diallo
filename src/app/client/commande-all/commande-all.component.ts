import { PrintClientService } from './../../services/print-client.service';
import { Client } from './../../interfaces/client';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-commande-all',
  templateUrl: './commande-all.component.html',
  styleUrls: ['./commande-all.component.css']
})
export class CommandeAllComponent implements OnInit {
dataSource: any[] = [];
commandes: any[] = [];
client: Client;
clients = new MatTableDataSource();
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private clientService: ClientService, private router: Router, private snackBar: SnackBarService, public print: PrintClientService) { }

  ngOnInit() {
    this.allCommandes();
  }

  //DATA TABLE
  displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'adress.commune', 'adress.quartier', 'adress.secteur', 'telOrange', 'telMtn', 'telCelcom', '_id'];
  
  applyFilter(filterValue: string) {
    this.clients.filter = filterValue.trim().toLowerCase();
  }

  allCommandes(){
    this.clientService.allClientCommande().subscribe((resuts: Client[]) => {
      resuts.sort((a: any, b: any) => a.deteCmdUpdate < b.deteCmdUpdate ? 1 : a.deteCmdUpdate > b.deteCmdUpdate ? -1 : 0);
      this.clients = new MatTableDataSource(resuts);
      this.clients.paginator = this.paginator;
      this.clients.sort = this.sort;
    })
  }

  getClientDetailles(id: string){
    this.clientService.detaille(id).subscribe(res => {
      this.client = res;
    })  
  }

  onCommande(id){
    this.clientService.detaille(id).subscribe(res => {
      this.client = res;
      if(this.client.commandes.length > 0){
        this.router.navigate(['client/commandes/commande-detaill', id])
      }else{
        this.snackBar.openSnackBar("Cet client n'a pas effectuer des commandes!!!", 'Fermer')
      }
    })  
  }

}
