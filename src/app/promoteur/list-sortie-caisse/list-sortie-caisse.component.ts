import { DialogDeleteCaisseComponent } from './../dialog-delete-caisse/dialog-delete-caisse.component';
import { MatDialog } from '@angular/material/dialog';
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
  selector: 'app-list-sortie-caisse',
  templateUrl: './list-sortie-caisse.component.html',
  styleUrls: ['./list-sortie-caisse.component.css']
})
export class ListSortieCaisseComponent implements OnInit {
  dataSource: any[] = [];
  caisses = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog,private promoteurService: PromoteurService, public print: PrintClientService, private router: Router) { }

  ngOnInit() {
    this.listeSortieCaissse();
  }

  disabledButtonIfNotToDay(dateSoldActuel){
    var dateMod = new Date();
    var date = new Date(dateSoldActuel);
    if(dateMod.getDate() == date.getDate() && dateMod.getMonth() == date.getMonth() && dateMod.getFullYear() == date.getFullYear()){
      return false;
    }else{
      return true;
    }
  }

  //DATA TABLE
  displayedColumns: string[] = ['client_id.avatar', 'client_id.nom', 'client_id.prenom', 'client_id.telOrange', 'client_id.telMtn', 'client_id.telCelcom', 'client_id.telPerso', 'description', 'montant', 'createdAt', '_id'];
  
  applyFilter(filterValue: string) {
    this.caisses.filter = filterValue.trim().toLowerCase();
  }

  listeSortieCaissse(){
    this.promoteurService.listeSortieCaissse().subscribe((resuts : Promoteur[]) => {
      resuts.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
      this.caisses = new MatTableDataSource(resuts);
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
