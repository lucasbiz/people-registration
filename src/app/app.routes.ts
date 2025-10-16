import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { authRoutes } from './modules/auth/auth.routes';

export const routes: Routes = [
  { path: 'auth', children: authRoutes },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];
