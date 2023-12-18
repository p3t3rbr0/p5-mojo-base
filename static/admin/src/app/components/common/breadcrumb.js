import m from 'mithril';

import { I18N } from '../../i18n';

function BreadcrumbComponent() {
    return {
        view: function(vnode) {
            return m('nav', {'aria-label': 'breadcrumb'}, [
                m('ol', {class: 'breadcrumb'}, [
                    m('li', {class: 'breadcrumb-item'}, [
                        m('a', {href: '#!/index'}, I18N.t('admin.sidebar.dashboard'))
                    ]),
                    vnode.attrs.breadcrumbs.map(breadcrumb => {
                        if (breadcrumb.link) {
                            return m('li', {class: 'breadcrumb-item'}, [
                                m('a', {href: breadcrumb.link}, breadcrumb.title)
                            ]);
                        } else {
                            return m('li', {class: 'breadcrumb-item active', 'aria-current': 'page'}, breadcrumb.title);
                        }
                    })
                ])
            ]);
        }
    };
}

export { BreadcrumbComponent };
