import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdmGeneroEditarPage } from './admgeneroeditar.page';

describe('GeneroEditarPage', () => {
  let component: AdmGeneroEditarPage;
  let fixture: ComponentFixture<AdmGeneroEditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmGeneroEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
