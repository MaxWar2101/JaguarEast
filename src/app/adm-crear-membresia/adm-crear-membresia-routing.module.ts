import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmCrearMembresiaPage } from './adm-crear-membresia.page';

const routes: Routes = [
  {
    path: '',
    component: AdmCrearMembresiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmCrearMembresiaPageRoutingModule {}
