import { Routes } from '@angular/router';
import { UserRegistrationForm } from './user-registration-form/user-registration-form';
import { ViewAllUsers } from './view-all-users/view-all-users';

export const routes: Routes = [
    {
        path:'registerUser/:id',
        component:UserRegistrationForm
    },{
        path:'registerUser',
        component:UserRegistrationForm
    },{
        path:'viewUsers',
        component:ViewAllUsers
    },
    {
        path:'',
        component:UserRegistrationForm
    }
    
];
