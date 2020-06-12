import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinProfissionalComponent } from './checkin-profissional.component';

describe('CheckinProfissionalComponent', () => {
  let component: CheckinProfissionalComponent;
  let fixture: ComponentFixture<CheckinProfissionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinProfissionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinProfissionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
