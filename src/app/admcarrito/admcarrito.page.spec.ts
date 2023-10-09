import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmcarritoPage } from './admcarrito.page';

describe('AdmcarritoPage', () => {
  let component: AdmcarritoPage;
  let fixture: ComponentFixture<AdmcarritoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmcarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
