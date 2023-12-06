import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MembresiaDetallePage } from './membresia-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MembresiaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembresiaDetallePageRoutingModule {}
