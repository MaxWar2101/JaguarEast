import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmPersonalCrearPage } from './admpersonalcrear.page';

const routes: Routes = [
  {
    path: '',
    component: AdmPersonalCrearPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmPersonalCrearPageRoutingModule {}
