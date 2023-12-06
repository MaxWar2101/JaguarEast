import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdmGeneroCrearPage } from './admgenerocrear.page';

describe('AdmGeneroCrearPage', () => {
  let component: AdmGeneroCrearPage;
  let fixture: ComponentFixture<AdmGeneroCrearPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmGeneroCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
