import { Routes } from '@angular/router';
import { UserRegistrationForm } from './components/user-registration-form/user-registration-form';
import { ViewAllUsers } from './components/view-all-users/view-all-users';

export const routes: Routes = [
    {
        path: 'registerUser/:id',
        component: UserRegistrationForm
    }, {
        path: 'registerUser',
        component: UserRegistrationForm
    }, {
        path: 'viewUsers',
        component: ViewAllUsers
    },
    {
        path: '',
        component: ViewAllUsers
    }

];
