import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'categories',
    loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent),
    title: 'Categories',
  },
];
