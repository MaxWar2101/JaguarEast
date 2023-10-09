import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmnuevosalonPage } from './admnuevosalon.page';

describe('AdmnuevosalonPage', () => {
  let component: AdmnuevosalonPage;
  let fixture: ComponentFixture<AdmnuevosalonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmnuevosalonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
