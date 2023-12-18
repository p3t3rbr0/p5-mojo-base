import m from 'mithril';

import { I18N } from '../../i18n';
import { Users } from '../../collections/users';
import { BreadcrumbComponent } from '../common/breadcrumb';
import { ListFilterComponent } from '../common/list_filter';
import { ListSearchComponent } from '../common/list_search';
import { PaginatorComponent } from '../common/paginator';
import { SectionComponent } from '../common/section';


function UsersListTableComponent() {
    return {
        view: function(vnode) {
            return m('table', {class: 'table table-striped mt-3'}, [
                m('thead', {class: 'thead-dark'}, [
                    m('tr', [
                        m('th', {scope: 'col'}, 'id'),
                        m('th', {scope: 'col'}, I18N.t('admin.users.list.avatar')),
                        m('th', {scope: 'col'}, I18N.t('admin.users.list.username')),
                        m('th', {scope: 'col'}, I18N.t('admin.users.list.email')),
                        m('th', {scope: 'col'}, I18N.t('admin.users.list.created')),
                        m('th', {class: 'text-center', scope: 'col'}, I18N.t('admin.users.list.is_activated')),
                        m('th', {class: 'text-center', scope: 'col'}, I18N.t('admin.users.list.is_admin')),
                    ])
                ]),
                m('tbody', vnode.attrs.users.map(user => {
                    const is_activated_el = user.is_activated
                                          ? m('i', {class: 'fas fa-check-circle text-success'})
                                          : m('i', {class: 'fas fa-minus-circle text-danger'});
                    const is_admin_el = user.is_admin
                                      ? m('i', {class: 'fas fa-check-circle text-success'})
                                      : m('i', {class: 'fas fa-minus-circle text-danger'});
                    return m('tr', [
                        m('th', {scope: 'row'}, [
                            m('a', {href: '#/users/' + user.id}, user.id)
                        ]),
                        m('td', [
                            m('img', {src: user.getAvatarMini(), width: '24', heigth: '24'})
                        ]),
                        m('td', [
                            m('a', {href: '#/users/' + user.id}, user.username)
                        ]),
                        m('td', [
                            m('a', {href: '#/users/' + user.id}, user.email)
                        ]),
                        m('td', user.created),
                        m('td', {class: 'text-center'}, is_activated_el),
                        m('td', {class: 'text-center'}, is_admin_el),
                    ]);
                }))
            ]);
        }
    };
}

function UsersListComponent() {
    return {
        oninit: function() {
            this.users = [];
            const usersCollection = new Users();

            usersCollection.fetch().then(users => {
                this.users = users;
            }).catch(err => console.log(err));
        },
        view: function() {
            return m('div', [
                m(BreadcrumbComponent, {breadcrumbs: [{title: I18N.t('admin.users.list.title')}]}),
                m(SectionComponent, {title: I18N.t('admin.users.list.title')}),
                m('div', {class: 'row'}, [
                    m('div', {class: 'col-6'}, [
                        m(ListFilterComponent),
                        m(ListSearchComponent),
                    ]),
                    m('div', {class: 'col-6'}, [
                        m('a', {class: 'btn btn-success float-right', href: '#/users/new'}, [
                            m('i', {class: 'fas fa-plus'}),
                            I18N.t('admin.users.list.add_user')
                        ]),
                    ]),
                    m('div', {class: 'clearfix'})
                ]),
                m(UsersListTableComponent, {users: this.users}),
                m(PaginatorComponent, {
                    pages: [
                        {link: '#1', title: '1'},
                        {link: '#3', title: '3'},
                        {link: '#3', title: '3'},
                    ]
                }),
            ]);
        },
    };
}

export { UsersListComponent };
