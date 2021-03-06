import { AfterViewInit, Component, OnInit, ViewChild, Inject } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import {
  DataTableHistoricoDataSource,
  DataTableHistoricoItem
} from "./data-table-historico-datasource";
import { RestService } from "../../../rest.service";
import { UsuarioService } from "../../../usuario.service";
import { Cliente } from "../../../model/cliente";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profissional } from '../../../model/profissional';
import { Salao } from '../../../model/salao';
import { Servico } from '../../../model/Servico';
// import { Servico } from '../../../model/Servico';

@Component({
  selector: "app-data-table-historico",
  templateUrl: "./data-table-historico.component.html",
  styleUrls: ["./data-table-historico.component.scss"]
})

export class DataTableHistoricoComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<
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

  getHistorico() {
    const user = this.usuarioService.currentUserValue;
    if (user.perfil === 'cliente') {
      this.api.getCliente(user.id).subscribe(data => {
        this.setDataBinding(data);
      });
    } else if (user.perfil === 'profissional') {
      this.api.getProfissional(user.id).subscribe(data => {
        this.setDataBinding(data);
      });
    } else {
      throw new Error('Perfil de usuário não definido!');
    }
  }

  setDataBinding(data) {
    this.dataSource = new DataTableHistoricoDataSource();
    this.dataSource.data = data.agendamentos;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit() {
    this.getHistorico();
  }

  ngAfterViewInit() {}

  openDialog(obj:any): void {
    const dialogRef = this.dialog.open(DialogDetalheHistorico, {
      width: '250px',
      data: obj,
    });
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

@Component({
  selector: 'dialog-detalhe-historico',
  templateUrl: './dialog-detalhe-historico/dialog-detalhe-historico.html',
})
export class DialogDetalheHistorico {

  constructor(
    public dialogRef: MatDialogRef<DialogDetalheHistorico>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}