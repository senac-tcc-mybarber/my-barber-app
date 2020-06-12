import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../../model/agendamento';

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