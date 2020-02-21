import { Location } from '@angular/common';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestService } from 'src/app/rest.service';
import * as _ from 'lodash';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Servico } from '../../model/Servico';
import { Salao } from 'src/app/model/Salao';
import { Endereco } from 'src/app/model/Endereco';


export interface Servico {
  categoria: String;
  name: string;
}

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {

  disableSelectServico = true;
  disableSelectBairro = true;
  disableSelectSalao = true;
  disableBotaoAgendar = true;
  servicoFiltrado:Servico[];

  servicos: Servico[] = [
    {Id:1, Descricao:'Tradicional', Categoria:'Barba', Valor:10.50},
    {Id:2, Descricao:'Design', Categoria:'Barba', Valor:10.50},
    {Id:3, Descricao:'Camuflagem de Barba', Categoria:'Barba', Valor:10.50},
    {Id:4, Descricao:'Corte com Máquina', Categoria:'Cabelo', Valor:10.50},
    {Id:5, Descricao:'Corte com Tesoura', Categoria:'Cabelo', Valor:10.50},
    {Id:6, Descricao:'Pezinho', Categoria:'Cabelo', Valor:10.50},
    {Id:7, Descricao:'Camuflagem de Cabelo', Categoria:'Cabelo', Valor:10.50},
    {Id:8, Descricao:'Sei lá', Categoria:'Sombrancelha', Valor:10.50},
    {Id:9, Descricao:'Sei lá 2.0', Categoria:'Sombrancelha', Valor:10.50}
  ];

  categorias:Servico[] = this.servicos.filter(
    (thing, i, arr) => arr.findIndex(t => t.Categoria === thing.Categoria) === i
  );

endereco1: Endereco = {Id:1, Logradouro:'', Numero:1, Complemento:'', Bairro:'Bairro1', Cidade:'', UF:'RJ', CEP:'111'}
endereco2: Endereco = {Id:2, Logradouro:'', Numero:2, Complemento:'', Bairro:'Bairro2', Cidade:'', UF:'RJ', CEP:'222'}
endereco3: Endereco = {Id:3, Logradouro:'', Numero:3, Complemento:'', Bairro:'Bairro3', Cidade:'', UF:'RJ', CEP:'333'}

  saloes: Salao[] = [
    {Id:1, Nome:'Salão1', Telefone:'', Email:'', Endereco:this.endereco1},
    {Id:2, Nome:'Salão2', Telefone:'', Email:'', Endereco:this.endereco2},
    {Id:3, Nome:'Salão3', Telefone:'', Email:'', Endereco:this.endereco2}
  ]

  bairros:Salao[] = this.saloes.filter(
    (thing, i, arr) => arr.findIndex(t => t.Endereco.Bairro === thing.Endereco.Bairro) === i
  );

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() { }


  selecaoCategoria(event, categoriaNome) {
    //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
    if (event.source.selected) {
        console.log(categoriaNome);
        this.disableSelectServico = false;
        this.servicoFiltrado = this.servicos.filter(s => s.Categoria === categoriaNome);
    }
 }

 selecaoServico(event, Id) {
  //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
  if (event.source.selected) {
      console.log(Id);
      this.disableSelectBairro = false;
  }
}

selecaoBairro(event, Id) {
  //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
  if (event.source.selected) {
      console.log(Id);
      this.disableSelectSalao = false;
  }
}

selecaoSalao(event, Id) {
  //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
  if (event.source.selected) {
      console.log(Id);
      this.disableBotaoAgendar = false;
  }
}
}