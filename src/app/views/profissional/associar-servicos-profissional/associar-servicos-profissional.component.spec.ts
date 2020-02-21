import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarServicosProfissionalComponent } from './associar-servicos-profissional.component';

describe('AssociarServicosProfissionalComponent', () => {
  let component: AssociarServicosProfissionalComponent;
  let fixture: ComponentFixture<AssociarServicosProfissionalComponent>;

  beforeEach(async(() => {
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
