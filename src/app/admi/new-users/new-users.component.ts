import { Subscription, timer } from 'rxjs';
import { JsService } from 'src/app/services/js.service';
import { AttributeRoleComponent } from './../attribute-role/attribute-role.component';
import { ConfirmPasswordComponent } from './../confirm-password/confirm-password.component';
import { MatDialog } from '@angular/material/dialog';
import { PrintClientService } from './../../services/print-client.service';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css']
})
export class NewUsersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  newUsers: User[] = [];
  faUserPlus = faUserPlus;
  constructor(private dialog: MatDialog,private userService: UserService, public print: PrintClientService, private jsService: JsService) { }

  ngOnInit() {
    // this.jsService.jsAdmi();
    this.subscription = timer(0, 2000).subscribe(res => {
      this.getNewUsers();
    });
  }

  getNewUsers(){
    this.userService.newUsers().subscribe(res => {
      this.newUsers = res.filter(result => {
        return result.confirm != 1;
      });
    })
  }

  acceptUser(id){
    this.dialog.open(AttributeRoleComponent, {
      data: {"id": id}
    });
  }

  declineUser(id){
    this.dialog.open(ConfirmPasswordComponent, {
      data: {"id": id, "object": 'decline'}
      
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
