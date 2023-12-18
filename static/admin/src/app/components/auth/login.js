import m from 'mithril';

// import I18N from '../../i18n.js';

function LoginComponent() {
    return {
        view: function() {
            return m('form', {class: 'form-signin'}, [
                m('img', {
                    class: 'mb-4',
                    src: '/docs/4.4/assets/brand/bootstrap-solid.svg',
                    alt: '',
                    width: 72,
                    height: 72
                }),
                m('h1', {class: 'h3 mb-3 font-weight-normal'}, 'Please sign in'),
                m('label', {for: 'inputEmail', class: 'sr-only'}, 'Email address'),
                m('input', {
                    type: 'email',
                    id: 'inputEmail',
                    class: 'form-control',
                    'placeholder': 'Email address',
                    required: 'true',
                    autofocus: 'true'
                }),
                m('label', {for: 'inputPassword', class: 'sr-only'}, 'Password'),
                m('input', {
                    type: 'password',
                    'id': 'inputPassword',
                    class: 'form-control',
                    placeholder: 'Password',
                    required: 'true'
                }),
                m('div', {class: 'checkbox mb-3'}, [
                    m('label', [
                        m('input', {type: 'checkbox', value: 'remember-me'}),
                        m.trust(' Remember me')
                    ])
                ]),
                m('button', {class: 'btn btn-lg btn-primary btn-block', type: 'submit'}, 'Sign in'),
                m('p', {class: 'mt-5 mb-3 text-muted'}, m.trust('&copy; 2017-2019'))
            ]);
        }
    };
}

export { LoginComponent };
