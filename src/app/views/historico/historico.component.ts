import { Component, OnInit, ViewChild } from '@angular/core';
import { Agendamento } from 'src/app/model/agendamento';
import { RestService } from 'src/app/rest.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Cliente } from 'src/app/model/cliente';
import { Profissional } from 'src/app/model/profissional';
import { Salao } from 'src/app/model/salao';
import { Servico } from 'src/app/model/Servico';
import { Stats } from 'fs';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  historico:Agendamento[]=[];
  ag:IAgendamento[];

  constructor(private api: RestService) { }

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.PegarHistorico(1)
  }
  
  PegarHistorico(id:Number)
  {
    this.api.getClientes(id).subscribe(s => {
      this.historico = s.agendamentos;
      let h:IAgendamento[];
      // const {servico, inicioServico:horario, salao: {endereco:local}, status} = s.agendamentos[0];
      // const teste = {servico:this.historico[0].servico.nome, horario:this.historico[0].inicioServico, salao:this.historico[0].salao.endereco, status:this.historico[0].status};
      // const teste = s.agendamentos.map(x => {x.servico.nome, x.inicioServico, x.salao.endereco, x.status} ). //{servico:this.historico[0].servico.nome, horario:this.historico[0].inicioServico, salao:this.historico[0].salao.endereco, status:this.historico[0].status};
      // const teste = s.agendamentos.forEach(x => h.push( x.servico.nome, x.inicioServico, x.salao.endereco, x.status} ) ). //{servico:this.historico[0].servico.nome, horario:this.historico[0].inicioServico, salao:this.historico[0].salao.endereco, status:this.historico[0].status};

      for (var {servico: {nome:servico}, inicioServico:horario, salao: { endereco:local }, status  } of this.historico) {
        console.log("Serviço: " + servico + " Horario: " + horario + " Local: " + local + " Status: " + status);
        // this.ag.push({servico + horario + local + status});
      }

      // console.log(teste);

      // const {inicioServico, status } = s.agendamentos.forEach(x => this.ag.push({x: {}})) 

    });
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface IAgendamento {
  servico: string;
  horario: Date;
  local: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

