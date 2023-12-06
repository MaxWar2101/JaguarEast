import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { PerfilEditarPage } from './perfileditar.page';
import { PerfilEditarPageRoutingModule } from './perfileditar-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    PerfilEditarPageRoutingModule
  ],
  declarations: [PerfilEditarPage]
})
export class PerfilEditarPageModule {}
