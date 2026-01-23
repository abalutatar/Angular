import { Routes } from '@angular/router';

import { BlogHomeComponent } from "./components/blog-home/blog-home";
import { BlogItemDetails } from './components/blog-item-details/blog-item-details';
export const routes: Routes = [
  {
    path: '',
    component: BlogHomeComponent,
  },
  { path: 'blog/detail/:id', component: BlogItemDetails },
];
