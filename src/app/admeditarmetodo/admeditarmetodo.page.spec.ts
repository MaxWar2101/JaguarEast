import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmeditarmetodoPage } from './admeditarmetodo.page';

describe('AdmeditarmetodoPage', () => {
  let component: AdmeditarmetodoPage;
  let fixture: ComponentFixture<AdmeditarmetodoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmeditarmetodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
