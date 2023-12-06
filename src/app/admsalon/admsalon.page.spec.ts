import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AdmsalonPage } from './admsalon.page';

describe('AdmsalonPage', () => {
  let component: AdmsalonPage;
  let fixture: ComponentFixture<AdmsalonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdmsalonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
