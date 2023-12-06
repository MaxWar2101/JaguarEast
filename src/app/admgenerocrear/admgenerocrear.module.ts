import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmGeneroCrearPageRoutingModule } from './admgenerocrear-routing.module';

import { AdmGeneroCrearPage } from './admgenerocrear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmGeneroCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdmGeneroCrearPage]
})
export class AdmGeneroCrearPageModule {}
