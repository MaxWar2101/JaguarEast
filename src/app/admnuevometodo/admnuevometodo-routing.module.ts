import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmnuevometodoPage } from './admnuevometodo.page';

const routes: Routes = [
  {
    path: '',
    component: AdmnuevometodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmnuevometodoPageRoutingModule {}
