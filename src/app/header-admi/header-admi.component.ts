import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-admi',
  templateUrl: './header-admi.component.html',
  styleUrls: ['./header-admi.component.css']
})
export class HeaderAdmiComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  logout(){
    this.userService.logout();
  }

}
