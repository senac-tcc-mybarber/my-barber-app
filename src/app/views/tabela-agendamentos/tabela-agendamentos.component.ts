import { Component, OnInit, Input } from "@angular/core";
import { Agendamento } from "src/app/model/agendamento";
import { MatDialog } from "@angular/material";
import { DialogDetalheHistorico } from '../historico/data-table-historico/dialog-detalhe-agendamento/dialog-detalhe-agendamento.component';

@Component({
  selector: "app-tabela-agendamentos",
  templateUrl: "./tabela-agendamentos.component.html",
  styleUrls: ["./tabela-agendamentos.component.scss"]
})
export class TabelaAgendamentosComponent {

  constructor(public dialog: MatDialog) {}

  @Input()
  agendamentos: Agendamento[];

  @Input()
  displayedColumns: string[];

  openDialog(obj: any): void {
    const dialogRef = this.dialog.open(DialogDetalheHistorico, {
      width: "250px",
      data: obj
    });

    //console.table(obj);
  }
}
