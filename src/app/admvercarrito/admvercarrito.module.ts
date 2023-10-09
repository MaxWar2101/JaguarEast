import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmvercarritoPageRoutingModule } from './admvercarrito-routing.module';

import { AdmvercarritoPage } from './admvercarrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmvercarritoPageRoutingModule
  ],
  declarations: [AdmvercarritoPage]
})
export class AdmvercarritoPageModule {}
