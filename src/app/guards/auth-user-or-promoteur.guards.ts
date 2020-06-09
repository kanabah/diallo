import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserOrPromoteurGuard implements CanActivate  {
  constructor(private userService: UserService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let url = state.url;
    if(this.userService.isLoggedIn()){
      if(this.userService.getUserDetails().role != 'admi'){
        return true;
      }else{
          this.router.navigate(['/admi/home']);
          return false;
      }
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
