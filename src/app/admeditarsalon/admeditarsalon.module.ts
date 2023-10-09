import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmeditarsalonPageRoutingModule } from './admeditarsalon-routing.module';

import { AdmeditarsalonPage } from './admeditarsalon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmeditarsalonPageRoutingModule
  ],
  declarations: [AdmeditarsalonPage]
})
export class AdmeditarsalonPageModule {}
