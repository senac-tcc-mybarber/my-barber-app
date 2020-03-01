import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Agendamento} from "../../../model/agendamento";
import {RestService} from "../../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-checkin-cliente',
  templateUrl: './checkin-cliente.component.html',
  styleUrls: ['./checkin-cliente.component.scss']
})
export class CheckinClienteComponent implements OnInit {
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
    this.api.checkInCliente(this.agendamento.id)
      .pipe(first())
      .subscribe(() => {
        console.log('Registro de checkin realizado com sucesso.');
      }, () => {
        console.log('Erro');
      });
  }
}
