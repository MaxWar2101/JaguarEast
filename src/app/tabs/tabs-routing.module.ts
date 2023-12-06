import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
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
        path: 'admnuevosalon/:id',
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
        path: 'detalle',
        loadChildren: () => import('../detalle/detalle.module').then(m => m.DetallePageModule)
      },
      {
        path: 'adm-ver-membresia',
        loadChildren: () => import('../adm-ver-membresia/adm-ver-membresia.module').then(m => m.AdmVerMembresiaPageModule)
      },
      {
        path: 'adm-crear-membresia/:id',
        loadChildren: () => import('../adm-crear-membresia/adm-crear-membresia.module').then(m => m.AdmCrearMembresiaPageModule)
      },
      {
        path: 'admpersonal',
        loadChildren: () => import('../admpersonal/admpersonal.module').then(m => m.AdmPersonalPageModule)
      },
      {
        path: 'admgenero',
        loadChildren: () => import('../admgenero/admgenero.module').then(m => m.GeneroPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'adm-personal-mem',
        loadChildren: () => import('../adm-personal-mem/adm-personal-mem.module').then(m => m.AdmPersonalMemPageModule)
      },

      {
        path: '',
        redirectTo: '/admcarrito',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admcarrito',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
