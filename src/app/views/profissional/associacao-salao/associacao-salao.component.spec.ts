import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociacaoSalaoComponent } from './associacao-salao.component';

describe('AssociacaoSalaoComponent', () => {
  let component: AssociacaoSalaoComponent;
  let fixture: ComponentFixture<AssociacaoSalaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociacaoSalaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociacaoSalaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
