import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-cadastro-profissional',
  templateUrl: './cadastro-profissional.component.html',
  styleUrls: ['./cadastro-profissional.component.scss']
})
export class CadastroProfissionalComponent implements OnInit {

  public profissionalForm: FormGroup;

  constructor(private location: Location) {}

  ngOnInit() {
    this.profissionalForm = new FormGroup({
      nomeCompleto: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      telefone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(8)])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.profissionalForm.controls[controlName].hasError(errorName);
  }
}
