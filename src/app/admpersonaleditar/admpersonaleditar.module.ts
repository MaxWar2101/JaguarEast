import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AdmPersonalEditarPage } from './admpersonaleditar.page';
import { AdmPersonalEditarPageRoutingModule } from './admpersonaleditar-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    AdmPersonalEditarPageRoutingModule
  ],
  declarations: [AdmPersonalEditarPage]
})
export class AdmPersonalEditarPageModule {}
