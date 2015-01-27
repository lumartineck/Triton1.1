/**
 * @class Triton.store.CarterasCoberturas
 * @extends Ext.data.store
 * El store para listar las carteras coberturas
 */
Ext.define('Triton.store.CarterasCoberturas', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.CarterasCobertura'],
    config: {
        model: 'Triton.model.CarterasCobertura',
        autoLoad:true,
        pageSize:100
    }
});