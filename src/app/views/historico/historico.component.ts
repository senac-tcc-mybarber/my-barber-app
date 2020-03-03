import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/model/agendamento';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  agendamentos:Agendamento[] = [
    {
      "id": 1,
      "cliente": {
        "nome": "Maria da Silva",
        "telefone": "2199219384723948",
        "email": "maria@gmail.com",
        "password": "1234"
      },
      "profissional": {
        "id": 2,
        "nome": "Jose Maria",
        "telefone": "123456789",
        "email": "josemaria@gmail.com",
        "senha": "1234",
        "servicos": [
          {
            "id": 5,
            "descricao": "Escova Progressiva",
            "valor": 0,
            "categoria": ""
          },
          {
            "id": 3,
            "descricao": "Pedicure",
            "valor": 0,
            "categoria": ""
          }
        ],
        "saloes": [
          {
            "id": 3,
            "nome": "Salao dos Turistas",
            "cnpj": "33.366.825/0001-83",
            "bairro": "Copacabana",
            "endereco": "Av Atlantica 342",
            "coordenadaX": "1",
            "coordenadaY": "2"
          },
          {
            "id": 2,
            "nome": "Salao do Centro",
            "cnpj": "45.298.705/0001-75",
            "bairro": "Centro",
            "endereco": "Rua da Quitanda 35",
            "coordenadaX": "1",
            "coordenadaY": "2"
          }
        ]
      },
      "salao": {
        "id": 2,
        "nome": "Salao do Centro",
        "cnpj": "45.298.705/0001-75",
        "bairro": "Centro",
        "endereco": "Rua da Quitanda 35",
        "coordenadaX": "1",
        "coordenadaY": "2"
      },
      "servico": {
        "id": 2,
        "descricao": "Manicure",
        "valor": 0,
        "categoria": ""
      },
      "inicioServico": new Date("01/03/2020 19:00"),
      "fimServico": new Date("01/03/2020 19:30"),
      "status": "CONCLUIDO",
      "checkInCliente": null,
      "checkInProfissional": null,
      "finalizacao":  new Date("01/03/2020 19:30")
    },
    {
      "id": 2,
      "cliente": {
        "nome": "Luiz da Silva",
        "telefone": "2199219384723948",
        "email": "luiz@gmail.com",
        "password": "1234"
      },
      "profissional": {
        "id": 3,
        "nome": "Alphonse Eric",
        "telefone": "123456789",
        "email": "alphonse@gmail.com",
        "senha": "1234",
        "servicos": [
          {
            "id": 6,
            "descricao": "Barba",
            "valor": 0,
            "categoria": ""
          },
          {
            "id": 1,
            "descricao": "Depilacao",
            "valor": 0,
            "categoria": ""
          }
        ],
        "saloes": [
          {
            "id": 3,
            "nome": "Salao dos Turistas",
            "cnpj": "33.366.825/0001-83",
            "bairro": "Copacabana",
            "endereco": "Av Atlantica 342",
            "coordenadaX": "1",
            "coordenadaY": "2"
          },
          {
            "id": 4,
            "nome": "Salao da Lapa",
            "cnpj": "10.162.885/0001-78",
            "bairro": "Centro",
            "endereco": "Rua da Lapa 1",
            "coordenadaX": "1",
            "coordenadaY": "2"
          }
        ]
      },
      "salao": {
        "id": 3,
        "nome": "Salao dos Turistas",
        "cnpj": "33.366.825/0001-83",
        "bairro": "Copacabana",
        "endereco": "Av Atlantica 342",
        "coordenadaX": "1",
        "coordenadaY": "2"
      },
      "servico": {
        "id": 3,
        "descricao": "Pedicure",
        "valor": 0,
        "categoria": ""
      },
      "inicioServico": new Date("01/03/2020 19:00"),
      "fimServico": new Date("01/03/2020 19:30"),
      "status": "CONCLUIDO",
      "checkInCliente": new Date("01/03/2020 19:00"),
      "checkInProfissional": new Date("01/03/2020 19:00"),
      "finalizacao": new Date("01/03/2020 19:30")
    },
    {
      "id": 3,
      "cliente": {
        "nome": "Jose da Silva",
        "telefone": "2199219384723948",
        "email": "jose@gmail.com",
        "password": "1234"
      },
      "profissional": {
        "id": 4,
        "nome": "Dr. Mundo",
        "telefone": "123456789",
        "email": "mundo@gmail.com",
        "senha": "1234",
        "servicos": [
          {
            "id": 2,
            "descricao": "Manicure",
            "valor": 0,
            "categoria": ""
          },
          {
            "id": 5,
            "descricao": "Escova Progressiva",
            "valor": 0,
            "categoria": ""
          }
        ],
        "saloes": [
          {
            "id": 1,
            "nome": "Salao do Shopping",
            "cnpj": "62.408.761/0001-34",
            "bairro": "Barra da Tijuca",
            "endereco": "Av das Americas 96975",
            "coordenadaX": "1",
            "coordenadaY": "2"
          },
          {
            "id": 4,
            "nome": "Salao da Lapa",
            "cnpj": "10.162.885/0001-78",
            "bairro": "Centro",
            "endereco": "Rua da Lapa 1",
            "coordenadaX": "1",
            "coordenadaY": "2"
          }
        ]
      },
      "salao": {
        "id": 4,
        "nome": "Salao da Lapa",
        "cnpj": "10.162.885/0001-78",
        "bairro": "Centro",
        "endereco": "Rua da Lapa 1",
        "coordenadaX": "1",
        "coordenadaY": "2"
      },
      "servico": {
        "id": 5,
        "descricao": "Escova Progressiva",
        "valor": 0,
        "categoria": ""
      },
      "inicioServico": new Date("01/03/2020 19:00"),
      "fimServico": new Date("01/03/2020 19:30"),
      "status": "CANCELADO",
      "checkInCliente": null,
      "checkInProfissional": null,
      "finalizacao": null
    }
  ]
}
