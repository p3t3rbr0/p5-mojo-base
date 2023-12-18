import m from 'mithril';
import 'bootstrap.native';
import "../style/style.css";

import { I18N } from './i18n';
import { Router } from './router';
import { RootComponent } from './components/common/root';


let App = {
    init: {},
    i18n: I18N,
};

App.i18n.getLocales();

App.start = () => {
    m.request({
        method: 'GET',
        url: '/admin/api/v1/init',
        withCredentials: true,
    }).then(res => {
        App.init = res;
        m.mount(document.body, RootComponent);
        Router.route();
    }).catch(err => {
        console.log(`Initialization error: ${JSON.stringify(err)}`);
    });
};

App.start();

export { App };
