import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmnuevosalonPageRoutingModule } from './admnuevosalon-routing.module';

import { AdmnuevosalonPage } from './admnuevosalon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmnuevosalonPageRoutingModule
  ],
  declarations: [AdmnuevosalonPage]
})
export class AdmnuevosalonPageModule {}
