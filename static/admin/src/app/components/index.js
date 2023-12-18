import m from 'mithril';

import { App } from '../index';
import { I18N } from '../i18n';

function IndexComponent() {
    return {
        oninit: function() {},
        view: function() {
            return m('div', {class: 'row'}, [
                m('div', {class: 'col-md-9'}, [
                    m('div.jumbotron', [
                        m('div', {class: 'row'}, [
                            m('div', {class: 'col-md-3'}, [
                                m('img', {src: '/admin/dist/img/logo.png', alt: 'base-app-logo', width: 170})
                            ]),
                            m('div', {class: 'col-md-9 pl-0'}, [
                                m('h1', App.init.app_name, [
                                    m('span', {class: 'badge badge-secondary ml-2'}, App.init.versions.app)
                                ]),
                                m('p', {class: 'lead'}, I18N.t('admin.index.title')),
                                m('p', I18N.t('admin.index.has_questions'), [
                                    m('a', {href: '#/feedback'}, ' ' + I18N.t('admin.index.feedback_form'))
                                ])
                            ]),
                        ]),
                        m('hr'),
                        m('a', {class: 'btn btn-primary btn-lg', href: '#!/changelog', role: 'button'}, [
                            m('i', {class: 'fas fa-list-ul'}),
                            I18N.t('admin.index.changelog')
                        ])
                    ])
                ])
            ]);
        }
    };
}

export { IndexComponent };
