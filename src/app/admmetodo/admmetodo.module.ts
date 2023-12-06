import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmmetodoPageRoutingModule } from './admmetodo-routing.module';

import { AdmmetodoPage } from './admmetodo.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { MenuModule } from '../components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmmetodoPageRoutingModule,
    PaginacionModule,
    MenuModule,
  ],
  declarations: [AdmmetodoPage]
})
export class AdmmetodoPageModule {}
