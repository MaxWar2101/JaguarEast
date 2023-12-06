import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdmGeneroPage } from './admgenero.page';

describe('AdmGeneroPage', () => {
  let component: AdmGeneroPage;
  let fixture: ComponentFixture<AdmGeneroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmGeneroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
