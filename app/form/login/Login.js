/**
 * @class Triton.form.login.Login
 * @extends Ext.form.Panel
 * Este es el formulario de login para la aplication de triton
 */
Ext.define('Triton.form.login.Login', {
    extend: 'Ext.form.Panel',
    xtype: 'loginform',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password'
    ],
    config: {
        padding: '15 15 15 15',
        scrollable: null,
        items: [{
            xtype: 'fieldset',
            defaults: {
                required: true,
                clearIcon: true
            },
            items: [{
                xtype: 'textfield',
                name: 'clave',
                placeHolder: 'Clave'
            }, {
                xtype: 'passwordfield',
                name: 'password',
                placeHolder: 'Contraseña'
            }]
        }, {
            xtype: 'fieldset',
            items: [{
                    xtype: 'button',
                    ui: 'action',
                    text: 'Iniciar Sesión',
                    handler: function(btn) {
                        var form = btn.up('loginform');
                        form.fireEvent('loginuser', form);
                    }
                }
            ]

        }]
    }

});
