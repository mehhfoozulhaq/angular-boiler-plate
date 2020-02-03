import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isUserAuthenticated:boolean = false;

  constructor(private authService: AuthService, private router: Router){
    this.authService.isAuthenticated().subscribe( auth => {
      this.isUserAuthenticated = auth;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      if (localStorage.getItem('access_token')) {
        return true;
      }
  
      this.router.navigate(['auth/login']);
      return false;
  }
}
