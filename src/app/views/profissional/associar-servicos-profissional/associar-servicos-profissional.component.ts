import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Profissional } from 'src/app/model/profissional';
import { RestService } from 'src/app/rest.service';
import { Salao } from 'src/app/model/SalaoX';
import { Servico } from 'src/app/model/Servico';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-associar-servicos-profissional',
  templateUrl: './associar-servicos-profissional.component.html',
  styleUrls: ['./associar-servicos-profissional.component.scss']
})
export class AssociarServicosProfissionalComponent implements OnInit {

  profissional: Profissional = { id: 0, nome: '', telefone: '', email: '', senha: '', Saloes: null, Servico: null};
  dataSource: Servico[];
  displayedColumns: string[] = [ 'id','descricao', 'valor', 'categoria'];

  constructor(private router: Router, private route: ActivatedRoute, private api: RestService) { }

  ngOnInit() {
    this.getProfissional(this.route.snapshot.params['id'])
    this.api.getServicos()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
    }, err => {
      console.log(err);
    });
  }

  getProfissional(id) {
    this.api.getProfissional(id)
      .subscribe(data => {
        this.profissional = data;
        console.log(this.profissional);
      });
  }
}
