import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule }    from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule } from '@angular/material';
import { MatButtonToggleModule} from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './views/login/login-component/login.component';
import { PerfilComponentComponent } from './views/selecao-perfil/perfil-component/perfil-component.component';
import { CadastroClienteComponent } from './views/cliente/cadastro-cliente/cadastro-cliente.component';
import { CadastroProfissionalComponent } from './views/profissional/cadastro-profissional/cadastro-profissional.component';
import { RestService } from './rest.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponentComponent,
    CadastroClienteComponent,
    CadastroProfissionalComponent
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
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
