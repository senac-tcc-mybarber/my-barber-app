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
export class LoginComponent implements OnInit {

  private login: Login = new Login();
  constructor(
    private api: UsuarioService,
    private router: Router) {

  }

  ngOnInit() { }

  entrar() {
    this.api.getToken(this.login.username, this.login.password).pipe(first())
      .subscribe(
        () => {
          console.log("sucesso login component");
        },
        () => {
          console.log("erro");
      });

      this.router.navigate(["layout","home"])
  }
}
