import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmeditarmetodoPage } from './admeditarmetodo.page';

const routes: Routes = [
  {
    path: '',
    component: AdmeditarmetodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmeditarmetodoPageRoutingModule {}
