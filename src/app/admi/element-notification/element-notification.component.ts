import { GuichetService } from './../../services/guichet.service';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Guichet } from 'src/app/interfaces/guichet';

@Component({
  selector: 'app-element-notification',
  templateUrl: './element-notification.component.html',
  styleUrls: ['./element-notification.component.css']
})
export class ElementNotificationComponent implements OnInit {
  newUsers: User[] = [];
  guichetsFilters: Guichet[] = [];
  guichets: Guichet[] = [];

  countWesterDay = 0;
  countWariDay = 0;
  countMoneyDay = 0;

  constructor(private userService: UserService, private guichetService: GuichetService) { }

  ngOnInit() {
    // this.getNewUsers();
    
    // this.getGuichets();
  }

  getGuichets(){
    var date = new Date();
    this.guichetService.getGuichets().subscribe(res => {
      this.guichets = res;

      this.guichets.forEach(element => {
        var createdAt = new Date(element.createdAt);

        if(element.action != 0){
          if(createdAt.getDate() == date.getDate() && createdAt.getMonth() == date.getMonth() && createdAt.getFullYear() == date.getFullYear()){
            if(element.type == 'wester'){
              this.countWesterDay += 1;
            }

            if(element.type == 'wari'){
              this.countWariDay += 1;
            }

            if(element.type == 'money'){
              this.countMoneyDay += 1;
            }
          }
        }
      })
    })
  }

  getNewUsers(){
    this.userService.newUsers().subscribe(res => {
      this.newUsers = res.filter(result => {
        // return result.confirm != 1;
        return result;
      });
    })
  }

}
