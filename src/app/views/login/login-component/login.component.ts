import { Component, OnInit, Injectable } from '@angular/core';

import { Login } from 'src/app/model/login';
import { RestService } from 'src/app/rest.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent implements OnInit {

  private login: Login = new Login();
  constructor(private api: RestService) {

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
  }
}
