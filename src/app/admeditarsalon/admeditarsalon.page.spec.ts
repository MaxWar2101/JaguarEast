import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmeditarsalonPage } from './admeditarsalon.page';

describe('AdmeditarsalonPage', () => {
  let component: AdmeditarsalonPage;
  let fixture: ComponentFixture<AdmeditarsalonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmeditarsalonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
