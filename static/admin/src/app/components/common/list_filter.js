import m from 'mithril';

import { I18N } from '../../i18n';

function ListFilterComponent() {
    return {
        view: function() {
            return m('button', {class: 'btn btn-primary float-left mr-3 btn-filter'}, [
                m('i', {class: 'fas fa-filter'}),
                I18N.t('admin.common.filter_btn')
            ]);
        }
    };
}

export { ListFilterComponent };
