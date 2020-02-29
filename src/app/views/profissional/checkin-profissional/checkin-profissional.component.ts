import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Agendamento} from '../../../model/agendamento';
import {RestService} from '../../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from "rxjs/operators";

@Component({
  selector: 'app-checkin-profissional',
  templateUrl: './checkin-profissional.component.html',
  styleUrls: ['./checkin-profissional.component.scss']
})
export class CheckinProfissionalComponent implements OnInit {
  agendamentoCtrl = new FormControl();
  agendamento: Agendamento;
  constructor(
    private api: RestService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.getAgendamento(this.route.snapshot.params['id']);
  }

  associar():void {
    this.realizarCheckin();
  }

  getAgendamento(id) {
    this.api.getAgendamento(id)
      .subscribe(data => {
        this.agendamento = data;
        console.log(this.agendamento);
      });
  }

  realizarCheckin() {
    const bodyRequest = {
      id: this.agendamento.id
    };
    console.log(bodyRequest);
    this.api.checkInProfissional(JSON.stringify(bodyRequest))
      .pipe(first())
      .subscribe(() => {
        console.log('Registro de checkin realizado com sucesso.');
      }, () => {
        console.log('Erro');
      });
  }
}
