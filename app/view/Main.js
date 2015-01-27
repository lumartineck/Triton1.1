Ext.define('Triton.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: ['Ext.tab.Panel', 'Ext.Map', 'Triton.form.login.Login', 'Triton.form.cotizador.CotizadorForm', 'Triton.view.cartera.CarterasNavigationView', 'Ext.data.JsonP', 'Triton.view.localizacion.Map', 'Ext.Img'],
    config: {
        layout: 'card',
        activeItem: 0,/*****/
        items: [{
            xtype: 'container',
            baseCls: 'login-background',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [{
                xtype: 'component',
                height: '8%'
            }, {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'component',
                    flex: 1
                }, {
                    xtype: 'image',
                    src: 'resources/images/kc.png',
                    width: 300
                }, {
                    xtype: 'component',
                    flex: 1
                }]
            }, {
                xtype: 'loginform',
                baseCls: '',
                flex: 2
            }, {
                xtype: 'container'
            }]
        }, {
            xtype: 'tabpanel',
            activeItem: 3, /*****/
            tabBarPosition: 'bottom',
            items: [{
                title: 'Cotizador',
                xtype: 'cotizadorform',
                iconCls: 'compose'
            }, {
                title: 'Cartera',
                xtype: 'carterasnavigationview',
                iconCls: 'user'
            }, {
                title: 'Localización',
                xtype: 'mapa',
                iconCls: 'maps'
            }, {
                title: 'Configuración',
                iconCls: 'settings',
                itemId: 'configurationPanel',
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                items: [{
                    xtype: 'toolbar',
                    title: 'Sincronización',
                    ui: 'light',
                    docked: 'top',
                    hidden: Ext.os.is.Phone
                },{
                    xtype: 'component',
                    docked: 'top',
                    height:'20%',
                    hidden: Ext.os.is.Phone
                }, {
                    xtype: 'component',
                    cls: 'triton-configuracion',
                    html: ['<br>Para activar la sincronización es recomendable conectarse a una red WI-FI.<br><br>', '<em>Última sincronización: <b id="fechaSincronizacion"> ',
                        localStorage.getItem('fechaUltimaSincronizacion') ? localStorage.getItem('fechaUltimaSincronizacion') : '----', '</b></em>'
                    ].join('')
                }, {
                    xtype: 'fieldset',
                    instructions: 'Esta operación puede tomar varios minutos',
                    items: [{
                        xtype: 'button',
                        itemId: 'sincronizar',
                        iconCls: 'download',
                        ui: 'confirm',
                        text: 'Sincronizar Datos'
                    }]
                }, {
                    xtype: 'fieldset',
                    instructions: 'Esta operación eliminará todos los datos de la aplicación',
                    items: [{
                        xtype: 'button',
                        itemId: 'borrarInformacion',
                        iconCls: 'delete',
                        ui: 'decline',
                        text: 'Eliminar Datos'
                    }]
                },{
                    xtype: 'fieldset',
                    instructions: 'TRITON <br> Versión 1.0.0'
                }]
            }, {
                title: 'Salir',
                itemId: 'logout',
                iconCls: 'delete'
            }]
        }]
    }
});