/**
 * @class Triton.store.Tarifas
 * @extends Ext.data.store
 * El store para listar las Tarifas
 */
Ext.define('Triton.store.Tarifas', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Tarifa'],
    config: {
        model: 'Triton.model.Tarifa',
        autoLoad:true,
        pageSize:100
    }
});