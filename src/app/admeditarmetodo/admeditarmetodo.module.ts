import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmeditarmetodoPageRoutingModule } from './admeditarmetodo-routing.module';

import { AdmeditarmetodoPage } from './admeditarmetodo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmeditarmetodoPageRoutingModule
  ],
  declarations: [AdmeditarmetodoPage]
})
export class AdmeditarmetodoPageModule {}
