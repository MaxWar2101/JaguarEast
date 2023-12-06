import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdmGeneroEditarPageRoutingModule } from './admgeneroeditar-routing.module';
import { AdmGeneroEditarPage } from './admgeneroeditar.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    AdmGeneroEditarPageRoutingModule
  ],
  declarations: [AdmGeneroEditarPage]
})
export class AdmGeneroEditarPageModule {}
