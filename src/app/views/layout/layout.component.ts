import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../model/Usuario';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  usuario$: Observable<Usuario>;
  isCliente: Boolean

  constructor(private api: UsuarioService) {}

  ngOnInit() {
    this.usuario$ = this.api.currentUser;
  }

  logout() {
    this.api.logout();
  }
}
