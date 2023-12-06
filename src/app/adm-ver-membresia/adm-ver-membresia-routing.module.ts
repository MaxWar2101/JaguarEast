import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmVerMembresiaPage } from './adm-ver-membresia.page';

const routes: Routes = [
  {
    path: '',
    component: AdmVerMembresiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmVerMembresiaPageRoutingModule {}
