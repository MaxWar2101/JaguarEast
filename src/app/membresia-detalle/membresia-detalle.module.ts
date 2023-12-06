import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MembresiaDetallePageRoutingModule } from './membresia-detalle-routing.module';

import { MembresiaDetallePage } from './membresia-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MembresiaDetallePageRoutingModule
  ],
  declarations: [MembresiaDetallePage]
})
export class MembresiaDetallePageModule {}
