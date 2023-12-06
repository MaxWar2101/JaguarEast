import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmnuevometodoPageRoutingModule } from './admnuevometodo-routing.module';

import { AdmnuevometodoPage } from './admnuevometodo.page';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmnuevometodoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdmnuevometodoPage]
})
export class AdmnuevometodoPageModule {}
