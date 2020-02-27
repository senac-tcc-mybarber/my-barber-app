import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Agendamento} from '../../../model/agendamento';
import {RestService} from '../../../rest.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  }

  getAgendamento(id) {
    this.api.getAgendamento(id)
      .subscribe(data => {
        this.agendamento = data;
        console.log(this.agendamento);
      });
  }
}
