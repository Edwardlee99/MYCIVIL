import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router,
  RouterStateSnapshot, UrlTree,CanActivateChild,
} from '@angular/router';

import { AuthService } from '../service/auth.service';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: Storage,
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UrlTree | boolean>{
      const currentUser = this.authService.isLoggedIn;
      
      if (currentUser == true) {
          // authorised so return true
          return true;
      }else{
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
      }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<UrlTree | boolean> {
    return this.canActivate(route, state);
  }
}