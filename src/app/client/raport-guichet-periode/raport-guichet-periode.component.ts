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
  selector: 'app-raport-guichet-periode',
  templateUrl: './raport-guichet-periode.component.html',
  styleUrls: ['./raport-guichet-periode.component.css']
})
export class RaportGuichetPeriodeComponent implements OnInit {
  dataSource: any[] = [];
  guichets = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  guichetFilter: Guichet[] = [];
  resultFilterGuichet: Guichet[] = [];
  guichet$: Observable<Guichet[]>;
  periode: any;

  constructor(private dialog: MatDialog,private userService: UserService, public print: PrintClientService, private router: Router, private guichetService: GuichetService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGuichet();
    
  }
  
  //DATA TABLE
  displayedColumns: string[] = ['action', 'code', 'montant', 'tel','description', 'createdAt'];
  
  applyFilter(filterValue: string) {
    this.guichets.filter = filterValue.trim().toLowerCase();
  }
  
  getGuichet(){
    this.route.paramMap.pipe(
      switchMap(params => {
        this.periode = params.get('periode');
        return this.guichetService.getGuichets();
      })
      ).subscribe(res => {
        var date = new Date();
        this.guichetFilter = res;
        this.resultFilterGuichet = this.guichetFilter.filter(result => {
          var dateFilter = new Date(result.createdAt);
          if(result.delete == 0 && result.action != 0 && result.user_id._id == this.userService.getUserDetails()._id){
            if(this.periode == 'day'){
              return dateFilter.getDate() == date.getDate() && dateFilter.getMonth() == date.getMonth() && dateFilter.getFullYear() == date.getFullYear();
            }

            if(this.periode == 'month'){
              return dateFilter.getMonth() == date.getMonth() && dateFilter.getFullYear() == date.getFullYear();
            }

            if(this.periode == 'year'){
              return dateFilter.getFullYear() == date.getFullYear();
            }
          }
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

  getPeriode(periode){
    if(periode == 'day'){
      return 'Raport Du Jour';
    }else if(periode == 'month'){
      return 'Raport Du Mois';
    }else if(periode == 'year'){
      return "Raport De L'annee";
    }
  }}
