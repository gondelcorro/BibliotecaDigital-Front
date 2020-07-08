import { CLIENT_ID, CLIENT_SECRET, TOKEN_NAME } from './../_shared/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/constants';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; //npm install @auth0/angular-jwt

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url : string = `${HOST}/oauth/token`;
  // O lo instancio manualmente o lo uso como injeccion en el constructor y lo agrego en el AppModule como JwtModule
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http : HttpClient, private router: Router) { }

  login(usuario : string, clave : string){
    const body = `grant_type=password&username=${encodeURIComponent(usuario)}&password=${encodeURIComponent(clave)}`;
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8').set('Authorization', 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET))
    });
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(){
    let token=sessionStorage.getItem(TOKEN_NAME);
    return token!=null;
  }

  public isTokenExpired(): boolean {
    const token = localStorage.getItem(TOKEN_NAME);
    return this.jwtHelper.isTokenExpired(token); //
  }

}
