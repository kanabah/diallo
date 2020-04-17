import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-promoteur',
  templateUrl: './list-promoteur.component.html',
  styleUrls: ['./list-promoteur.component.css']
})
export class ListPromoteurComponent implements OnInit {
  promoteurs: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllPromoteurs();
  }

  getAllPromoteurs(){
    this.userService.getAllPromoteurs(this.userService.getUserDetails()._id).subscribe(res => {
      this.promoteurs = res;
      console.log(this.promoteurs);
      
    })
  }

}
