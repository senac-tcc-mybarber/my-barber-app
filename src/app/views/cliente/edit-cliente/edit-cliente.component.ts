import { Component, OnInit } from '@angular/core';
import {Cliente} from '../../../model/cliente';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RestService} from '../../../rest.service';
import {UsuarioService} from '../../../usuario.service';
import {Observable} from 'rxjs';
import {Usuario} from '../../../model/Usuario';

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
    this.getCliente();
    this.editForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      telefone: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      senha: new FormControl('', [Validators.maxLength(8)])
    });

  }
  public hasError = (controlName: string, errorName: string) => {
    return this.editForm.controls[controlName].hasError(errorName);
  }
  getCliente() {
    const user = this.apiUser.currentUserValue
    this.api.getCliente(user.id)
      .subscribe(data => {
        this.cliente = data;
        this.editForm.setValue(this.cliente);
        console.log(this.cliente);
      });
  }

  updateCliente(form: NgForm){
    const { agendamentos, ...rest } = this.cliente;
    this.api.updateCliente(rest as Cliente).subscribe(data => { console.log(data),console.log("cliente updated") ,this.router.navigate(["layout","home"])}, error => console.log(error));
  }

}
