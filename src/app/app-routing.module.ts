import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PerfilComponentComponent} from './views/selecao-perfil/perfil-component/perfil-component.component';
import {LoginComponent} from './views/login/login-component/login.component';
import {CadastroComponent} from './views/cliente/cadastro/cadastro.component';
import {CadastroProfissionalComponent} from './views/profissional/cadastro-profissional/cadastro-profissional.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'selecionaperfil', component: PerfilComponentComponent },
  { path: 'cadastrocliente', component: CadastroComponent},
  { path: 'cadastroprofissional', component: CadastroProfissionalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

