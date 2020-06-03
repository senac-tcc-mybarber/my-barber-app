import { Component, Injectable, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Login } from 'src/app/model/login';
import { UsuarioService } from 'src/app/usuario.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent {

  login: Login = new Login();
  constructor(
    private api: UsuarioService,
    private router: Router) {

  }

  entrar() {
    this.api.getToken(this.login.username, this.login.password).pipe(first())
      .subscribe(
        () => {
          console.log('sucesso login component');
          this.redirecionar();
        },
        () => {
          console.log('erro');
      });
  }

  redirecionar() {
    const currentUserString = localStorage.getItem('currentUser');
    let role = 'cliente';

    if(currentUserString) {
      role = JSON.parse(currentUserString).perfil;
    }

    this.router.navigate(['layout', `home${role}`]);
  }
}
