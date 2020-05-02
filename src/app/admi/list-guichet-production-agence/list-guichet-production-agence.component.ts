import { switchMap } from 'rxjs/operators';
import { ConfirmPasswordComponent } from './../confirm-password/confirm-password.component';
import { MatDialog } from '@angular/material/dialog';
import { PrintClientService } from './../../services/print-client.service';
import { GuichetService } from './../../services/guichet.service';
import { Component, OnInit } from '@angular/core';
import { Guichet } from 'src/app/interfaces/guichet';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-guichet-production-agence',
  templateUrl: './list-guichet-production-agence.component.html',
  styleUrls: ['./list-guichet-production-agence.component.css']
})
export class ListGuichetProductionAgenceComponent implements OnInit {
  guichets: Guichet[] = [];
  guichetList: Guichet[] = [];

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  type: string;

  constructor(private guichetService: GuichetService, public print: PrintClientService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
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

  pageChanged(event){
    this.config.currentPage = event;
  }

  deleteGuichet(id){
    this.dialog.open(ConfirmPasswordComponent, {
      data: {"id": id, "object": 'delete-guichet'}   
    });
  }

  ngOnInit() {
    this.getGuichets();
  }

  // getGuichets(){
  //   this.guichetService.getGuichets().subscribe(res => {
  //     this.guichets = res;
  //     this.guichetList = this.guichets.filter(result => {
  //       return result.delete == 0 && result.action != 0;
  //     })

  //     this.guichetList.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
  //     this.collection = { count: 20, data: this.guichetList };
  //   })
  // }

  getGuichets(){
    this.route.paramMap.pipe(
      switchMap(params => {
        this.type = params.get('type');
        return this.guichetService.getGuichets();
      })
      ).subscribe(res => {
        this.guichets = res;
        this.guichetList = this.guichets.filter(result => {
        return result.delete == 0 && result.action != 0 && result.type == this.type;
      });

      this.guichetList.sort((a: any, b: any) => a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0);
      this.collection = { count: 20, data: this.guichetList };
    });
  }

  getAction(action){
    if(action == 1){
      return 'Depot';
    }else if(action == 2){
      return 'Retrait';
    }
  }

  changeAutorisation(id){
    this.guichetService.changeAutorisation(id).subscribe(res => {

    })
  }

  getBadge(action){
    if(action == 1){
      return 'badge badge-success';
    }else if(action == 2){
      return 'badge badge-warning';
    }
  }
  redirectMod(id){
    this.router.navigate(['admi/guichet-list/update', id])
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
