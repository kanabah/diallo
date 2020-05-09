import { Location } from '@angular/common';
import { Promoteur } from 'src/app/interfaces/promoteur';
import { UserService } from 'src/app/services/user.service';
import { User } from './../../interfaces/user';
import { PrintClientService } from './../../services/print-client.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PromoteurService } from './../../services/promoteur.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-production-promoteur-admi',
  templateUrl: './production-promoteur-admi.component.html',
  styleUrls: ['./production-promoteur-admi.component.css']
})
export class ProductionPromoteurAdmiComponent implements OnInit {
  user: User;
  promoteurs :Promoteur[] = [];
  promoteurFilters :Promoteur[] = [];
  config: any;
  collection : any = {
    count: 0,
    data: []
  };


  constructor(private promoteurService: PromoteurService, public print: PrintClientService, private route: ActivatedRoute, private userService: UserService, private location: Location) { 
    //Create dummy data
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          value: "items number " + (i + 1)
        }
      );
    }
 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getPromoteurs(id);
  }

  getPromoteurs(id){
    this.promoteurService.getPromoteurs().subscribe(res => {
      this.promoteurFilters = res;

      this.promoteurs = this.promoteurFilters.filter(result => {
        return result.user_id == id;
      });

      console.log('Promoteurs Deta', this.promoteurs);
      

      this.promoteurs.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
        this.collection = { count: 20, data: this.promoteurs  };
    })

    this.userService.getUser(id).subscribe(res => {
      this.user = res;
    })
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  onRetour(){
    this.location.back();
  }

}
