import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
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
  selector: 'app-list-debit-agence',
  templateUrl: './list-debit-agence.component.html',
  styleUrls: ['./list-debit-agence.component.css']
})
export class ListDebitAgenceComponent implements OnInit {
  dataSource: any[] = [];
  caisses = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  resultFilterDay: any;

  constructor(private userService: UserService, public print: PrintClientService) { }

  ngOnInit() {
    this.getListEntrerCaisse();
  }

  //DATA TABLE
  displayedColumns: string[] = ['montant', 'description', 'date'];
  
  applyFilter(filterValue: string) {
    this.caisses.filter = filterValue.trim().toLowerCase();
  }

  getListEntrerCaisse(){
    this.userService.getUser(this.userService.getUserDetails()._id).subscribe((resuts : User) => {
      resuts.soldActuel.sort((a: any, b: any) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
      this.caisses = new MatTableDataSource(resuts.soldActuel);
      this.caisses.paginator = this.paginator;
      this.caisses.sort = this.sort;
    });
  }

}
