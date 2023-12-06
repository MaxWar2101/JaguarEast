import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmPersonalEditarPage } from './admpersonaleditar.page';

const routes: Routes = [
  {
    path: '',
    component: AdmPersonalEditarPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmPersonalEditarPageRoutingModule {}
