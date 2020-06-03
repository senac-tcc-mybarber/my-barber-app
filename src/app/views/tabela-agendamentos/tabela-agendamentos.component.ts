import { Component, OnInit, Input } from '@angular/core';
import { Agendamento } from 'src/app/model/agendamento';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tabela-agendamentos',
  templateUrl: './tabela-agendamentos.component.html',
  styleUrls: ['./tabela-agendamentos.component.scss']
})
export class TabelaAgendamentosComponent {

  @Input()
  agendamentos: Agendamento[];

  @Input()
  displayedColumns: string[];

  constructor(private router: Router) {
  }


  isAgendadoProfissional(agendamento) {
    return agendamento.status === 'AGENDADO' || agendamento.status === 'AGUARDANDO_PROFISSIONAL';
  }

  isAgendadoCliente(agendamento) {
    return agendamento.status === 'AGENDADO' || agendamento.status === 'AGUARDANDO_CLIENTE';
  }

  isAndamento(agendamento) {
    return agendamento.status === 'EM_ANDAMENTO';
  }

  navigateCheckinCliente(agendamento) {
    this.router.navigate(['/layout/checkincliente/' + agendamento.id]);
  }

  navigateCheckinProfissional(agendamento) {
    this.router.navigate(['/layout/checkinprofissional/' + agendamento.id]);
  }

  navigateConcluirAtendimento(agendamento) {

  }
}
