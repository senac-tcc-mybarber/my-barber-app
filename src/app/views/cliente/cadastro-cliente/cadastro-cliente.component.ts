import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/rest.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  public clienteForm: FormGroup;

  constructor(private location: Location, private api: RestService) {}

  ngOnInit() {
    this.clienteForm = new FormGroup({
        nomeCompleto: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        telefone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(8)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clienteForm.controls[controlName].hasError(errorName);
  }

  cadastrarCliente() {
    this.api.createCliente().pipe(first())
      .subscribe(
        () => {
          console.log("sucesso login component");
        },
        () => {
          console.log("erro");
        });
  }

}
