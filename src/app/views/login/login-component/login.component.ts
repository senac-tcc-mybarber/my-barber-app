import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  ngOnInit() {
    // this.api.getToken().subscribe((data)=> {console.log(data); this.article = data['article'];});
  }

  entrar(){
    const json: string = "{'username': '" + this.login.username + "', 'password': ''" + this.login.password + "'}";
    this.api.getToken().pipe(first())
    .subscribe(
        data => {
            console.log("sucesso login component");
        },
        error => {
          console.log("erro");
        });
  }
}
