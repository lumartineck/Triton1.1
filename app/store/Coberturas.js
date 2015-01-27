/**
 * @class Triton.store.Coberturas
 * @extends Ext.data.store
 * El store para listar las carteras coberturas
 */
Ext.define('Triton.store.Coberturas', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Cobertura'],
    config: {
        model: 'Triton.model.Cobertura',
        autoLoad:true,
        pageSize:100
    }
});