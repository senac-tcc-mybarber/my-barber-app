import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponentComponent } from './views/selecao-perfil/perfil-component/perfil-component.component';
import { LoginComponent } from "./views/login/login-component/login.component";
import { CadastroClienteComponent } from './views/cliente/cadastro-cliente/cadastro-cliente.component';
import { CadastroProfissionalComponent } from './views/profissional/cadastro-profissional/cadastro-profissional.component';
import { AssociacaoSalaoComponent } from './views/profissional/associacao-salao/associacao-salao.component';
import { AssociarServicosProfissionalComponent } from './views/profissional/associar-servicos-profissional/associar-servicos-profissional.component';
import { AgendamentoComponent } from './views/agendamento/agendamento.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'selecionaperfil', component: PerfilComponentComponent },
  { path: 'cadastrocliente', component: CadastroClienteComponent},
  { path: 'cadastroprofissional', component: CadastroProfissionalComponent},
  { path: 'associarsalao', component: AssociacaoSalaoComponent},
  { path: 'associarservicoprofissional/:id', component: AssociarServicosProfissionalComponent},
  { path: 'agendamento', component: AgendamentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

