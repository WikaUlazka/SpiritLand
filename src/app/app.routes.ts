import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout';
import { Home } from './home/home';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      {
        path: 'games',
        loadComponent: () => import('./games/game-list/game-list').then((m) => m.GameList),
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register').then((m) => m.Register),
      },
      {
        path: 'login',
        loadComponent: () => import('./auth/login').then((m) => m.Login),
      },
    ],
  },
];
