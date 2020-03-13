import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoComponent } from './views/agendamento/agendamento.component';
import { CadastroClienteComponent } from './views/cliente/cadastro-cliente/cadastro-cliente.component';
import { HomeClienteComponent } from './views/cliente/home-cliente/home-cliente.component';
import { LoginComponent } from './views/login/login-component/login.component';
import { AssociacaoSalaoComponent } from './views/profissional/associacao-salao/associacao-salao.component';
import { AssociarServicosProfissionalComponent } from './views/profissional/associar-servicos-profissional/associar-servicos-profissional.component';
import { CadastroProfissionalComponent } from './views/profissional/cadastro-profissional/cadastro-profissional.component';
import { CheckinProfissionalComponent } from './views/profissional/checkin-profissional/checkin-profissional.component';
import { PerfilComponentComponent } from './views/selecao-perfil/perfil-component/perfil-component.component';
import { LayoutComponent } from './views/layout/layout.component';
import { HistoricoComponent } from './views/historico/historico.component';
import {CheckinClienteComponent} from './views/cliente/checkin-cliente/checkin-cliente.component';
import {HomeProfissionalComponent} from './views/profissional/home-profissional/home-profissional.component';
import {EditProfissionalComponent} from './views/profissional/edit-profissional/edit-profissional.component';
import {EditClienteComponent} from './views/cliente/edit-cliente/edit-cliente.component';



var home: string = 'homecliente';
const currentUserString = localStorage.getItem('currentUser');

if(currentUserString) {
  const role = JSON.parse(localStorage.getItem('currentUser')).perfil;

  if (role == 'profissional') {
    home = 'homeprofissional';
  }
}


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'home', redirectTo: 'layout/home'},
  { path: 'login', component: LoginComponent},
  { path: 'selecionaperfil', component: PerfilComponentComponent },
  { path: 'cadastrocliente', component: CadastroClienteComponent},
  { path: 'editcliente', component: EditClienteComponent},
  { path: 'cadastroprofissional', component: CadastroProfissionalComponent},
  { path: 'editprofissional', component: EditProfissionalComponent},
  { path: 'associarsalao/:id', component: AssociacaoSalaoComponent},
  { path: 'associarservicoprofissional/:id', component: AssociarServicosProfissionalComponent},
  { path: 'layout', component: LayoutComponent, children :[
    { path: 'home', redirectTo: home},
    { path: 'homecliente', component: HomeClienteComponent},
    { path: 'homeprofissional', component: HomeProfissionalComponent},
    { path: 'agendamento', component: AgendamentoComponent},
    { path: 'historico', component: HistoricoComponent},
    { path: 'checkincliente/:id', component: CheckinClienteComponent},
    { path: 'checkinprofissional/:id', component: CheckinProfissionalComponent},
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
