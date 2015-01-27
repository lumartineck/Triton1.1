/**
 * @class Triton.view.cotizador.OcupacionesList
 * @extends Ext.dataview.List
 * Esta es la lista para listar las ocupaciones de los clientes
 */
Ext.define('Triton.view.cotizador.OcupacionesList', {
    extend: 'Ext.dataview.List',
    xtype: 'ocupacioneslist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging'],
    config: {
        pinHeaders: false,
        currentPage : 1,
        /**/
        variableHeights: true,
        styleHtmlContent:true,
        useSimpleItems: false,
        /**/
        itemTpl: '<div class="triton-cartera-client-tpl"><strong>{descripcion}</strong></div>',
        store: 'Ocupaciones',
        useSimpleItems: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay ocupaciones con esos datos</div>',
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'searchfield',
                placeHolder: 'Buscar ocupación...'
            }, {
                xtype: 'spacer'
            }]
        }],
        listeners: {
            initialize: function(list) {
                var scroller = list.getScrollable().getScroller();
                scroller.on({
                    scrollend: function(scroller, x, y) {
                        if (y >= scroller.maxPosition.y) {
                            var me = list,
                                currentScrollToTopOnRefresh;
                            if (!me.storeFullyLoaded()) {
                                currentScrollToTopOnRefresh = list.getScrollToTopOnRefresh();
                                list.setScrollToTopOnRefresh(false);
                                list.getStore().nextPage({
                                    addRecords: true,
                                    callback: function(records, operation, success) {
                                        list.setScrollToTopOnRefresh(currentScrollToTopOnRefresh);
                                    }
                                });
                            }
                        }
                    },
                    scope: this
                });
            }
        }
    },
    /**
     * @private
     * Returns true if the Store is detected as being fully loaded, or the server did not return a total count, which
     * means we're in 'infinite' mode
     * @return {Boolean}
     */
    storeFullyLoaded: function() {
        var store = this.getStore(),
            total;
        store.setTotalCount(localStorage.getItem('OcupacionesTotalRecords')),
        total = store.getTotalCount();
        return total !== null ? store.getTotalCount() <= (store.currentPage * store.getPageSize()) : false;
    }
});