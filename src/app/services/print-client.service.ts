import { baseUrl } from './backend';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintClientService {

  constructor() { }

  printAvatar(avatar){
    if(avatar){
      return `${baseUrl}${avatar}`;
    }else{
      return 'assets/user/img/avatar/avatar.png';
    }
  }

  printAdmi(avatar){
    if(avatar){
      return `${baseUrl}${avatar}`;
    }else{
      return 'assets/user/img/avatar/avatar7.png';
    }
  }
}
