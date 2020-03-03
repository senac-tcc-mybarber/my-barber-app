import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from 'src/app/model/Usuario';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  usuario$: Observable<Usuario>;

  constructor(private api: UsuarioService) {}

  ngOnInit() {
    this.usuario$ = this.api.currentUser;
  }

  logout() {
    this.api.logout();
  }
}
