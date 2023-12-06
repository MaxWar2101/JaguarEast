import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdmPersonalPage } from './admpersonal.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AdmPersonalPageRoutingModule } from './admpersonal-routing.module';
import { ModalController } from '@ionic/angular';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { MenuModule } from '../components/menu/menu.module';



@NgModule({
  imports: [
    PaginacionModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AdmPersonalPageRoutingModule,
    MenuModule,
  ],
  declarations: [AdmPersonalPage],
  providers: [ModalController] 
})
export class AdmPersonalPageModule {}
