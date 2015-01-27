/**
 * @class Triton.view.cartera.CarterasList
 * @extends Ext.dataview.List
 * Esta es la lista para listar clientes de la cartera
 */
Ext.define('Triton.view.cartera.CarterasList', {
    extend: 'Ext.dataview.List',
    xtype: 'carteraslist',
    requires: ['Ext.field.Search', 'Ext.plugin.ListPaging'],
    config: {
        pinHeaders: false,
        currentPage : 1,
        itemTpl: [
            '<tpl if="OportunidadVenta &gt; 0">',,
                '<div class="triton-cartera-client-tpl-green">',
            '<tpl else>',
                '<div class="triton-cartera-client-tpl">',
            '</tpl>', 
                '<p>{nombre}</p>',
                '<span>RFC : <b>{rfc}</b></span> </br>', 
                '<span>Poliza : <b>{poliza}</b></span> </br>',
                '<span>Retenedor : <b>{nombre_retenedor}</b></span>',
            '</div>'
        ].join(''),
        store: 'Carteras',
        useSimpleItems: true,
        //grouped: true,
        emptyText: '<div style="margin-top: 20px; text-align: center">No hay carteras con esos datos</div>',
        disableSelection: true,
        items: [{
            xtype: 'toolbar',
            docked: 'top',
            ui: 'light',
            items: [{
                xtype: 'spacer'
            }, {
                xtype: 'searchfield',
                placeHolder: ' Buscar cartera...'
            }, {
                xtype: 'button',
                itemId:'buscarCartera',
                text:'Buscar'
            }]
        }]
        /*listeners: {
            initializeeee: function(list) {
                var scroller = list.getScrollable().getScroller();
                scroller.on({
                    scrollenddd: function(scroller, x, y) {
                        if (y >= scroller.maxPosition.y) {
                            var me = list,
                                currentScrollToTopOnRefresh,
                                value,
                                store = list.getStore(),
                                db = store.getModel().getProxy().getDatabaseObject(),
                                records = [];
                            if (!me.storeFullyLoaded()) {
                                currentScrollToTopOnRefresh = list.getScrollToTopOnRefresh();
                                list.setScrollToTopOnRefresh(false);
                                value = list.down('searchfield').getValue();
                                //we make the query
                                query = "SELECT * FROM CARTERA WHERE ((rfc like '%" + value + "%') OR (poliza like '%" + value + "%') OR (nombre like '%" + value + "%') OR (id_retenedor like '%" + value + "%')) Order by nombre ASC LIMIT 50";
                                
                                list.setMasked({
                                    xtype: 'loadmask',
                                    message: 'Cargando ...'
                                });
                                db.transaction(function(tx) {
                                    tx.executeSql(query, [], function(tx, results) {
                                        var len = results.rows.length,
                                            i;
                                        for (i = 0; i < len; i++) {
                                            records.push(results.rows.item(i))
                                        }
                                        console.log(store.getCount());
                                        console.log(records);
                                        store.add(records);
                                        list.setScrollToTopOnRefresh(currentScrollToTopOnRefresh);
                                        list.setMasked(false);
                                        list.setCurrentPage(list.getCurrentPage() + 1);
                                    }, function () {
                                        console.log(arguments);
                                    });
                                });
                            }
                        }
                    },
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
        }*/
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
        store.setTotalCount(localStorage.getItem('CarterasTotalRecords')),
        total = store.getTotalCount();
        return total !== null ? store.getTotalCount() <= (store.currentPage * store.getPageSize()) : false;
    }
});