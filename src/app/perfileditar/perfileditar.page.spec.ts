import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { PerfilEditarPage } from './perfileditar.page';

describe('PerfilEditarPage', () => {
  let component: PerfilEditarPage;
  let fixture: ComponentFixture<PerfilEditarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilEditarPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilEditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
