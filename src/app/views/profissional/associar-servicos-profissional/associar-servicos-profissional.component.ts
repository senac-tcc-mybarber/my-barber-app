import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profissional } from 'src/app/model/profissional';
import { RestService } from 'src/app/rest.service';
import { Salao } from 'src/app/model/Salao_X';

@Component({
  selector: 'app-associar-servicos-profissional',
  templateUrl: './associar-servicos-profissional.component.html',
  styleUrls: ['./associar-servicos-profissional.component.scss']
})
export class AssociarServicosProfissionalComponent implements OnInit {

  profissional: Profissional = { Id: 0, nomeCompleto: '', telefone: '', email: '', password: '', Saloes: null};

  constructor(private router: Router, private route: ActivatedRoute, private api: RestService) { }

  ngOnInit() {
    this.getProfissional(this.route.snapshot.params['id'])
  }

  getProfissional(id) {
    this.api.getProfissional(id)
      .subscribe(data => {
        this.profissional = data;
        console.log(this.profissional);
      });
  }
}
