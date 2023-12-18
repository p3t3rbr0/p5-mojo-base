import m from 'mithril';

import { IndexComponent } from './components/index';
import { ChangelogComponent } from './components/changelog';
import { LoginComponent } from './components/auth/login';
import { UsersListComponent } from './components/users/list';
import { CreateOrEditUserComponent } from './components/users/createOrEdit';

let Router = {
    route() {
        const root = document.getElementById('main');

        m.route(root, '/', {
            '/': IndexComponent,
            '/login': LoginComponent,
            '/index': IndexComponent,
            '/changelog': ChangelogComponent,
            '/users': UsersListComponent,
            '/users/new': CreateOrEditUserComponent,
            '/users/:userId': CreateOrEditUserComponent
        });
    }
};

export { Router };
