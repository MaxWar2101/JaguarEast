import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'admcarrito',
        loadChildren: () => import('../admcarrito/admcarrito.module').then(m => m.AdmcarritoPageModule)
      },

      {
        path: 'admvercarrito',
        loadChildren: () => import('../admvercarrito/admvercarrito.module').then(m => m.AdmvercarritoPageModule)
      },
      {
        path: 'admsalon',
        loadChildren: () => import('../admsalon/admsalon.module').then(m => m.AdmsalonPageModule)
      },

      {
        path: 'admeditarsalon',
        loadChildren: () => import('../admeditarsalon/admeditarsalon.module').then(m => m.AdmeditarsalonPageModule)
      },

      {
        path: 'admnuevosalon',
        loadChildren: () => import('../admnuevosalon/admnuevosalon.module').then(m => m.AdmnuevosalonPageModule)
      },

      {
        path: 'admmetodo',
        loadChildren: () => import('../admmetodo/admmetodo.module').then(m => m.AdmmetodoPageModule)
      },
      {
        path: 'admnuevometodo',
        loadChildren: () => import('../admnuevometodo/admnuevometodo.module').then(m => m.AdmnuevometodoPageModule)
      },
      {
        path: 'carrito',
        loadChildren: () => import('../carrito/carrito.module').then(m => m.CarritoPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
