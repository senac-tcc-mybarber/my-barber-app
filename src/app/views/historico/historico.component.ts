import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Cliente } from 'src/app/model/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario.service';
import { Agendamento } from 'src/app/model/agendamento';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  agendamentos: Agendamento[]
  displayedColumns: string[];

  constructor() {
    }

  ngOnInit() {
  }
}