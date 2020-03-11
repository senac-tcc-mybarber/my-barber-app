import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/usuario.service';
import { Usuario } from 'src/app/model/Usuario';
import { first } from 'rxjs/operators';


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
    this.usuario$.pipe(first()).subscribe( usr => {
      this.isCliente = (usr.perfil == 'cliente')
    })
  }

  logout() {
    this.api.logout();
  }
}
