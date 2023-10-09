import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmmetodoPageRoutingModule } from './admmetodo-routing.module';

import { AdmmetodoPage } from './admmetodo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmmetodoPageRoutingModule
  ],
  declarations: [AdmmetodoPage]
})
export class AdmmetodoPageModule {}
