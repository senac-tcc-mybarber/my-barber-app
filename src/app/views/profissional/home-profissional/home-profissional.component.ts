import { Component, OnInit } from '@angular/core';
import {Profissional} from '../../../model/profissional';
import {RestService} from '../../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../../usuario.service';

@Component({
  selector: 'app-home-profissional',
  templateUrl: './home-profissional.component.html',
  styleUrls: ['./home-profissional.component.scss']
})
export class HomeProfissionalComponent implements OnInit {

  profissional = new Profissional();

  constructor(private api: RestService, private route: ActivatedRoute, private router: Router, private usuarioService: UsuarioService){
  }

  ngOnInit() {
    this.getProfissional();
  }

  getProfissional() {
    const user = this.usuarioService.currentUserValue
    this.api.getProfissional(user.id)
      .subscribe(data => {
        this.profissional = data;
      });
  }
}
