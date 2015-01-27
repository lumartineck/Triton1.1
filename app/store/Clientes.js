/**
 * @class Triton.store.Clientes
 * @extends Ext.data.store
 * El store para listar los clientes
 */
Ext.define('Triton.store.Clientes', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Cliente'],
    config: {
        model: 'Triton.model.Cliente',
        autoLoad:true
    }
});
