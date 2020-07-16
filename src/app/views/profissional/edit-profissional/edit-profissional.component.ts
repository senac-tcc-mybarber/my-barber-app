import { Component, OnInit } from '@angular/core';
import { Profissional } from '../../../model/profissional';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import { UsuarioService } from '../../../usuario.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../../model/Usuario';

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
    this.getProfissional();
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
  getProfissional() {
    const user = this.apiUser.currentUserValue
    this.api.getProfissional(user.id)
      .subscribe(data => {
        this.profissional = data;
        this.editForm.setValue(this.profissional);
        console.log(this.profissional);
      });
  }

  updateProfissional(form: NgForm) {
    const { agendamentos, ...rest } = this.profissional;
    this.api.updateProfissional(rest as Profissional).subscribe(data => { console.log(data), console.log("profissional updated"), this.router.navigate(["layout", "home"]) }, error => console.log(error));
  }

}
