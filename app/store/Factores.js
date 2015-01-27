/**
 * @class Triton.store.Factores
 * @extends Ext.data.store
 * El store para listar las Factores
 */
Ext.define('Triton.store.Factores', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Factor'],
    config: {
        model: 'Triton.model.Factor',
        autoLoad:true,
        pageSize:100
    }
});