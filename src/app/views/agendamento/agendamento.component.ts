import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Servico } from 'src/app/model/Servico';
import { Salao } from 'src/app/model/Salao';
import { Endereco } from 'src/app/model/Endereco';
import { Profissional } from 'src/app/model/profissional';
import { RestService } from 'src/app/rest.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {

  disableSelectServico = true;
  disableSelectBairro = true;
  disableSelectProfissional = true;
  disableSelectSalao = true;
  disableBotaoAgendar = true;

  servicoFiltrado:Servico[];
  // bairroFiltrado:Endereco[];
  salaoFiltrado:Salao[];

  selectedIdServico:Number;
  selectedIdProfissional:Number;
  selectedIdSalao:Number;

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
  
  endereco4: Endereco = {Id:4, Logradouro:'', Numero:4, Complemento:'', Bairro:'Bairro4', Cidade:'', UF:'RJ', CEP:'111'}
  endereco5: Endereco = {Id:5, Logradouro:'', Numero:5, Complemento:'', Bairro:'Bairro5', Cidade:'', UF:'RJ', CEP:'222'}
  endereco6: Endereco = {Id:6, Logradouro:'', Numero:6, Complemento:'', Bairro:'Bairro6', Cidade:'', UF:'RJ', CEP:'333'}

  endereco7: Endereco = {Id:7, Logradouro:'', Numero:7, Complemento:'', Bairro:'Bairro7', Cidade:'', UF:'RJ', CEP:'111'}
  endereco8: Endereco = {Id:8, Logradouro:'', Numero:8, Complemento:'', Bairro:'Bairro8', Cidade:'', UF:'RJ', CEP:'222'}
  endereco9: Endereco = {Id:9, Logradouro:'', Numero:9, Complemento:'', Bairro:'Bairro9', Cidade:'', UF:'RJ', CEP:'333'}



  saloes: Salao[] = [
    {Id:1, Nome:'Salão1', Telefone:'', Email:'', Endereco:this.endereco1},
    {Id:2, Nome:'Salão2', Telefone:'', Email:'', Endereco:this.endereco2},
    {Id:3, Nome:'Salão3', Telefone:'', Email:'', Endereco:this.endereco3}
  ]

  saloes2: Salao[] = [
    {Id:4, Nome:'Salão4', Telefone:'', Email:'', Endereco:this.endereco4},
    {Id:5, Nome:'Salão5', Telefone:'', Email:'', Endereco:this.endereco5},
    {Id:6, Nome:'Salão6', Telefone:'', Email:'', Endereco:this.endereco6}
  ]

  saloes3: Salao[] = [
    {Id:7, Nome:'Salão7', Telefone:'', Email:'', Endereco:this.endereco7},
    {Id:8, Nome:'Salão8', Telefone:'', Email:'', Endereco:this.endereco8},
    {Id:9, Nome:'Salão9', Telefone:'', Email:'', Endereco:this.endereco9}
  ]

  profissionais:Profissional[] = [
    { Id:1, nome:"Profissional_1", telefone:"111", email:"111", senha:'111', Saloes:this.saloes},
    { Id:2, nome:"Profissional_2", telefone:"222", email:"222", senha:'222', Saloes:this.saloes2},
    { Id:3, nome:"Profissional_3", telefone:"333", email:"333", senha:'333', Saloes:this.saloes3}
  ]

  // bairros:Salao[] = this.saloes.filter(
  //   (thing, i, arr) => arr.findIndex(t => t.Endereco.Bairro === thing.Endereco.Bairro) === i
  // );

  constructor(private api: RestService) {}

  ngOnInit() { }


  selecaoCategoria(event, categoriaNome) {
    //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
    if (event.source.selected) {
        this.disableSelectServico = false;
        this.servicoFiltrado = this.servicos.filter(s => s.Categoria === categoriaNome);
    }
  } 

  selecaoServico(event, Id) {
    //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
    if (event.source.selected) {
        // this.disableSelectBairro = false;
        this.disableSelectProfissional = false;
    }
  }

  selecaoProfissional(event, Id) {
    //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
    if (event.source.selected) {
        this.salaoFiltrado = this.profissionais.filter(s => s.Id === Id)[0].Saloes;
        this.disableSelectSalao = false;
      }
  }

// selecaoBairro(event, Id) {
//   //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
//   if (event.source.selected) {
//       console.log(Id);
//       this.disableSelectSalao = false;
//   }
// }

  selecaoSalao(event, Id) {
    //O IF abaixo é utilizado para reparar a falha da chamada do evento onSelectionChange, pois o mesmo realiza dua chamadas uma quando seleciona o novo valor e outra quando deseleciona o anterior
    if (event.source.selected)
        this.disableBotaoAgendar = false;
  }

  agendar(){

    let bodyRequest = '{"idservico": ' + this.selectedIdServico + ', "idprofissional": ' + this.selectedIdProfissional + ', "idsalao": ' + this.selectedIdSalao + '}';
    this.api.addScheduling(bodyRequest).pipe(first())
      .subscribe(
        () => {
          console.log("sucesso login component");
        },
        () => {
          console.log("erro");
        });
  }
}