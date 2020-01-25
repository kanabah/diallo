import { PrintClientService } from './../../services/print-client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Client } from 'src/app/interfaces/client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-ayement',
  templateUrl: './type-ayement.component.html',
  styleUrls: ['./type-ayement.component.css']
})
export class TypeAyementComponent implements OnInit {
  dataSource: any[] = [];
  commandes: any[] = [];
  client: Client;
  clients = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  params: any;
    constructor(private clientService: ClientService, private route: ActivatedRoute, public print: PrintClientService) { }
  
    ngOnInit() {
      this.params = this.route.snapshot.paramMap.get('typePay');
      this.allCommandes(this.params);
    }
  
    //DATA TABLE
    displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'telOrange', 'telMtn', 'telCelcom', 'commandes.typeCmd', 'commandes.somPay', 'commandes.somRest', 'commandes.modePay','commandes.opperateur','commandes.nbStartTimes', 'commandes.dateCmd'];
    
    applyFilter(filterValue: string) {
      this.clients.filter = filterValue.trim().toLowerCase();
    }
  
    allCommandes(route){
      this.clientService.TypePayement(route).subscribe((resuts: Client[]) => {
        console.log('CLients Tranche', resuts);
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
