import { PrintClientService } from './../../services/print-client.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/services/client.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-commande-credit',
  templateUrl: './commande-credit.component.html',
  styleUrls: ['./commande-credit.component.css']
})
export class CommandeCreditComponent implements OnInit {
  dataSource: any[] = [];
  commandes: any[] = [];
  client: Client;
  clients = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  myParams: any;
  periodeCmd: any;
  $commandesCredit: any;
  $ok: any;

  constructor(private route: ActivatedRoute, private clientService: ClientService, public print: PrintClientService) { }

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
        this.periodeCmd = 'De La Semmaine';
      }else if( this.myParams == 'month'){
        this.periodeCmd = 'Du Mois';
      }else if(this.myParams == 'year'){
        this.periodeCmd = "l'Annee"
      }else if(this.myParams == 'today'){
        this.periodeCmd = "Aujourdh'hui";
      }
    })

    this.getCommandeCredit();
  }

  //DATA TABLE
  displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'telOrange', 'telMtn', 'telCelcom', 'commandes.typeCmd', 'commandes.somPay', 'commandes.somRest', 'commandes.modePay','commandes.opperateur','commandes.nbStartTimes', 'commandes.dateCmd'];
    
  applyFilter(filterValue: string) {
    this.clients.filter = filterValue.trim().toLowerCase();
  }

  getCommandeCredit(){
    this.$ok = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.clientService.periode(params.get('periode')), 
      ),
    );

    this.$commandesCredit = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.clientService.commandeCredit(params.get('periode')), 
      ),
    );
    
    this.$commandesCredit.subscribe((resuts: Client[]) => {
      this.clients = new MatTableDataSource(resuts);      
        this.clients.paginator = this.paginator;
        this.clients.sort = this.sort;
      
    })  
  }

  typeCmd(typeCmd){
    if(typeCmd == 'OM'){
      return 'assets/user/img/logo/om1.jpg';
    }else if(typeCmd == 'MoMo'){
      return 'assets/user/img/logo/momo.jpg';
    }else if(typeCmd == 'ST'){
      return 'assets/user/img/logo/images.jpg';
    }else if(typeCmd == 'Transfert'){
      return 'assets/user/img/logo/transfert.png';
    }
  }

}
