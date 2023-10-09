import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab3/:id',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },

  {
    path: 'admvercarrito/:id',
    loadChildren: () => import('./admvercarrito/admvercarrito.module').then(m => m.AdmvercarritoPageModule)
  },
  {
    path: 'admcarrito',
    loadChildren: () => import('./admcarrito/admcarrito.module').then( m => m.AdmcarritoPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'admvercarrito',
    loadChildren: () => import('./admvercarrito/admvercarrito.module').then( m => m.AdmvercarritoPageModule)
  },
  {
    path: 'admsalon',
    loadChildren: () => import('./admsalon/admsalon.module').then( m => m.AdmsalonPageModule)
  },
  {
    path: 'admeditarsalon',
    loadChildren: () => import('./admeditarsalon/admeditarsalon.module').then( m => m.AdmeditarsalonPageModule)
  },
  {
    path: 'admeditarsalon/:id',
    loadChildren: () => import('./admeditarsalon/admeditarsalon.module').then( m => m.AdmeditarsalonPageModule)
  },
  {
    path: 'admnuevosalon',
    loadChildren: () => import('./admnuevosalon/admnuevosalon.module').then( m => m.AdmnuevosalonPageModule)
  },
  {
    path: 'admmetodo',
    loadChildren: () => import('./admmetodo/admmetodo.module').then( m => m.AdmmetodoPageModule)
  },
  {
    path: 'admeditarmetodo',
    loadChildren: () => import('./admeditarmetodo/admeditarmetodo.module').then( m => m.AdmeditarmetodoPageModule)
  },
  {
    path: 'admeditarmetodo/:id',
    loadChildren: () => import('./admeditarmetodo/admeditarmetodo.module').then( m => m.AdmeditarmetodoPageModule)
  },
  {
    path: 'admnuevometodo',
    loadChildren: () => import('./admnuevometodo/admnuevometodo.module').then( m => m.AdmnuevometodoPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
