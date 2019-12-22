import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule } from '@angular/material';
import { LoginComponent } from './login-component/login.component';


@NgModule({
  declarations: [LoginComponent],
  exports:[LoginComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
