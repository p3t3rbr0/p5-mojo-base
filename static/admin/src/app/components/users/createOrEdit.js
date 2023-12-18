import m from 'mithril';

import { I18N } from '../../i18n';
import { BreadcrumbComponent } from '../common/breadcrumb';
import { SectionComponent } from '../common/section';
import { User } from '../../models/user';


function CreateNewUserCardHeader() {
    return {
        view: function(vnode) {
            const user = vnode.attrs.user;

            return m('div', {class: 'card-header'}, [
                m('i', {class: 'fas fa-users'}),
                m('span',
                  user
                  ? [m('span', ['Профиль пользователя ', m('strong', user.username)])]
                  : [m('span', 'Создание нового пользователя')]
                 )
            ]);
        }
    };
}

function CreateNewUserCardFooter() {
    return {
        view: function(vnode) {
            const user = vnode.attrs.user;

            return m('div', {class: 'card-footer'}, [
                m('div', {class: 'row'}, [
                    m('div', {class: 'col-12'}, [
                        m('a', {class: 'btn btn-secondary mr-3', href: '#/users', title: 'Назад к списку'}, [
                            m('i', {class: 'fas fa-chevron-left'})
                        ]),
                        m(
                            'button',
                            {
                                id: 'create-user-btn',
                                class: 'btn btn-success',
                                onclick: function() {
                                    let form = document.forms['create-or-edit'];
                                    let formData = new FormData(form);
                                    // _.extend(formData, {avatar: this.avatar});

                                    User.create(formData)
                                        .then(() => {
                                            console.log('OK');
                                            m.route.set('/users');
                                        })
                                        .catch(err => {
                                            if (err.responseText || err.statusText) {
                                                alert(err.responseText || err.statusText);
                                                return false;
                                            }

                                            Object.keys(err.response.errors).forEach(_ => {
                                                let error = err.response.errors[_][0];
                                                let invalid_field = form.elements.namedItem(_);
                                                invalid_field
                                                    .parentNode
                                                    .getElementsByClassName('invalid-feedback')[0]
                                                    .innerHTML = error;
                                                invalid_field.classList.toggle('is-invalid');
                                            });

                                            return false;
                                        });
                                }
                            },
                            [
                                m('i', {class: user ? 'fas fa-save' : 'fas fa-plus-circle'}),
                                m('span', user ? 'Сохранить' : 'Создать')
                            ]
                        ),
                        m('button', {id: 'delete-user-btn', class: 'btn btn-danger float-right'}, [
                            m('i', {class: 'fas fa-trash'}),
                            m('span', 'Удалить')
                        ]),
                    ])
                ])
            ]);
        }
    };
}

