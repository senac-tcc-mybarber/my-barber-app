import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProfissionalComponent } from './cadastro-profissional.component';

describe('CadastroProfissionalComponent', () => {
  let component: CadastroProfissionalComponent;
  let fixture: ComponentFixture<CadastroProfissionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroProfissionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
