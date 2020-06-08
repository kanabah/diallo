import { DeleteCoterUserComponent } from './../delete-coter-user/delete-coter-user.component';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Guichet } from 'src/app/interfaces/guichet';
import { GuichetService } from './../../services/guichet.service';
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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guichet-list-user',
  templateUrl: './guichet-list-user.component.html',
  styleUrls: ['./guichet-list-user.component.css']
})
export class GuichetListUserComponent implements OnInit {
  dataSource: any[] = [];
  guichets = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  guichetFilter: Guichet[] = [];
  resultFilterGuichet: Guichet[] = [];
  guichet$: Observable<Guichet[]>;
  type: any;

  constructor(private dialog: MatDialog,private userService: UserService, public print: PrintClientService, private router: Router, private guichetService: GuichetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGuichet();
    
  }
  
  //DATA TABLE
  displayedColumns: string[] = ['action', 'code', 'montant', 'tel','description', 'createdAt', '_id'];
  
  applyFilter(filterValue: string) {
    this.guichets.filter = filterValue.trim().toLowerCase();
  }
  
  getGuichet(){
    this.route.paramMap.pipe(
      switchMap(params => {
        this.type = params.get('type');
        return this.guichetService.getGuichets();
      })
      ).subscribe(res => {
        this.guichetFilter = res;
        this.resultFilterGuichet = this.guichetFilter.filter(result => {
        return result.delete == 0 && result.type == this.type && result.action != 0 && result.user_id._id == this.userService.getUserDetails()._id;
      });

      this.resultFilterGuichet.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
      this.guichets = new MatTableDataSource(this.resultFilterGuichet);
      this.guichets.paginator = this.paginator;
      this.guichets.sort = this.sort;
    });
  }

  deleteGuichet(id){
    this.dialog.open(DeleteCoterUserComponent, {
      data: {"id": id, "object": 'delete-guichet'}   
    });
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

  getAction(action){
    if(action == 1){
      return 'Depot';
    }else if(action == 2){
      return 'Retrait';
    }
  }

  getType(type){
    if(type == 'wester'){
      return 'Wester Union';
    }else if(type == 'money'){
      return 'Money Gram';
    }else if(type == 'wari'){
      return 'Wari';
    }
  }
}
