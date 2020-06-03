import { Component, OnInit, Input } from '@angular/core';
import { Agendamento } from 'src/app/model/agendamento';
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {first} from "rxjs/operators";
import {RestService} from "../../rest.service";

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

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private api: RestService) {
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
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Deseja finalizar o atendimento?';

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.concluirAtendimento(agendamento);
      }
      this.dialogRef = null;
    });
  }

  concluirAtendimento(agendamento) {
    this.api.concluirAtendimento(agendamento.id)
      .pipe(first())
      .subscribe(() => {
        console.log(`Atendimento concluído com sucesso.`);
        window.location.reload();
      }, () => {
        console.log('Erro');
      });
  }
}
