import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinClienteComponent } from './checkin-cliente.component';

describe('CheckinClienteComponent', () => {
  let component: CheckinClienteComponent;
  let fixture: ComponentFixture<CheckinClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
