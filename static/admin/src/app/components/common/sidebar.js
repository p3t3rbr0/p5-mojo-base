import m from 'mithril';

import { I18N } from '../../i18n';

function SidebarComponent() {
    return {
        view: function(vnode) {
            const init = vnode.attrs.init;
            return m('nav', {class: 'col-md-2 d-none d-md-block bg-light sidebar'}, [
                m('div', {class: 'sidebar-sticky'}, [
                    m('ul', {class: 'nav flex-column'}, [
                        m('li', {class: 'nav-item'}, [
                            m('a', {class: 'nav-link', href: '#/index'}, [
                                m('i', {class: 'fas fa-cogs'}),
                                I18N.t('admin.sidebar.dashboard')
                            ])
                        ]),
                        m('li', {class: 'nav-item'}, [
                            m('a', {class: 'nav-link', href: '#/users'}, [
                                m('i', {class: 'fas fa-users'}),
                                I18N.t('admin.sidebar.users')
                            ])
                        ]),
                        m('li', {class: 'nav-item'}, [
                            m('a', {class: 'nav-link', href: '#/stats'}, [
                                m('i', {class: 'fas fa-chart-line'}),
                                I18N.t('admin.sidebar.stats')
                            ])
                        ])
                    ]),
                    m('div', {id: 'sidebar__footer', class: 'col-sm-12 text-center'}, [
                        init.app_name + ' ',
                        m('a', {href: '#!/changelog'}, init.versions.app),
                        ' | ',
                        init.versions.lang,
                        ' | ',
                        init.versions.framework,
                    ])
                ])
            ]);
        }
    };
}

export { SidebarComponent };
