import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AdmPersonalPage } from './admpersonal.page';

describe('AdmPersonalPage', () => {
  let component: AdmPersonalPage;
  let fixture: ComponentFixture<AdmPersonalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmPersonalPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
