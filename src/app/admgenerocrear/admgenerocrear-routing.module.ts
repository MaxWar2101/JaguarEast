import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmGeneroCrearPage } from './admgenerocrear.page';

const routes: Routes = [
  {
    path: '',
    component: AdmGeneroCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmGeneroCrearPageRoutingModule {}
