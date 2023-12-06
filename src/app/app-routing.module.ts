import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'admvercarrito/:id',
    loadChildren: () => import('./admvercarrito/admvercarrito.module').then(m => m.AdmvercarritoPageModule)
  },
  {
    path: 'admcarrito',
    loadChildren: () => import('./admcarrito/admcarrito.module').then(m => m.AdmcarritoPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoPageModule)
  },
  {
    path: 'admvercarrito',
    loadChildren: () => import('./admvercarrito/admvercarrito.module').then(m => m.AdmvercarritoPageModule)
  },
  {
    path: 'admsalon',
    loadChildren: () => import('./admsalon/admsalon.module').then(m => m.AdmsalonPageModule)
  },
  {
    path: 'admeditarsalon',
    loadChildren: () => import('./admeditarsalon/admeditarsalon.module').then(m => m.AdmeditarsalonPageModule)
  },
  {
    path: 'admeditarsalon/:id',
    loadChildren: () => import('./admeditarsalon/admeditarsalon.module').then(m => m.AdmeditarsalonPageModule)
  },
  {
    path: 'admnuevosalon',
    loadChildren: () => import('./admnuevosalon/admnuevosalon.module').then(m => m.AdmnuevosalonPageModule)
  },
  {
    path: 'admnuevosalon/:id',
    loadChildren: () => import('./admnuevosalon/admnuevosalon.module').then(m => m.AdmnuevosalonPageModule)
  },
  {
    path: 'admmetodo',
    loadChildren: () => import('./admmetodo/admmetodo.module').then(m => m.AdmmetodoPageModule)
  },
  {
    path: 'admeditarmetodo',
    loadChildren: () => import('./admeditarmetodo/admeditarmetodo.module').then(m => m.AdmeditarmetodoPageModule)
  },
  {
    path: 'admeditarmetodo/:id',
    loadChildren: () => import('./admeditarmetodo/admeditarmetodo.module').then(m => m.AdmeditarmetodoPageModule)
  },
  {
    path: 'admnuevometodo',
    loadChildren: () => import('./admnuevometodo/admnuevometodo.module').then(m => m.AdmnuevometodoPageModule)
  }, 
  {
    path: 'admnuevometodo/:id',
    loadChildren: () => import('./admnuevometodo/admnuevometodo.module').then(m => m.AdmnuevometodoPageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./detalle/detalle.module').then(m => m.DetallePageModule)
  },
  {
    path: 'detalle/:id',
    loadChildren: () => import('./detalle/detalle.module').then(m => m.DetallePageModule)
  },
  {
    path: 'vercarrito',
    loadChildren: () => import('./vercarrito/vercarrito.module').then(m => m.VercarritoPageModule)
  },
  {
    path: 'adm-ver-membresia',
    loadChildren: () => import('./adm-ver-membresia/adm-ver-membresia.module').then( m => m.AdmVerMembresiaPageModule)
  },
  {
    path: 'adm-crear-membresia',
    loadChildren: () => import('./adm-crear-membresia/adm-crear-membresia.module').then( m => m.AdmCrearMembresiaPageModule)
  },
  {
    path: 'membresia',
    loadChildren: () => import('./membresia/membresia.module').then( m => m.MembresiaPageModule)
  },
  {
    path: 'membresia-detalle',
    loadChildren: () => import('./membresia-detalle/membresia-detalle.module').then( m => m.MembresiaDetallePageModule)
  },
  {
    path: 'membresia-detalle/:id',
    loadChildren: () => import('./membresia-detalle/membresia-detalle.module').then( m => m.MembresiaDetallePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admgenero',
    loadChildren: () => import('./admgenero/admgenero.module').then( m => m.GeneroPageModule)
  },
  {
    path: 'admgenerocrear',
    loadChildren: () => import('./admgenerocrear/admgenerocrear.module').then( m => m.AdmGeneroCrearPageModule)
  },
  {
    path: 'admgenerodetalle',
    loadChildren: () => import('./admgenerodetalle/admgenerodetalle.module').then( m => m.AdmGeneroDetallePageModule)
  },
  {
    path: 'admgenerodetalle/:id',
    loadChildren: () => import('./admgenerodetalle/admgenerodetalle.module').then( m => m.AdmGeneroDetallePageModule)
  },
  {
    path: 'admpersonal',
    loadChildren: () => import('./admpersonal/admpersonal.module').then( m => m.AdmPersonalPageModule)
  },
  {
    path: 'admpersonalcrear',
    loadChildren: () => import('./admpersonalcrear/admpersonalcrear.module').then( m => m.AdmPersonalCrearPageModule)
  },
  {
    path: 'admpersonaldetalle',
    loadChildren: () => import('./admpersonaldetalle/admpersonaldetalle.module').then( m => m.AdmPersonalDetallePageModule)
  },
  {
    path: 'admpersonaldetalle/:id',
    loadChildren: () => import('./admpersonaldetalle/admpersonaldetalle.module').then( m => m.AdmPersonalDetallePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'admpersonaleditar',
    loadChildren: () => import('./admpersonaleditar/admpersonaleditar.module').then( m => m.AdmPersonalEditarPageModule)
  },
  {
    path: 'admpersonaleditar/:per_id',
    loadChildren: () => import('./admpersonaleditar/admpersonaleditar.module').then( m => m.AdmPersonalEditarPageModule)
  },
  {
    path: 'admgeneroeditar',
    loadChildren: () => import('./admgeneroeditar/admgeneroeditar.module').then( m => m.AdmGeneroEditarPageModule)
  },
  {
    path: 'admgeneroeditar/:gen_id',
    loadChildren: () => import('./admgeneroeditar/admgeneroeditar.module').then( m => m.AdmGeneroEditarPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'perfileditar',
    loadChildren: () => import('./perfileditar/perfileditar.module').then( m => m.PerfilEditarPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'perfileditar/:per_id',
    loadChildren: () => import('./perfileditar/perfileditar.module').then( m => m.PerfilEditarPageModule)
  },
  {
    path: 'adm-personal-mem',     
    loadChildren: () => import('./adm-personal-mem/adm-personal-mem.module').then( m => m.AdmPersonalMemPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
