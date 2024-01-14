import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'owners',
    loadComponent: () => import('./components/user-list/user-list.component').then(c => c.UserListComponent),
    title: 'Owners',
  },
  {
    path: 'fields',
    loadComponent: () => import('./components/field-list/field-list.component').then(c => c.FieldListComponent),
    title: 'Fields',
  },
  {
    path: 'categories',
    loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent),
    title: 'Categories',
  },
];
