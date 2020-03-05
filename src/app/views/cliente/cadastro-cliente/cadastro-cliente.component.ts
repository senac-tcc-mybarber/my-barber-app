import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { RestService } from 'src/app/rest.service';

import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario.service';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  public clienteForm: FormGroup;

  constructor(
    private router: Router, 
    private api: RestService,
    private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.clienteForm = new FormGroup({
        nome: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        username: new FormControl('', [Validators.required, Validators.maxLength(60)]),
        telefone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
        senha: new FormControl('', [Validators.required, Validators.maxLength(8)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clienteForm.controls[controlName].hasError(errorName);
  }

  cadastrarCliente(form: NgForm) {
    this.api.createCliente(form).pipe(first())
      .subscribe(cliente => {

          console.table(cliente )
          this.login(form['username'], form['senha'])
        },
        
        err => {
          console.log(err);
        });
  }

  private login(username: string, senha: string) {
    this.usuarioService.getToken(username, senha).pipe(first())
    .subscribe(
      () => {
        console.log("sucesso login");
        this.router.navigate(["layout","home"])
      },
      err => {
        console.log(err);
    });
  }
}
