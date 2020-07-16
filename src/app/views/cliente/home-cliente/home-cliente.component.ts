import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Cliente } from "../../../model/cliente";
import { RestService } from "../../../rest.service";
import { UsuarioService } from "../../../usuario.service";

@Component({
  selector: "app-home-cliente",
  templateUrl: "./home-cliente.component.html",
  styleUrls: ["./home-cliente.component.scss"],
})
export class HomeClienteComponent implements OnInit {
  cliente = new Cliente();

  constructor(
    private api: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  public innerWidth: any;
  public colunms: string[];
  ngOnInit() {
    this.innerWidth = window.innerWidth;

    this.colunms = [
      "servico",
      "horario",
      "local",
      "status",
      "atendente",
      "checkincliente",
      // "concluirAtendimento",
    ];

    if(this.innerWidth < 380){
      this.removeArrayElement("atendente");
      this.removeArrayElement("status");
    }
    else if(this.innerWidth < 450){
      this.removeArrayElement("status");
    }

    this.getCliente();
  }

  removeArrayElement(key:string){
    const index = this.colunms.indexOf(key, 0);
    if (index > -1) {
      this.colunms.splice(index, 1);
    }
  }

  getCliente() {
    const user = this.usuarioService.currentUserValue;
    this.api.getCliente(user.id).subscribe((data) => {
      this.cliente = data;
      this.cliente.agendamentos = this.cliente.agendamentos.filter(
        (x) => x.status != "CONCLUIDO" && x.status != "CANCELADO"
      );
    });
  }
}
