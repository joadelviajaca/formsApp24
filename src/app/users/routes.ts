import { Routes } from "@angular/router";
import { ListUsersComponent } from "./list-users/list-users.component";


export const routes: Routes = [
    {
        path: 'list',
        component: ListUsersComponent
    },
    {
        path: '**',
        redirectTo: 'list'
    }
]