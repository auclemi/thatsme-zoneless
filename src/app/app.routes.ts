import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { provideRouter, withViewTransitions } from '@angular/router';
import { WpComponent } from './pages/wp-component/wp-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'developpement-front-end-angular', component: WpComponent },
  { path: 'audit-accessibility', component: WpComponent },
  { path: 'site-creation', component: WpComponent },
  { path: 'mise-en-conformite-accessibilite-wacg', component: WpComponent },
  { path: 'formation-action', component: WpComponent },
];
