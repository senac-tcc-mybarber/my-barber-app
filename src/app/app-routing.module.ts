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


var home: string = "homecliente";
const currentUserString = localStorage.getItem("currentUser")

if(currentUserString) {
  const role = JSON.parse(localStorage.getItem("currentUser")).perfil;
  
  if (role == "profissional") {
    home = "homeprofissional"
  }
}


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login', component: LoginComponent},
  { path: 'selecionaperfil', component: PerfilComponentComponent },
  { path: 'cadastrocliente', component: CadastroClienteComponent},
  { path: 'cadastroprofissional', component: CadastroProfissionalComponent},
  { path: 'associarsalao/:id', component: AssociacaoSalaoComponent},
  { path: 'associarservicoprofissional/:id', component: AssociarServicosProfissionalComponent},
  { path: 'agendamento', component: AgendamentoComponent},
  { path: 'checkinprofissional/:id', component: CheckinProfissionalComponent},
  { path: 'layout', component: LayoutComponent, children :[
    { path: 'home', redirectTo: home},
    { path: 'homecliente', component: HomeClienteComponent},
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

