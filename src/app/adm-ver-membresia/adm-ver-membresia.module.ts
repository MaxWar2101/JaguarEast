import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { IonicModule } from '@ionic/angular';

import { AdmVerMembresiaPageRoutingModule } from './adm-ver-membresia-routing.module';

import { AdmVerMembresiaPage } from './adm-ver-membresia.page';
import { MenuModule } from '../components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmVerMembresiaPageRoutingModule,
    PaginacionModule,
    MenuModule
  ],
  declarations: [AdmVerMembresiaPage]
})
export class AdmVerMembresiaPageModule {}
