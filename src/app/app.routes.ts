import { Routes } from '@angular/router';
import { Stats } from './stats/stats';
import { GameInvitesComponent } from './game-invites/game-invites';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register').then((m) => m.Register),
  },

   {
    path: 'game-invites',
    loadComponent: () => import('./game-invites/game-invites').then((m) => m.GameInvitesComponent),
  },

    {
    path: 'games/:id/invite',
    loadComponent: () => import('./game-invites/game-invite-players').then((m) => m.GameInvitePlayersComponent),
  },

  {
    path: 'games',
    loadComponent: () => import('./games/game-list/game-list').then((m) => m.GameList),
  },
  {
    path: 'games/new',
    loadComponent: () => import('./games/game-form/game-form').then((m) => m.GameForm),
  },

  {
    path: 'games/:id',
    loadComponent: () => import('./games/game-details/game-details').then((m) => m.GameDetails),
  },
  {
    path: 'games/edit/:id',
    loadComponent: () => import('./games/game-form/game-form').then((m) => m.GameForm),
  },

  {
    path: 'spirits',
    loadComponent: () => import('./spirits/spirits').then((m) => m.Spirits),
  },
  {
    path: 'spirits/:id',
    loadComponent: () => import('./spirits/spirit-details').then((m) => m.SpiritDetails),
  },

  {
    path: 'scenarios',
    loadComponent: () => import('./scenarios/scenarios').then((m) => m.Scenarios),
  },
  {
    path: 'scenarios/:id',
    loadComponent: () => import('./scenarios/scenario-details').then((m) => m.ScenarioDetails),
  },

  {
    path: 'adversaries',
    loadComponent: () => import('./adversaries/adversaries').then((m) => m.Adversaries),
  },

  {
    path: 'users',
    loadComponent: () => import('./users/users').then((m) => m.User),
  },

  {
    path: 'users/edit',
    loadComponent: () => import('./users/user-edit').then((m) => m.UserEdit),
  },

  {
    path: 'stats',
    loadComponent: () => import('./stats/stats').then((m) => m.Stats),
  },

 
];
