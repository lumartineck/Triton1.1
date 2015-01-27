/**
 * @class Triton.view.localizacion.MapList
 * @extends Ext.dataview.List
 * Esta es la lista para listar clientes de la cartera
 */
Ext.define('Triton.view.localizacion.MapList', {
    extend: 'Ext.dataview.List',
    xtype: 'maplist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging'],
    config: {
        pinHeaders: false,
        itemTpl: [
            '<div class="triton-cartera-client-tpl">',
                '<p>{Descripcion}</p>',
                '<p style="font-size:0.6em">Oportunidad: {Oportunidades}</p>',
            '</div>'].join(''),
        store: 'Geolocalizaciones',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay lugares con esa descripción</div>',
        disableSelection: true,
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            storeFullyLoaded: function() {               
                var store = this.getList().getStore(),
                    total = store.setTotalCount(localStorage.getItem('GeolocalizacionesTotalRecords')),
                    total = store.getTotalCount();
                return total !== null ? store.getTotalCount() <= (store.currentPage * store.getPageSize()) : false;
            },
            autoPaging: true
        }]
    }
});