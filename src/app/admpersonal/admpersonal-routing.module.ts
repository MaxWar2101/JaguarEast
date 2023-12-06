import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmPersonalPage } from './admpersonal.page'; 
import { AdmPersonalCrearPage } from '../admpersonalcrear/admpersonalcrear.page';
import { AdmPersonalEditarPage } from '../admpersonaleditar/admpersonaleditar.page';


const routes: Routes = [
  {
    path: '',
    component: AdmPersonalPage,
  },
  {
    path: 'admpersonalcrear',
    component: AdmPersonalCrearPage,
  },
  {
    path: 'admpersonaleditar',
    component: AdmPersonalEditarPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmPersonalPageRoutingModule {}
