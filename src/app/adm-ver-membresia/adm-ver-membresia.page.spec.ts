import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmVerMembresiaPage } from './adm-ver-membresia.page';

describe('AdmVerMembresiaPage', () => {
  let component: AdmVerMembresiaPage;
  let fixture: ComponentFixture<AdmVerMembresiaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmVerMembresiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
