import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmcarritoPageRoutingModule } from './admcarrito-routing.module';

import { AdmcarritoPage } from './admcarrito.page';
import { MenuModule } from '../components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmcarritoPageRoutingModule,
    MenuModule,

  ],
  declarations: [AdmcarritoPage]
})
export class AdmcarritoPageModule {}
