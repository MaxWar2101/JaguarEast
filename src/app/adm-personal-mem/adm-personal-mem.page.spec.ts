import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmPersonalMemPage } from './adm-personal-mem.page';

describe('AdmPersonalMemPage', () => {
  let component: AdmPersonalMemPage;
  let fixture: ComponentFixture<AdmPersonalMemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmPersonalMemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
