import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmvercarritoPage } from './admvercarrito.page';

describe('AdmvercarritoPage', () => {
  let component: AdmvercarritoPage;
  let fixture: ComponentFixture<AdmvercarritoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmvercarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
