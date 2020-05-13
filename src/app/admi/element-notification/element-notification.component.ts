import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-notification',
  templateUrl: './element-notification.component.html',
  styleUrls: ['./element-notification.component.css']
})
export class ElementNotificationComponent implements OnInit {
  newUsers: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getNewUsers();
  }

  getNewUsers(){
    this.userService.newUsers().subscribe(res => {
      this.newUsers = res.filter(result => {
        return result.confirm != 1;
      });
    })
  }

}
