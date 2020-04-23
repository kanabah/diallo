import { DeleteConfirmCoteAgenceComponent } from './../delete-confirm-cote-agence/delete-confirm-cote-agence.component';
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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attribution-list',
  templateUrl: './attribution-list.component.html',
  styleUrls: ['./attribution-list.component.css']
})
export class AttributionListComponent implements OnInit {

  dataSource: any[] = [];
  caisses = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  resultFilterDay: any;
  user_id: any;
  
  constructor(private dialog: MatDialog, private userService: UserService, public print: PrintClientService, private route: ActivatedRoute) { }
  
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.user_id = id;
    this.getDebitAgence(id);
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
  displayedColumns: string[] = ['montant', 'description', 'date', '_id'];
  
  applyFilter(filterValue: string) {
    this.caisses.filter = filterValue.trim().toLowerCase();
  }

  getDebitAgence(id){
    this.userService.getUser(id).subscribe((resuts : User) => {
      resuts.soldActuel.sort((a: any, b: any) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
      this.caisses = new MatTableDataSource(resuts.soldActuel);
      this.caisses.paginator = this.paginator;
      this.caisses.sort = this.sort;
    });
  }

  deleteDebit(id){
    this.dialog.open(DeleteConfirmCoteAgenceComponent, {
      data: {"id": id, "user_id": this.user_id, "object": 'delete-debit'}
    });
  }

}
