import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmeditarsalonPage } from './admeditarsalon.page';

const routes: Routes = [
  {
    path: '',
    component: AdmeditarsalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmeditarsalonPageRoutingModule {}
