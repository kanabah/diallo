import { AttributeRoleComponent } from './../attribute-role/attribute-role.component';
import { ConfirmPasswordComponent } from './../confirm-password/confirm-password.component';
import { MatDialog } from '@angular/material/dialog';
import { PrintClientService } from './../../services/print-client.service';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.css']
})
export class NewUsersComponent implements OnInit {
  newUsers: User[] = [];
  faUserPlus = faUserPlus;
  constructor(private dialog: MatDialog,private userService: UserService, public print: PrintClientService) { }

  ngOnInit() {
    this.getNewUsers();
  }

  getNewUsers(){
    this.userService.newUsers().subscribe(res => {
      this.newUsers = res;
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

}
