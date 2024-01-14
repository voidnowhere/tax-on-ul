import {Routes} from '@angular/router';
import {loggedInGuard} from "./guards/logged-in.guard";
import {loggedOutGuard} from "./guards/logged-out.guard";

export const routes: Routes = [
  {
    path: 'owners',
    loadComponent: () => import('./components/user-list/user-list.component').then(c => c.UserListComponent),
    title: 'Owners',
    canActivate: [loggedInGuard],
  },
  {
    path: 'fields',
    loadComponent: () => import('./components/field-list/field-list.component').then(c => c.FieldListComponent),
    title: 'Fields',
    canActivate: [loggedInGuard],
  },
  {
    path: 'categories',
    loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent),
    title: 'Categories',
    canActivate: [loggedInGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent),
    title: 'Login',
    canActivate: [loggedOutGuard],
  },
];
