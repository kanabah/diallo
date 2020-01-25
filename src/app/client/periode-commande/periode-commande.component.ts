import { PrintClientService } from './../../services/print-client.service';
import { switchMap, tap, take } from 'rxjs/operators';
import { ClientService } from './../../services/client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MatSort } from '@angular/material/sort';
import { Client } from './../../interfaces/client';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-periode-commande',
  templateUrl: './periode-commande.component.html',
  styleUrls: ['./periode-commande.component.css']
})
export class PeriodeCommandeComponent implements OnInit {
  dataSource: any[] = [];
  commandes: any[] = [];
  client: Client;
  clients = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  clientNumber: any = 0;
  somPayTotal: any;
  somCreditTotal: any;
  periodeCmd: any;
  myParams: any;
  $ok: any;
  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router, private snackBar: SnackBarService, public print: PrintClientService) { }
  
  ngOnInit() {
     this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.clientService.returnPeriode(params.get('periode')), 
      ),
    ).subscribe(result => {
      this.myParams = result;
      // console.log('My Result', this.myParams);
      
      // this.myParams = this.route.snapshot.paramMap.get('periode');
      if(this.myParams == 'all'){
        this.periodeCmd = 'Total';
      }else if(this.myParams == 'week'){
        this.periodeCmd = 'Semmaine';
      }else if( this.myParams == 'ceMois'){
        this.periodeCmd = 'Mois';
      }else if(this.myParams == 'year'){
        this.periodeCmd = "l'Annee"
      }else if(this.myParams == 'today'){
        this.periodeCmd = "Aujourdh'hui";
      }
    })
    this.getPeriode();
  }

  
  //DATA TABLE
  displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'adress.commune', 'adress.quartier', 'adress.secteur', 'telOrange', 'telMtn', 'telCelcom', '_id'];
  
  applyFilter(filterValue: string) {
    this.clients.filter = filterValue.trim().toLowerCase();
  }

  getPeriode(){
    this.$ok = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.clientService.periode(params.get('periode')), 
      ),
    );
    
    this.$ok.subscribe((resuts: Client[]) => {
      console.log('My Params SUBCRIBE', resuts);
      this.somPayTotal  = resuts['somPayTotal'];
      this.somCreditTotal  = resuts['somCreditTotal'];
      this.clients = new MatTableDataSource(resuts['clients']);
      this.clients.paginator = this.paginator;
      this.clients.sort = this.sort;
      this.clientNumber = resuts['clientNumber'];
    })
  }

  onCommande(id, myParams){
    this.router.navigate(['client/periodeCommande/detaille-commande', id, myParams])
  }

}
