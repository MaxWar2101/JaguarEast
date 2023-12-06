import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmsalonPageRoutingModule } from './admsalon-routing.module';

import { AdmsalonPage } from './admsalon.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { MenuModule } from '../components/menu/menu.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmsalonPageRoutingModule,
    PaginacionModule,
    MenuModule,
  ],
  declarations: [AdmsalonPage]
})
export class AdmsalonPageModule {}
