import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { jwtGuard } from './shared/guardians/jwt.guard';


export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/routes').then(mod => mod.routes)
  },
  {
    path: 'countries',
    loadComponent: () => import('./countries/countries.component').then(mod => mod.CountriesComponent)
  },
  {
    path: 'template',
    loadChildren: () => import('./template/routes').then(mod => mod.routes),
    canMatch: [jwtGuard]
  },
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/routes').then(mod => mod.routes)

  },
  {
    path: 'users',
    loadChildren: () => import('./users/routes').then(mod => mod.routes),
    canMatch: [jwtGuard]
  },
  {
    path: '',
    redirectTo: 'template/basicos',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
