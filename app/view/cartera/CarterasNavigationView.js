/**
 * @class Triton.view.cartera.CarterasNavigationView
 * @extends
 * Description
 */
Ext.define('Triton.view.cartera.CarterasNavigationView', {
    extend: 'Ext.NavigationView',
    xtype: 'carterasnavigationview',
    requires: ['Triton.view.cartera.CarterasList', 'Triton.view.cotizador.DetailsTpl'],
    config: {
        items: [{
            xtype: Ext.os.is.Phone ? 'component': 'toolbar',
            cls: 'x-toolbar-light',
            height:10,
            title: 'Consultar Carteras',
            docked: 'top',
            hiddenn: Ext.os.is.Phone
        }, {
            title: false,
            xtype: 'carteraslist'
        }],
        navigationBar: {
            ui: 'light',
            docked: 'top',
            hidden: true
        },
        listeners: {
            activate: function(nav) {
                nav.down('carteraslist').getStore().load();
            }
        }
    }
});