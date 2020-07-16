import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../../model/profissional';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { UsuarioService } from '../../../usuario.service';

@Component({
  selector: 'app-edit-profissional',
  templateUrl: './edit-profissional.component.html',
  styleUrls: ['./edit-profissional.component.scss']
})
export class EditProfissionalComponent implements OnInit {

  profissional = new Profissional();
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
    this.getProfissional();
    this.initFields();
  }

  getProfissional() {
    const user = this.apiUser.currentUserValue
    this.api.getProfissional(user.id)
      .subscribe(data => {
        this.profissional = data;
      });
  }

  initFields() {
    this.editForm.get('nome').setValue(this.profissional.nome);
    this.editForm.get('username').setValue(this.profissional.username);
    this.editForm.get('telefone').setValue(this.profissional.telefone);
    this.editForm.get('email').setValue(this.profissional.email);
  }

  updateProfissional(form: NgForm) {
    const { agendamentos, ...rest } = this.profissional;
    this.api.updateProfissional(rest as Profissional).subscribe(() => {
      this.router.navigate(['layout', 'home']);
    });
  }

}
