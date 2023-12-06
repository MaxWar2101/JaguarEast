import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneroPageRoutingModule } from './admgenero-routing.module';
import { AdmGeneroPage } from './admgenero.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { MenuModule } from '../components/menu/menu.module';

@NgModule({
  imports: [
    PaginacionModule,
    CommonModule,
    FormsModule,
    IonicModule,
    GeneroPageRoutingModule,
    MenuModule,
  ],
  declarations: [AdmGeneroPage]
})
export class GeneroPageModule {}
