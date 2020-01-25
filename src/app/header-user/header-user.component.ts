import { Component, OnInit, AfterViewInit } from '@angular/core';
import { JsService } from '../services/js.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit, AfterViewInit {

  constructor(private js: JsService, public userService: UserService, private router: Router) { }

  ngOnInit() {
    // this.js.jsHeaderUser();
    setTimeout(() => {
    }, 1000)
    // this.js.jsHeaderUser();
  }
  title: any= 'Kanan bah';

  onRoute(){
    this.router.navigate(['/client/periodeCommande', 'today']);

  }

  ngAfterViewInit(){
    setTimeout(() => {
      // this.js.jsHeaderUser();
    }, 1000)
  }

  logout(){
    this.userService.logout();
  }

  

}
