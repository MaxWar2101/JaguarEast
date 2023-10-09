import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmnuevometodoPage } from './admnuevometodo.page';

describe('AdmnuevometodoPage', () => {
  let component: AdmnuevometodoPage;
  let fixture: ComponentFixture<AdmnuevometodoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmnuevometodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
