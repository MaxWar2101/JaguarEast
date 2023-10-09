import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmsalonPage } from './admsalon.page';

const routes: Routes = [
  {
    path: '',
    component: AdmsalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmsalonPageRoutingModule {}
