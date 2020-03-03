import { Component, OnInit, Input } from '@angular/core';
import { Agendamento } from 'src/app/model/agendamento';

@Component({
  selector: 'app-tabela-agendamentos',
  templateUrl: './tabela-agendamentos.component.html',
  styleUrls: ['./tabela-agendamentos.component.scss']
})
export class TabelaAgendamentosComponent {

  @Input()
  agendamentos: Agendamento[]

  @Input()
  displayedColumns: string[];
}
