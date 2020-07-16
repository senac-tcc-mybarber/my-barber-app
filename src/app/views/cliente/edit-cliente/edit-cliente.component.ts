import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../../model/cliente';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RestService} from '../../../rest.service';
import {UsuarioService} from '../../../usuario.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {

  cliente = new Cliente();
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: RestService, private apiUser: UsuarioService) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      username: new FormControl({ value: '', disabled: true}, [Validators.required, Validators.maxLength(60)]),
      telefone: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      senha: new FormControl('', [Validators.maxLength(8)])
    });
    this.fetchData();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.editForm.controls[controlName].hasError(errorName);
  }

  fetchData() {
    this.getCliente();
    this.initFields();
  }

  getCliente() {
    const user = this.apiUser.currentUserValue
    this.api.getCliente(user.id)
      .subscribe(data => {
        this.cliente = data;
      });
  }

  initFields() {
    this.editForm.get('nome').setValue(this.cliente.nome);
    this.editForm.get('username').setValue(this.cliente.username);
    this.editForm.get('telefone').setValue(this.cliente.telefone);
    this.editForm.get('email').setValue(this.cliente.email);
  }

  updateCliente(form: NgForm){
    const { agendamentos, ...rest } = this.cliente;
    this.api.updateCliente(rest as Cliente).subscribe(() => {
      this.router.navigate(['layout','home'])
    });
  }

}
