import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmmetodoPage } from './admmetodo.page';

describe('AdmmetodoPage', () => {
  let component: AdmmetodoPage;
  let fixture: ComponentFixture<AdmmetodoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmmetodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
