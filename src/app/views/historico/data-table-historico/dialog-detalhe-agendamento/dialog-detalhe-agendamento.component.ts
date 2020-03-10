import { Component, Inject } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { DialogData } from '../data-table-historico.component';

@Component({
  selector: 'dialog-detalhe-agendamento',
  templateUrl: './dialog-detalhe-agendamento.component.html',
})
export class DialogDetalheHistorico {

  constructor(
    public dialogRef: MatDialogRef<DialogDetalheHistorico>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private api: RestService,
    private _snackBar: MatSnackBar,
    public router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelar()
  {
    alert("Teste2")
  }
}