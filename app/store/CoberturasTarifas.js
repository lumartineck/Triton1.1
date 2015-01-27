/**
 * @class Triton.store.CoberturasTarifas
 * @extends Ext.data.store
 * El store para listar las coberturas tarifas
 */
Ext.define('Triton.store.CoberturasTarifas', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.CoberturasTarifa'],
    config: {
        model: 'Triton.model.CoberturasTarifa',
        autoLoad:true,
        pageSize:100
    }
});