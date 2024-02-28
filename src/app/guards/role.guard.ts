import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/entities/user';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = route.data['expectedRole'];

    if (this.authService.isLoggedIn) {
      let user: User = this.authService.getUser()!;
      if (this.authService.hasRole(user, expectedRole)) {
        return true;
      } else {
        this.router.navigate([""]);
        console.log("Bu sayfaya erişmek için yeterli yetkiniz yok", "Yetkiniz yok");
        return false;
      }
    } else {
      return false;
    }
  }
}