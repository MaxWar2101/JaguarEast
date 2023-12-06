import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmCrearMembresiaPageRoutingModule } from './adm-crear-membresia-routing.module';

import { AdmCrearMembresiaPage } from './adm-crear-membresia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmCrearMembresiaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdmCrearMembresiaPage]
})
export class AdmCrearMembresiaPageModule {}
