import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Agendamento} from "../../model/agendamento";
import {RestService} from "../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import { Profissional } from 'src/app/model/profissional';
import { Cliente } from 'src/app/model/cliente';
import { Salao } from 'src/app/model/salao';
import { Servico } from 'src/app/model/Servico';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  agendamentoCtrl = new FormControl();
  agendamento = new Agendamento();
  profissional = new Profissional();
  cliente = new Cliente();
  salao = new Salao();
  servico = new Servico();

  @Input()
  tipoCheckin: string;

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
        this.profissional = this.agendamento?.profissional;
        this.cliente = this.agendamento?.cliente;
        this.salao = this.agendamento?.salao;
        this.servico = this.agendamento?.servico;
      });
  }

  realizarCheckin() {
    this.api.checkIn(this.agendamento.id, this.tipoCheckin)
      .pipe(first())
      .subscribe(() => {
        this.redirecionarHome();
      });
  }

  redirecionarHome() {
    this.router.navigate(['layout/home']);
  }
}
