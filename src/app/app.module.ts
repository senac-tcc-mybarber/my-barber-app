import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
} from '@angular/material';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClienteComponent } from './views/cliente/cadastro-cliente/cadastro-cliente.component';
import { LoginComponent } from './views/login/login-component/login.component';
import { CadastroProfissionalComponent } from './views/profissional/cadastro-profissional/cadastro-profissional.component';
import { PerfilComponentComponent } from './views/selecao-perfil/perfil-component/perfil-component.component';
import { AssociacaoSalaoComponent } from './views/profissional/associacao-salao/associacao-salao.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AgendamentoComponent } from './views/agendamento/agendamento.component';
import { AssociarServicosProfissionalComponent } from './views/profissional/associar-servicos-profissional/associar-servicos-profissional.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { CheckinProfissionalComponent } from './views/profissional/checkin-profissional/checkin-profissional.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HistoricoComponent } from './views/historico/historico.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomeClienteComponent } from './views/cliente/home-cliente/home-cliente.component';
import { LayoutComponent } from './views/layout/layout.component';
import { DataTableHistoricoComponent, DialogDetalheHistorico } from './views/historico/data-table-historico/data-table-historico.component';
import { MatSortModule } from '@angular/material/sort';
import { CheckinClienteComponent } from './views/cliente/checkin-cliente/checkin-cliente.component';
import { CheckinComponent } from './views/checkin/checkin.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TabelaAgendamentosComponent } from './views/tabela-agendamentos/tabela-agendamentos.component';
import { HomeProfissionalComponent } from './views/profissional/home-profissional/home-profissional.component';
import { EditProfissionalComponent } from './views/profissional/edit-profissional/edit-profissional.component';
import { EditClienteComponent } from './views/cliente/edit-cliente/edit-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponentComponent,
    CadastroClienteComponent,
    CadastroProfissionalComponent,
    AssociacaoSalaoComponent,
    AgendamentoComponent,
    AssociarServicosProfissionalComponent,
    CheckinProfissionalComponent,
    HistoricoComponent,
    TabelaAgendamentosComponent,
    HomeClienteComponent,
    LayoutComponent,
    DataTableHistoricoComponent,
    DialogDetalheHistorico,
    CheckinClienteComponent,
    CheckinComponent,
    HomeProfissionalComponent,
    EditProfissionalComponent,
    EditClienteComponent

  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatStepperModule,

    MatSnackBarModule,

    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSortModule,

    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  entryComponents: [
    DialogDetalheHistorico
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
