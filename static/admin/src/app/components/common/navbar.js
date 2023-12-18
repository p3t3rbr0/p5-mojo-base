import m from 'mithril';

import { I18N } from '../../i18n';

function NavbarComponent() {
    return {
        view: function(vnode) {
            return m('nav', {class: 'navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow'}, [
                m('a', {class: 'navbar-brand col-sm-3 col-md-2 mr-0', href: '#/index'}, vnode.attrs.app_name),
                m('button', {
                    class: 'navbar-toggler',
                    type: 'button',
                    'data-toggle': 'collapse',
                    'data-target': '#navbarSupportedContent'
                }, [
                    m('i', {class: 'fas fa-list-ul navbar-toggler-icon'})
                ]),
                m('ul', {class: 'nav ml-auto'}, [
                    m('li', {class: 'nav-item dropdown'}, [
                        m('a', {
                            id: 'navbarDropdown',
                            class: 'nav-link dropdown-toggle',
                            'data-toggle': 'dropdown',
                            href: '#',
                            'role': 'button',
                        }, 'Test'),
                        m('div', {class: 'dropdown-menu', 'aria-labelledby': 'navbarDropdown'}, [
                            m('a', {class: 'dropdown-item', href: '#'}, I18N.t('admin.navbar.profile')),
                            m('div', {class: 'dropdown-divider'}),
                            m('a', {class: 'dropdown-item', href: '#'}, I18N.t('admin.navbar.logout')),
                        ])
                    ])
                ])
            ]);
        }
    };
}

export { NavbarComponent };
