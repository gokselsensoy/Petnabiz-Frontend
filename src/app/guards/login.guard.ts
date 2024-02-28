import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      if (route.routeConfig?.path === "admin/login" || route.routeConfig?.path === "admin/register") {
        this.router.navigate([""]);
        console.log("Sisteme zaten giriş yapılmış", "Giriş yapılmış");
        return false;
      } else {
        return true;
      }
    } else {
      if (route.routeConfig?.path === "admin/login" || route.routeConfig?.path === "admin/login") {
        return true;
      } else {
        this.authService.logOut();
        this.router.navigate(["admin/login"]);
        console.log("Sisteme giriş yapmalısınız", "Giriş yapmalısınz");
        return false;
      }
    }
  }

}