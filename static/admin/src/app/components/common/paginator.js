import m from 'mithril';

function PaginatorComponent() {
    return {
        view: function(vnode) {
            return m('nav', {'aria-label': 'paginator'}, [
                m('ul', {class: 'pagination'}, [
                    m('li', {class: 'page-item'}, [
                        m('a', {class: 'page-link', href: '#prev'}, [
                            m('span', {'aria-hidden': 'true'}, '«')
                        ])
                    ]),
                    vnode.attrs.pages.map(page => {
                        if (page.link) {
                            return m('li', {class: 'page-item'}, [
                                m('a', {class: 'page-link', href: page.link}, page.title)
                            ]);
                        } else {
                            return m('li', {class: 'page-item disabled'}, page.title);
                        }
                    }),
                    m('li', {class: 'page-item'}, [
                        m('a', {class: 'page-link', href: '#next'}, [
                            m('span', {'aria-hidden': 'true'}, '»')
                        ])
                    ]),
                ])
            ]);
        }
    };
}

export { PaginatorComponent };
