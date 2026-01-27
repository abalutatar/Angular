import { Routes } from '@angular/router';

import { HomeComponent } from "./components/home/home";
import { BlogHomeComponent } from "./components/blog-home/blog-home";
import { BlogItemDetailsComponent } from './components/blog-item-details/blog-item-details';
import { FavoritesListComponent } from "./components/favorites-list/favorites-list";
import { authGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
export const routes: Routes = [
  { path: 'blog', component: BlogHomeComponent, canActivate: [authGuard] },
  { path: '', component: HomeComponent },
  { path: 'blog/detail/:id', component: BlogItemDetailsComponent },
  { path: 'favorites', component: FavoritesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
