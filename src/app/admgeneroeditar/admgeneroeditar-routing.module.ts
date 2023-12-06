import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmGeneroEditarPage } from './admgeneroeditar.page';

const routes: Routes = [
  {
    path: '',
    component: AdmGeneroEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmGeneroEditarPageRoutingModule {}
