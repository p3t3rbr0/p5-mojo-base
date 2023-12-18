import m from 'mithril';

import { I18N } from '../../i18n';

function ListSearchComponent() {
    return {
        view: function() {
            return m('input', {
                type: 'text',
                class: 'col-6 form-control',
                placeholder: I18N.t('admin.common.search_input'),
            });
        }
    };
}

export { ListSearchComponent };
