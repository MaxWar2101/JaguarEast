import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilEditarPage } from './perfileditar.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilEditarPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilEditarPageRoutingModule {}
