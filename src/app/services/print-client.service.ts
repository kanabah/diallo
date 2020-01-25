import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintClientService {

  constructor() { }

  printAvatar(avatar){
    if(avatar){
      return `http://localhost:4000/${avatar}`;
    }else{
      return 'assets/user/img/avatar/avatar.png';
    }
  }
}
