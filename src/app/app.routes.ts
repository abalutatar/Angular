import { Routes } from '@angular/router';

import { HomeComponent } from "./components/home/home";
import { BlogHomeComponent } from "./components/blog-home/blog-home";
import { BlogItemDetailsComponent } from './components/blog-item-details/blog-item-details';
import { FavoritesListComponent } from "./components/favorites-list/favorites-list";
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';

export const routes: Routes = [
   {
	path: 'blog',
	loadComponent: () => import('./components/blog-home/blog-home')
  	.then(m => m.BlogHomeComponent),
	canActivate: [authGuard]
  },

   {
	path: '',
	loadComponent: () => import('./components/home/home')
  	.then(m => m.HomeComponent)
  },

   {
	path: 'blog/detail/:id',
	loadComponent: () => import('./components/blog-item-details/blog-item-details')
  	.then(m => m.BlogItemDetailsComponent)
  },

  { path: 'favorites', component: FavoritesListComponent },
  {
	path: 'login',
	loadComponent: () => import('./components/login/login')
  	.then(m => m.LoginComponent)
  },
  {
	path: 'signup',
	loadComponent: () => import('./components/signup/signup')
  	.then(m => m.SignupComponent)
  }

];
