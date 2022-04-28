import { Routes } from '@angular/router';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    data: { title: 'iCust Apps' }
  }, {
    path: 'rule',
    loadChildren: () => import('./views/rule-filter/rule-filter.module').then(m => m.RuleFilterModule),
    data: { title: 'iCust Apps' }
  },{
    path: '**',
    redirectTo: 'home'
  }
];

