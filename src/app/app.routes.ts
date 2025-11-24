import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { SiteCreation } from './pages/site-creation/site-creation';
import { provideRouter, withViewTransitions } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'contact', component: Contact },
  { path: 'site-creation', component: SiteCreation },
];
