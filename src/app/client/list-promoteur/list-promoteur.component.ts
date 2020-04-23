import { UserService } from 'src/app/services/user.service';
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
  selector: 'app-list-promoteur',
  templateUrl: './list-promoteur.component.html',
  styleUrls: ['./list-promoteur.component.css']
})
export class ListPromoteurComponent implements OnInit {
  dataSource: any[] = [];
  caisses = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog,private userService: UserService, public print: PrintClientService, private router: Router) { }

  ngOnInit() {
    this.getAllPromoteurs();
  }

  //DATA TABLE
  displayedColumns: string[] = ['name', 'nameAgence', 'tel', 'email', 'adress', 'createdAt', 'active', '_id','role'];
  
  applyFilter(filterValue: string) {
    this.caisses.filter = filterValue.trim().toLowerCase();
  }
  
  getAllPromoteurs(){
    this.userService.getAllPromoteurs(this.userService.getUserDetails()._id).subscribe(res => {
      res.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
      this.caisses = new MatTableDataSource(res);
      this.caisses.paginator = this.paginator;
      this.caisses.sort = this.sort;
    })
  }

  changeEtat(id){
    this.userService.changeEtatUser(id).subscribe(res => {
      console.log(res);
    })
  }

  // dialogDeleteCaisse(id){
  //   this.dialog.open(DialogDeleteCaisseComponent, {
  //     data: {"id": id}
  //   });
  // }


}
