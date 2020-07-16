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

  public innerWidth: any;
  public colunms: string[];
  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.colunms = ['cliente', 'servico', 'horario', 'local', 'status', 'checkinprofissional'];

    if(this.innerWidth < 380){
      this.removeArrayElement("cliente");
      this.removeArrayElement("status");
    }
    else if(this.innerWidth < 450){
      this.removeArrayElement("status");
    }

    this.getProfissional();
  }

  removeArrayElement(key:string){
    const index = this.colunms.indexOf(key, 0);
    if (index > -1) {
      this.colunms.splice(index, 1);
    }
  }

  getProfissional() {
    const user = this.usuarioService.currentUserValue
    this.api.getProfissional(user.id)
      .subscribe(data => {
        this.profissional = data;
        this.profissional.agendamentos = this.profissional.agendamentos.filter(
          (x) => x.status != "CONCLUIDO" && x.status != "CANCELADO"
        );
      });
  }
}
