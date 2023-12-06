import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmPersonalDetallePage } from './admpersonaldetalle.page';

const routes: Routes = [
   {
    path: '',
    component: AdmPersonalDetallePage, // Asegúrate de que la referencia sea correcta
  },
  {
        path: 'admpersonal',
        loadChildren: () => import('../admpersonal/admpersonal.module').then(m => m.AdmPersonalPageModule)
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmPersonalDetallePageRoutingModule {}
