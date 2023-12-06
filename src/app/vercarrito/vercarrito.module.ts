import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VercarritoPageRoutingModule } from './vercarrito-routing.module';

import { VercarritoPage } from './vercarrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VercarritoPageRoutingModule
  ],
  declarations: [VercarritoPage]
})
export class VercarritoPageModule {}
