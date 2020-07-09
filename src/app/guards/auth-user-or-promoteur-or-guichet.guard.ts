import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthUserOrPromoteurOrGuichetGuard implements CanActivate  {
  constructor(private userService: UserService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let url = state.url;
    if(this.userService.isLoggedIn()){
      if(this.userService.getUserDetails().role == 'user' || this.userService.getUserDetails().role == 'promoteur' || this.userService.getUserDetails().role == 'guichet'){
        return true;
      }else{
          this.router.navigate(['/home']);
          return false;
      }
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
