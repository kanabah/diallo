import { MatDialog } from '@angular/material/dialog';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { PrintClientService } from './../../services/print-client.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteConfirmCoteAgenceComponent } from '../delete-confirm-cote-agence/delete-confirm-cote-agence.component';

@Component({
  selector: 'app-list-depot-agence',
  templateUrl: './list-depot-agence.component.html',
  styleUrls: ['./list-depot-agence.component.css']
})
export class ListDepotAgenceComponent implements OnInit {
  dataSource: any[] = [];
  caisses = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  resultFilterDay: any;

  constructor(private userService: UserService, public print: PrintClientService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getListEntrerCaisse();
  }

  disabledButtonIfNotToDay(dateSoldSortie){
    var dateMod = new Date();
    var date = new Date(dateSoldSortie);
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

  getListEntrerCaisse(){
    this.userService.getUser(this.userService.getUserDetails()._id).subscribe((resuts : User) => {
      resuts.soldSortie.sort((a: any, b: any) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
      this.caisses = new MatTableDataSource(resuts.soldSortie);
      this.caisses.paginator = this.paginator;
      this.caisses.sort = this.sort;
    });
  }

  deleteDebit(id){
    this.dialog.open(DeleteConfirmCoteAgenceComponent, {
      data: {"id_sold": id, "user_id": this.userService.getUserDetails()._id, "object": 'delete-depot-agence'}
    });
  }
}
