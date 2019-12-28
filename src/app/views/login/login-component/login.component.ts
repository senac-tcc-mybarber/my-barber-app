import { Component, OnInit, Input } from '@angular/core';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() login: Login

  constructor() { }

  ngOnInit() {
  }

  submit(){
    
  }
}
