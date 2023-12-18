import m from 'mithril';

var I18N = {
    _i18n: {},

    t(path) {
        var parts = path.split('.');
        var result = this._i18n;

        for(var i = 0; i < parts.length; i++){
            if(typeof (result[parts[i]]) == 'undefined') return '';
            result = result[parts[i]];
        }

        return result;
    },

    getLocales() {
        return m.request({
            method: 'GET',
            url: '/locales',
            withCredentials: true,
        }).then( resp => {
            this._i18n = resp;
        }).catch( err => {
            console.log('[ERROR] get_locale: ', err);
        });
    },
};

export { I18N };
