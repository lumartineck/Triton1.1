/**
 * @class Triton.store.Carteras
 * @extends Ext.data.store
 * El store para listar las Carteras
 */
Ext.define('Triton.store.Carteras', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Cartera'],
    config: {
        model: 'Triton.model.Cartera',
        pageSize: 500,
        sorters: ['nombre', 'rfc', 'poliza'],
        autoLoad:true,
        clearOnPageLoad : false
    }
});