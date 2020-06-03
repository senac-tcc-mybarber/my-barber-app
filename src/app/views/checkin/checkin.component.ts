import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Agendamento} from "../../model/agendamento";
import {RestService} from "../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  agendamentoCtrl = new FormControl();
  agendamento: Agendamento;

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
        console.log(this.agendamento);
      });
  }

  realizarCheckin() {
    this.api.checkIn(this.agendamento.id, this.tipoCheckin)
      .pipe(first())
      .subscribe(() => {
        console.log(`Registro de check-in do ${this.tipoCheckin} realizado com sucesso.`);
        this.redirecionarHome();
      }, () => {
        console.log('Erro');
      });
  }

  redirecionarHome() {
    this.router.navigate([`layout/home${this.tipoCheckin}`]);
  }
}
