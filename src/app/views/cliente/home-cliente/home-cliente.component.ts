import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { RestService } from 'src/app/rest.service';
import { UsuarioService } from 'src/app/usuario.service'

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.scss']
})
export class HomeClienteComponent implements OnInit {
  
  cliente = new Cliente();

  constructor(
    private api: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService) {
    }

  ngOnInit() {
    this.getCliente()
  }

  getCliente() {
    const user = this.usuarioService.currentUserValue
    this.api.getCliente(user.id)
      .subscribe(data => {
        this.cliente = data;
        console.log(this.cliente);
      });
  }
}
