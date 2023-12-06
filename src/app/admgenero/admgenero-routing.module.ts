import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmGeneroPage } from './admgenero.page';

const routes: Routes = [
  {
    path: '',
    component: AdmGeneroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneroPageRoutingModule {}
