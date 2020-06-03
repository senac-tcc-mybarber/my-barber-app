import { AfterViewInit, Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import {
  DataTableHistoricoDataSource,
  DataTableHistoricoItem
} from "./data-table-historico-datasource";
import { RestService } from "src/app/rest.service";
import { UsuarioService } from "src/app/usuario.service";
import { Cliente } from "src/app/model/cliente";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Profissional } from 'src/app/model/profissional';
import { Salao } from 'src/app/model/salao';
import { Servico } from 'src/app/model/Servico';
import { DialogDetalheHistorico } from './dialog-detalhe-agendamento/dialog-detalhe-agendamento.component';

@Component({
  selector: "app-data-table-historico",
  templateUrl: "./data-table-historico.component.html",
  styleUrls: ["./data-table-historico.component.scss"]
})

export class DataTableHistoricoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<
    DataTableHistoricoItem
  >;
  dataSource: DataTableHistoricoDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['servico', 'horario', 'local', 'status'];

  cliente = new Cliente();

  constructor(
    private api: RestService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) {}

  getCliente() {
    const user = this.usuarioService.currentUserValue;
    this.api.getCliente(user.id).subscribe(data => {
      this.dataSource = new DataTableHistoricoDataSource();
      this.dataSource.data = data.agendamentos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;

      //console.table(data.agendamentos);
    });
  }

  ngOnInit() {
    this.getCliente();
  }

  ngAfterViewInit() {}

  openDialog(obj:any): void {
    const dialogRef = this.dialog.open(DialogDetalheHistorico, {
      width: '250px',
      data: obj,
    });

    //console.table(obj);
  }
}

export interface DialogData {
  id: number;
  cliente: Cliente;
  profissional: Profissional;
  salao: Salao;
  servico: Servico;
  inicioServico: Date;
  fimServico: Date;
  status: String;
  checkInCliente: Date;
  checkInProfissional: Date;
  finalizacao: Date;
}