import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembresiaDetallePage } from './membresia-detalle.page';

describe('MembresiaDetallePage', () => {
  let component: MembresiaDetallePage;
  let fixture: ComponentFixture<MembresiaDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MembresiaDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
