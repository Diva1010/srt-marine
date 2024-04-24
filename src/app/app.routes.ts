import { Routes } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    {path: 'users', component: UserTableComponent},
    {path: 'users/:id', component: UserDetailsComponent}
];