function CreateNewUserCardBody() {
    return {
        view: function(vnode) {
            const user = vnode.attrs.user;

            return m('div', {class: 'card-body'}, [
                m('form', {name: 'create-or-edit', novalidate: 'novalidate', autocomplete: 'off'}, [
                    m('div', {class: 'row'}, [
                        m('div', {class: 'col-3'}, [
                            m(
                                'img',
                                {
                                    src: user ? user.getAvatar() : User.DEFAULT_AVATAR,
                                    width: User.AVATAR_WIDTH,
                                    heigth: User.AVATAR_HEIGHT,
                                }
                            ),
                            m('div', {class: 'row mt-3'}),
                            m('div', {class: 'custom-file'}, [
                                m('input', {id: 'avatar', class: 'custom-file-input', type: 'file', name: 'avatar'}),
                                m('label', {class: 'custom-file-label', for: 'avatar'}, 'Файл с изображением'),
                                m('div', {class: 'invalid-feedback'})
                            ])
                        ]),
                        m('div', {class: 'col-9'}, [
                            m('div', {class: 'form-row'}, [
                                m('div', {class: 'form-group col-6'}, [
                                    m('label', {for: 'username'}, [
                                        m('sup', '*'),
                                        m('span', 'Username')
                                    ]),
                                    m(
                                        'input',
                                        {
                                            id: 'username',
                                            class: 'form-control',
                                            type: 'text',
                                            name: 'username',
                                            placeholder: 'Имя пользователя',
                                            autocomplete: 'off',
                                            value: user ? user.get('username') : ''
                                        }
                                    ),
                                    m('div', {class: 'invalid-feedback'})
                                ]),
                                m('div', {class: 'form-group col-6'}, [
                                    m('label', {for: 'email'}, [
                                        m('sup', '*'),
                                        m('span', 'E-mail')
                                    ]),
                                    m(
                                        'input',
                                        {
                                            id: 'email',
                                            class: 'form-control',
                                            type: 'text',
                                            name: 'email',
                                            placeholder: 'E-mail',
                                            autocomplete: 'off',
                                            value: user ? user.get('email') : ''
                                        }
                                    ),
                                    m('div', {class: 'invalid-feedback'})
                                ])
                            ]),
                            m('div', {class: 'form-row'}, [
                                m('div', {class: 'form-group col-6'}, [
                                    m('label', {for: 'first_name'}, 'Имя'),
                                    m(
                                        'input',
                                        {
                                            id: 'first_name',
                                            class: 'form-control',
                                            type: 'text',
                                            name: 'first_name',
                                            autocomplete: 'off',
                                            placeholder: 'Имя'
                                        }
                                    ),
                                    m('div', {class: 'invalid-feedback'})
                                ]),
                                m('div', {class: 'form-group col-6'}, [
                                    m('label', {for: 'last_name'}, 'Фамилия'),
                                    m(
                                        'input',
                                        {
                                            id: 'last_name',
                                            class: 'form-control',
                                            type: 'text',
                                            name: 'last_name',
                                            autocomplete: 'off',
                                            placeholder: 'Фамилия'
                                        }
                                    ),
                                    m('div', {class: 'invalid-feedback'})
                                ])
                            ]),
                            m('div', {class: 'form-row'}, [
                                m('div', {class: 'form-group col-6'}, [
                                    m('label', {for: 'password'}, 'Пароль'),
                                    m(
                                        'input',
                                        {
                                            id: 'password',
                                            class: 'form-control',
                                            type: 'password',
                                            name: 'password',
                                            autocomplete: 'off',
                                            placeholder: 'Пароль'
                                        }
                                    ),
                                    m('div', {class: 'invalid-feedback'})
                                ]),
                                m('div', {class: 'form-group col-6'}, [
                                    m('label', {for: 'password_confirm'}, 'Подтверждение пароля'),
                                    m(
                                        'input',
                                        {
                                            id: 'password_confirm',
                                            class: 'form-control',
                                            type: 'password',
                                            name: 'password_confirm',
                                            autocomplete: 'off',
                                            placeholder: 'Подтверждение пароля'
                                        }
                                    ),
                                    m('div', {class: 'invalid-feedback'})
                                ])
                            ]),
                            m('div', {class: 'form-group'}, [
                                m('div', {class: 'custom-control custom-checkbox'}, [
                                    m(
                                        'input',
                                        {
                                            id: 'is_activated',
                                            class: 'custom-control-input',
                                            type: 'checkbox',
                                            name: 'is_activated'
                                        }
                                    ),
                                    m('label', {class: 'custom-control-label', for: 'is_activated'}, 'Активирован')
                                ]),
                                m('div', {class: 'custom-control custom-checkbox'}, [
                                    m(
                                        'input',
                                        {
                                            id: 'is_admin',
                                            class: 'custom-control-input',
                                            type: 'checkbox',
                                            name: 'is_admin'}
                                    ),
                                    m('label', {class: 'custom-control-label', for: 'is_admin'}, 'Администратор')
                                ])
                            ])
                        ])
                    ])
                ])
            ]);
        }
    };
}

function CreateOrEditUserComponent() {
    return {
        oninit: function() {
            this.user = null;
            const userId = m.route.param('userId');

            if (userId)
                User.fetch(userId).then(user => {
                    this.user = user;
                }).catch(err => console.log(err));
        },
        view: function() {
            return m('div', [
                m(
                    BreadcrumbComponent,
                    {
                        breadcrumbs: [
                            {link: '#/users', title: I18N.t('admin.users.list.title')},
                            {title: I18N.t('admin.users.new.title')}
                        ]
                    }
                ),
                m(
                    SectionComponent,
                    {
                        title: this.user
                            ? [m('span', ['Профиль пользователя ', this.user.username])]
                            : I18N.t('admin.users.new.breadcrumb')
                    }
                ),
                m('div', {class: 'row'}, [
                    m('div', {class: 'col'}, [
                        m('div', {class: 'card bg-light'}, [
                            m(CreateNewUserCardHeader, {user: this.user}),
                            m(CreateNewUserCardBody, {user: this.user}),
                            m(CreateNewUserCardFooter, {user: this.user})
                        ])
                    ])
                ]),
            ]);
        },
    };
}

export { CreateOrEditUserComponent };
