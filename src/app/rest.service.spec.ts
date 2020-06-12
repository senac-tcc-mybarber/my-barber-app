import { TestBed } from '@angular/core/testing';

import { RestService } from './rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Cliente } from './model/cliente';
import { Observable, of } from 'rxjs';
import { Servico } from './model/Servico';
import { Profissional } from './model/profissional';


describe('RestService', () => {
  
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, HttpClientTestingModule, RouterTestingModule.withRoutes([])], 
    providers: [RestService]
  }));

  it('deve ser criado', () => {
    const service: RestService = TestBed.get(RestService);
    expect(service).toBeTruthy();
  });

  it('"getCliente" deve ser chamado', () => {
    let service: RestService = TestBed.get(RestService);
    service = jasmine.createSpyObj('service', [ 'getCliente' ]);
    service.getCliente(1);
    expect(service.getCliente).toHaveBeenCalledWith(1);
  });

  it('deve pegar um cliente', () => {
    let service: RestService = TestBed.get(RestService);

    let cliente = new Cliente();

    spyOn(service, "getCliente").and.returnValue(of(cliente));
    let result = service.getCliente(1);

    expect(result).toEqual(jasmine.any(Observable));
  });

  it('deve associar um service', () => {
    let service: RestService = TestBed.get(RestService);

    spyOn(service, "associarServicos").and.returnValue(of());
    let result = service.associarServicos(1, new Servico()[1]);

    expect(result).toEqual(jasmine.any(Observable));
  });

  it('deve associar um service', () => {
    let service: RestService = TestBed.get(RestService);

    spyOn(service, "getProfissionais").and.returnValue(of(Profissional[1]));
    let result = service.getProfissionais();

    expect(result).toEqual(jasmine.any(Observable));
  });

});
