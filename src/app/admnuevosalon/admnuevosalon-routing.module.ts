import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmnuevosalonPage } from './admnuevosalon.page';

const routes: Routes = [
  {
    path: '',
    component: AdmnuevosalonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmnuevosalonPageRoutingModule {}
