import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AdmGeneroDetallePageRoutingModule } from './admgenerodetalle-routing.module';
import { AdmGeneroDetallePage } from './admgenerodetalle.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmGeneroDetallePageRoutingModule
  ],
  declarations: [AdmGeneroDetallePage]
})
export class AdmGeneroDetallePageModule {}
