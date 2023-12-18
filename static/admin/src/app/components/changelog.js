import m from 'mithril';

import { I18N } from '../i18n';
import { BreadcrumbComponent } from './common/breadcrumb';

var ChangelogModel = [
    {
        version: 'v0.1.0',
        date: '[2019-10-01]',
        changes: ['First version']
    }
];

function ChangelogComponent() {
    return {
        view: function() {
            return m('div', [
                m(BreadcrumbComponent, {breadcrumbs: [{title: I18N.t('admin.index.changelog')}]}),
                m('h3', I18N.t('admin.index.changelog')),
                m('div', {class: 'row mt-3'}),
                m('ul', ChangelogModel.map(changelogItem => {
                    return m('li', changelogItem.version + ' ' + changelogItem.date, [
                        m('ul',  changelogItem.changes.map(change => {
                            return m('li', change);
                        }))
                    ]);
                })),
                m('hr')
            ]);
        }
    };
}

export { ChangelogComponent };
