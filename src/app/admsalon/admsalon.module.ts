import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmsalonPageRoutingModule } from './admsalon-routing.module';

import { AdmsalonPage } from './admsalon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmsalonPageRoutingModule
  ],
  declarations: [AdmsalonPage]
})
export class AdmsalonPageModule {}
