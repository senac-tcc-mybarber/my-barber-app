import { Component, Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Login } from '../../../model/login';
import { UsuarioService } from '../../../usuario.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


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
    private router: Router,
    private snackBar: MatSnackBar) {

  }

  entrar() {
    this.api.getToken(this.login.username, this.login.password).pipe(first())
      .subscribe(
        () => {
          console.log('sucesso login component');
          this.redirecionar();
        },
        (err: HttpErrorResponse) => {
          this.handleError(err);
          console.log('erro');
      });
  }

  handleError(err: HttpErrorResponse) {
    let message = '';
    switch (err.status) {
      case 401:
      case 403:
        message = 'Login/senha inválidos';
        break;
      default:
        message = 'Não foi possível realizar login no sistema. Autenticação não disponível';
    }

    this.snackBar.open(message, 'Ok', { duration: 5000 });
  }

  redirecionar() {
    this.router.navigate(['layout', 'home']);
  }
}
