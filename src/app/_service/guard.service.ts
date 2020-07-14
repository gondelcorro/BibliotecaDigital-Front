import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private loginService: LoginService, private router: Router) { 

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let estaLogeado = this.loginService.isLoggedIn();
    let tokenExpirado = this.loginService.isTokenExpired();
    if(estaLogeado && !tokenExpirado){
      return true;
    }else{
      this.loginService.logout();
      return false;
    }
  }

}
