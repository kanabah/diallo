import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCaisseComponent } from './../dialog-delete-caisse/dialog-delete-caisse.component';
import { PrintClientService } from './../../services/print-client.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PromoteurService } from './../../services/promoteur.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Promoteur } from 'src/app/interfaces/promoteur';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-entrer-jour',
  templateUrl: './list-entrer-jour.component.html',
  styleUrls: ['./list-entrer-jour.component.css']
})
export class ListEntrerJourComponent implements OnInit {
  dataSource: any[] = [];
  caisses = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  resultFilterDay: any;

  constructor(private dialog: MatDialog,private promoteurService: PromoteurService, public print: PrintClientService, private router: Router) { }

  ngOnInit() {
    this.getListEntrerCaisse();
  }

  //DATA TABLE
  displayedColumns: string[] = ['client_id.avatar', 'client_id.nom', 'client_id.prenom', 'client_id.telOrange', 'client_id.telMtn', 'client_id.telCelcom', 'client_id.telPerso', 'description', 'montant', 'createdAt', '_id'];
  
  applyFilter(filterValue: string) {
    this.caisses.filter = filterValue.trim().toLowerCase();
  }

  getListEntrerCaisse(){
    let date = new Date();
    this.promoteurService.listeEntrerCaissse().subscribe((resuts : Promoteur[]) => {
      this.resultFilterDay = resuts.filter(function(res){
        var dateAdd = new Date(res.createdAt);
          return dateAdd.getDate() == date.getDate() && dateAdd.getMonth() == date.getMonth() && dateAdd.getFullYear() == date.getFullYear();
      });

      this.resultFilterDay.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
      this.caisses = new MatTableDataSource(this.resultFilterDay);
      this.caisses.paginator = this.paginator;
      this.caisses.sort = this.sort;
    });
  }
  
  redirectRoute(id){
    this.router.navigate(['/promoteur/list/caisses/update', id])
  }

  dialogDeleteCaisse(id){
    this.dialog.open(DialogDeleteCaisseComponent, {
      data: {"id": id}
    });
  }

}
