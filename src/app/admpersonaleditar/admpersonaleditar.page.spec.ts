import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AdmPersonalEditarPage } from './admpersonaleditar.page';

describe('AdmPersonalEditarPage', () => {
  let component: AdmPersonalEditarPage;
  let fixture: ComponentFixture<AdmPersonalEditarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmPersonalEditarPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmPersonalEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
