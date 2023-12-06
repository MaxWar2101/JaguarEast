import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmGeneroDetallePage } from './admgenerodetalle.page';

const routes: Routes = [
  {
    path: '',
    component: AdmGeneroDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmGeneroDetallePageRoutingModule {}
