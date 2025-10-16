import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { authRoutes } from './modules/auth/auth.routes';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', children: authRoutes },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];
