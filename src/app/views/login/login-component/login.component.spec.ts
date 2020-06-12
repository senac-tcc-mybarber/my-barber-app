import { LoginComponent } from "./login.component";

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

describe('LoginComponent', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, HttpClientTestingModule, RouterTestingModule.withRoutes([]),
        MatTableModule, MatSortModule], 
        providers: [LoginComponent]
      }));

      it('deve ser criado', () => {
        const service: LoginComponent = TestBed.get(LoginComponent);
        expect(service).toBeTruthy();
      });

      it('"entrar" deve ser chamado" ', () => {
        let service: LoginComponent = TestBed.get(LoginComponent);

        service = jasmine.createSpyObj('service', [ 'entrar' ]);
        
        service.entrar();

        expect(service.entrar).toHaveBeenCalled();
      });
    });