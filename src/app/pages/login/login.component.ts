import { TOKEN_NAME } from './../../_shared/constants';
import { LoginService } from './../../_service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//PARA DECODIFICAR LA SECUENCIA DE CARACTERES DEL TOKEN
// LA INSTALO DESDE CONSOLA CON npm install jwt-decode --sav
import * as decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  clave: string;

  constructor(private loginService : LoginService, private router : Router, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    this.loginService.login(this.usuario, this.clave).subscribe(data =>{
      if(data){
        let token = JSON.stringify(data); //CONVIERTO LA RESP JSON EN UN STRING
        sessionStorage.setItem(TOKEN_NAME, token); //LO ALMACENO EN EL sessionStorage
        let tk = JSON.parse(sessionStorage.getItem(TOKEN_NAME));
        //const decodedToken = decode(tk.access_token); DECODIFICO EL access_token 
        //let rol = decodedToken.authorities[0];  EXTRAIGO EL ROL
        this.router.navigate(['dashboard']);
      }
    }, (err) => {
      if (err.status !== 401) {//ERROR DE CONEXION CON EL BACKEND
        this.snackBar.open("Error de conexión", "Aviso", { duration: 3000 });
      }
      if (err.status === 401 || err.status === 400) {//ERROR DE SEGURIDAD
        this.snackBar.open("Credenciales incorrectas", "Aviso", { duration: 3000 });
      }
    });
  }

}
