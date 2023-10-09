import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmvercarritoPage } from './admvercarrito.page';

const routes: Routes = [
  {
    path: '',
    component: AdmvercarritoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmvercarritoPageRoutingModule {}
