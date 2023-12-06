import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdmPersonalDetallePage } from './admpersonaldetalle.page';

describe('AdmPersonalDetallePage', () => {
  let component: AdmPersonalDetallePage;
  let fixture: ComponentFixture<AdmPersonalDetallePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmPersonalDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
