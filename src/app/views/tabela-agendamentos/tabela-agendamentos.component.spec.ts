import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaAgendamentosComponent } from './tabela-agendamentos.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('TabelaAgendamentosComponent', () => {
  let component: TabelaAgendamentosComponent;
  let fixture: ComponentFixture<TabelaAgendamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaAgendamentosComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TabelaAgendamentosComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaAgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
