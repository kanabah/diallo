import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { User } from './../../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-debit-promoteur-admi',
  templateUrl: './list-debit-promoteur-admi.component.html',
  styleUrls: ['./list-debit-promoteur-admi.component.css']
})
export class ListDebitPromoteurAdmiComponent implements OnInit {
  attributions: any[] = [];

  config: any;
  collection : any = {
    count: 0,
    data: []
  };

  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location, private spiner: NgxSpinnerService) { 
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

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getDebitAgence(id);
  }

  getDebitAgence(id){
    this.spiner.show();
    this.userService.getUser(id).subscribe((res : User) => {
      this.attributions = res.soldActuel;
      
      this.spiner.hide();
      this.attributions.sort((a: any, b: any) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
        this.collection = { count: 20, data: this.attributions };
    });
  }

  onRetour(){
    this.location.back();
  }
}
