import {Routes} from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";
import {FieldListComponent} from "./components/field-list/field-list.component";

export const routes: Routes = [
  {path: 'users/id', component: UserListComponent},
  {path: 'users', component: UserListComponent},
  {path: 'fields/id', component: FieldListComponent},
  {path: 'fields', component: FieldListComponent},
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: '**', redirectTo: '/users', pathMatch: 'full'},
  {
    path: 'categories',
    loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent),
    title: 'Categories',
  },
];
