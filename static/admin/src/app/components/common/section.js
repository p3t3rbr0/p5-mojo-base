import m from 'mithril';

function SectionComponent() {
    return {
        view: function(vnode) {
            return m('h3', vnode.attrs.title);
        }
    };
}

export { SectionComponent };
