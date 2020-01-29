import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './views/cliente/cadastro/cadastro.component';
import { LoginModule } from './views/login/login.module';
import { PerfilComponentComponent } from './views/selecao-perfil/perfil-component/perfil-component.component';
import { CadastroProfissionalComponent } from './views/profissional/cadastro-profissional/cadastro-profissional.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
;


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    PerfilComponentComponent,
    CadastroProfissionalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
