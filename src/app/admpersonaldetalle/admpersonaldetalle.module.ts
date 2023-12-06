import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmPersonalDetallePageRoutingModule } from './admpersonaldetalle-routing.module';

import { AdmPersonalDetallePage } from './admpersonaldetalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmPersonalDetallePageRoutingModule
  ],
  declarations: [AdmPersonalDetallePage]
})
export class AdmPersonalDetallePageModule {}
