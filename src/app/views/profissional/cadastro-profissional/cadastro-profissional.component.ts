import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import { RestService } from 'src/app/rest.service';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import {UsuarioService} from '../../../usuario.service';

@Component({
  selector: 'app-cadastro-profissional',
  templateUrl: './cadastro-profissional.component.html',
  styleUrls: ['./cadastro-profissional.component.scss']
})
export class CadastroProfissionalComponent implements OnInit {

  public profissionalForm: FormGroup;

  constructor(private location: Location, private api: RestService, private router: Router, private usuarioService: UsuarioService ) {}

  ngOnInit() {
    this.profissionalForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      telefone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      senha: new FormControl('', [Validators.required, Validators.maxLength(8)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.profissionalForm.controls[controlName].hasError(errorName);
  }

  //funcao para adicionar o profissional
  //form é o objeto Profissional, angular resolve isso
  //passo pra proxima tela o Id do profissional criado
  addProfissional(form: NgForm){
    this.api.createProfissional(form)
      .subscribe(Profissional => {
          console.log(Profissional);
          this.login(form['username'], form['senha'])
      }, (err) => {
          console.log(err);
        });
  }

  private login(username: string, senha: string) {
    this.usuarioService.getToken(username, senha).pipe(first())
      .subscribe(res => {
          console.log('sucesso login');
          const id = res['id'];
          this.router.navigate(['/associarsalao', id]);
        },
        err => {
          console.log(err);
        });
  }
}
