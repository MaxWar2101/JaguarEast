import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmPersonalMemPage } from './adm-personal-mem.page';

const routes: Routes = [
  {
    path: '',
    component: AdmPersonalMemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmPersonalMemPageRoutingModule {}
