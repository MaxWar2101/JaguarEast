import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdmPersonalCrearPage } from './admpersonalcrear.page';

describe('AdmPersonalCrearPage', () => {
  let component: AdmPersonalCrearPage;
  let fixture: ComponentFixture<AdmPersonalCrearPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmPersonalCrearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
