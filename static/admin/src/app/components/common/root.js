import m from 'mithril';

import { App } from '../../index';
import { NavbarComponent } from './navbar';
import { SidebarComponent } from './sidebar';

function RootComponent() {
    return {
        view: function() {
            return m('', [
                m(NavbarComponent, {app_name: App.init.app_name}),
                m('div', {class: 'container-fluid'}, [
                    m('div', {class: 'row'}, [
                        m(SidebarComponent, {init: App.init}),
                        m('main', {id: 'main', role: 'main', class: 'col-md-9 ml-sm-auto col-lg-10 px-4'})
                    ]),
                ]),
            ]);
        }
    };
}

export { RootComponent };
