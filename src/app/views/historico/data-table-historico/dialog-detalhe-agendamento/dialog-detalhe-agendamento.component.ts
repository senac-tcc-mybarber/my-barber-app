import { Component, Inject } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogData } from '../data-table-historico.component';
import { first } from 'rxjs/operators';
import { Agendamento } from 'src/app/model/agendamento';

@Component({
  selector: 'dialog-detalhe-agendamento',
  templateUrl: './dialog-detalhe-agendamento.component.html',
})
export class DialogDetalheHistorico {

  result: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogDetalheHistorico>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private api: RestService,
    private _snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelar(agendamento:Agendamento)
  {
    agendamento.status = 'CANCELADO';
   
    this.api
      .updateAgendamento(agendamento)
      .pipe(first())
      .subscribe(
        () => {
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
      // if (sucesso) this.router.navigate([this.sucessoRoute]);
    });
  }
}