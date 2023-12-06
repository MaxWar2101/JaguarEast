import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { IonicModule } from '@ionic/angular';

import { AdmPersonalMemPageRoutingModule } from './adm-personal-mem-routing.module';

import { AdmPersonalMemPage } from './adm-personal-mem.page';
import { MenuModule } from '../components/menu/menu.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginacionModule,
    AdmPersonalMemPageRoutingModule,
    MenuModule
  ],
  declarations: [AdmPersonalMemPage]
})
export class AdmPersonalMemPageModule {}
