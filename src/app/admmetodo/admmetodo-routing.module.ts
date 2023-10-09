import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmmetodoPage } from './admmetodo.page';

const routes: Routes = [
  {
    path: '',
    component: AdmmetodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmmetodoPageRoutingModule {}
