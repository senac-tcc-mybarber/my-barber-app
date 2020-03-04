import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/model/agendamento';
import { RestService } from 'src/app/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss']
})
export class HomeClienteComponent implements OnInit {
  cliente: Cliente;

  constructor(private api: RestService,
    private route: ActivatedRoute,
    private router: Router) {
    }

  ngOnInit() {
    this.getCliente(this.route.snapshot.params['id'])
  }

  getCliente(id) {
    this.api.getCliente(id)
      .subscribe(data => {
        this.cliente = data;
        console.log(this.cliente);
      });
  }
}
