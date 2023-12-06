import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdmGeneroDetallePage } from './admgenerodetalle.page';

describe('GeneroDetallePage', () => {
  let component: AdmGeneroDetallePage;
  let fixture: ComponentFixture<AdmGeneroDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmGeneroDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
