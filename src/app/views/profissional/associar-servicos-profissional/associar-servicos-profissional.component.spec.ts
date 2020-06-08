import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarServicosProfissionalComponent } from './associar-servicos-profissional.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('AssociarServicosProfissionalComponent', () => {
  let component: AssociarServicosProfissionalComponent;
  let fixture: ComponentFixture<AssociarServicosProfissionalComponent>;

  beforeEach(async(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

    TestBed.configureTestingModule({
      declarations: [ AssociarServicosProfissionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarServicosProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
