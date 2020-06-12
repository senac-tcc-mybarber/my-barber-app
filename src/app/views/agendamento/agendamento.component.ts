import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

import { Servico } from "../../model/Servico";
import { Salao } from "../../model/salao";
import { Profissional } from "../../model/profissional";
import { RestService } from "../../rest.service";
import { first } from "rxjs/operators";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Agendamento } from "../../model/agendamento";
import { Time } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-agendamento",
  templateUrl: "./agendamento.component.html",
  styleUrls: ["./agendamento.component.scss"]
})
export class AgendamentoComponent implements OnInit {
  // Variaveis de interação com a tela
  disableSelectServico = true;
  disableSelectProfissional = true;
  disableSelectSalao = true;
  disableSelectCalendario = true;
  disableSelectHorario = true;
  disableBotaoAgendar = true;

  FiltroDoCalendario = new Date();

  // Variavel para comunicação com a API
  agendamento: Agendamento = new Agendamento();

  // Variaveis que armazenam objetos que populam os objetos da tela
  servicos: Servico[] = [];
  profissionais: Profissional[] = [];
  saloes: Salao[];
  HorarioDeAtendimento: Time[] = [
    { hours: 8, minutes: 0 },
    { hours: 9, minutes: 0 },
    { hours: 10, minutes: 0 },
    { hours: 11, minutes: 0 },
    { hours: 12, minutes: 0 },
    { hours: 13, minutes: 0 },
    { hours: 14, minutes: 0 },
    { hours: 15, minutes: 0 },
    { hours: 16, minutes: 0 },
    { hours: 17, minutes: 0 },
    { hours: 18, minutes: 0 }
  ];

  sucessoRoute: String = "/home";
  erroRoute: String = "/home";

  constructor(
    private api: RestService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit() {
    this.PegarServicosNaAPI();
  }

  selecaoServico(event, id: number) {
    if (event.source.selected) {
      this.AoSelecionarCampo("servico");
      this.PegarProfissionaisNaAPI(id);
      this.agendamento.servico = new Servico();
      this.agendamento.servico.id = id;
    }
  }

  selecaoProfissional(event, id: number) {
    if (event.source.selected) {
      this.AoSelecionarCampo("profissional");
      this.saloes = this.profissionais.filter(p => p.id === id)[0].saloes;
      this.agendamento.profissional = new Profissional();
      this.agendamento.profissional.id = id;
    }
  }

  selecaoSalao(event, id: number) {
    if (event.source.selected) this.AoSelecionarCampo("salao");
    this.agendamento.salao = new Salao();
    this.agendamento.salao.id = id;
  }

  selecaoData(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type === "change") {
      this.AoSelecionarCampo("data");
      this.agendamento.inicioServico = event.value;
    }
  }

  selecaoHorario(event, hora: Time) {
    if (event.source.selected) {
      this.AoSelecionarCampo("horario");
      this.agendamento.inicioServico.setHours(hora.hours);
    }
  }

  PegarServicosNaAPI() {
    this.api.getServicos().subscribe(s => {
      this.servicos = s as Servico[];
    });
  }

  PegarProfissionaisNaAPI(id: Number) {
    this.api.getProfissionais().subscribe(s => {
      this.profissionais = s.filter(p =>
        p.servicos.find(s => s.id === id)
      ) as Profissional[];
    });
  }

  agendar() {
    this.api
      .createAgendamento(this.agendamento)
      .pipe(first())
      .subscribe(
        () => {
          console.log("sucesso login component");
          this.openSnackBar("Agendamento realizado com sucesso", "Ok");
        },
        () => {
          this.openSnackBar(
            "Falha ao agendar, tente novamente mais tarde.",
            "Sair"
          );
        }
      );
  }

  openSnackBar(message: string, action: string) {
    let sucesso: Boolean = action === "Ok" ? true : false;

    let snackBarRef = sucesso
      ? this._snackBar.open(message, action, { duration: 3000 })
      : this._snackBar.open(message, action, { duration: 5000 });

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });

    snackBarRef.afterDismissed().subscribe(() => {
      if (sucesso) this.router.navigate([this.sucessoRoute]);
    });
  }

  private AoSelecionarCampo(nomeDoCampo: String) {
    switch (nomeDoCampo) {
      case "servico":
        this.disableSelectProfissional = false;
        this.disableSelectSalao = true;
        this.disableSelectCalendario = true;
        this.disableSelectHorario = true;
        this.disableBotaoAgendar = true;
        this.profissionais = [];
        this.saloes = [];
        break;

      case "profissional":
        this.disableSelectSalao = false;
        this.disableSelectCalendario = true;
        this.disableSelectHorario = true;
        this.disableBotaoAgendar = true;
        this.saloes = [];
        break;

      case "salao":
        this.disableSelectCalendario = false;
        this.disableSelectHorario = true;
        this.disableBotaoAgendar = true;
        break;

      case "data":
        this.disableSelectHorario = false;
        this.disableBotaoAgendar = true;
        break;

      case "horario":
        this.disableBotaoAgendar = false;
        break;

      default:
        break;
    }
  }
}
