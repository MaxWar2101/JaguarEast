import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmCrearMembresiaPage } from './adm-crear-membresia.page';

describe('AdmCrearMembresiaPage', () => {
  let component: AdmCrearMembresiaPage;
  let fixture: ComponentFixture<AdmCrearMembresiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmCrearMembresiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
