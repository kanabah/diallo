import { Client } from './../../interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { User } from './../../interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admi',
  templateUrl: './home-admi.component.html',
  styleUrls: ['./home-admi.component.css']
})
export class HomeAdmiComponent implements OnInit {
  users: User[] = [];
  agences: User[] = [];
  promoteurs: User[] = [];
  clients: Client[] = [];

  constructor(private userService: UserService, private clientService: ClientService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;

      this.agences = this.users.filter(result => {
        return result.role == 'user' && result.active == 1;
      });

      this.promoteurs = this.users.filter(result => {
        return result.role == 'promoteur' && result.active == 1;
      })
    });

    this.clientService.getClients().subscribe(res => {
      this.clients = res;
    })
  }
}
