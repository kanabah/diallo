import { User } from './../../interfaces/user';
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
  userFilters: User[] = [];
  dataSource: any[] = [];
  caisses = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  soldActuel: User[] = [];
  soldSortie: User[] = [];
  users: User[] = [];

  promoteurs: any[] = [];
  userDetails: any;
  resultAfterCalcul: any;

  constructor(private promoteurService: PromoteurService,private userService: UserService, public print: PrintClientService, private router: Router) { }

  ngOnInit() {
    this.promoteurService.getPromoteurs().subscribe(res => {
      this.promoteurs = res;
    });
    this.getUsers();
    this.getAllPromoteurs();
    
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.userFilters = res;
      
      this.users = this.userFilters.filter(result => {
        return result.role == 'promoteur';
      });
    })
  }

  getPromoteurs(id){
    var sumEntrer = 0;
    var sumSortie = 0;
    var montantSoldActuel = 0;
    var montantSoldSortie = 0;

      this.promoteurs.forEach(element => {
        if(element.user_id == id){
          if(element.type == 'entrer'){
            sumEntrer += element.montant;
          }else if(element.type == 'sortie'){
            sumSortie += element.montant;
          }
        }
      })

      this.soldActuel = this.users.filter(result =>{
        if(result._id == id){
          return result.soldActuel;
        }
      })

      this.soldSortie = this.users.filter(result =>{
        if(result._id == id){
          return result.soldSortie;
        }
      })
      console.log('soldSORTIE', this.soldSortie);

      this.soldActuel.filter(response => {
        response.soldActuel.forEach(element => {
          montantSoldActuel += element.montant;
        })
      })
      
      this.soldSortie.filter(response => {
        response.soldSortie.forEach(element => {
          montantSoldSortie += element.montant;
        })
      })
      
      
      var resultats = {
        sumPromoteurEntrer: sumEntrer,
        sumPromoteurSortie: sumSortie,
        montantSoldActuel: montantSoldActuel,
        montantSoldSortie: montantSoldSortie
      }
      // console.log('RESULT Sold Actu', resultats);

    return resultats;
  }


  //DATA TABLE
  displayedColumns: string[] = ['name', 'nameAgence', 'tel', 'email', 'adress', 'createdAt', 'active', '_id','role'];
  
  applyFilter(filterValue: string) {
    this.caisses.filter = filterValue.trim().toLowerCase();
  }
  
  getAllPromoteurs(){
    this.userService.getAllPromoteurs(this.userService.getUserDetails()._id).subscribe(res => {
      this.users = res;
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
