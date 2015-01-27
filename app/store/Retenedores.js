/**
 * @class Triton.store.Retenedores
 * @extends Ext.data.store
 * El store para listar las Retenedores
 */
Ext.define('Triton.store.Retenedores', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Retenedor'],
    config: {
        model: 'Triton.model.Retenedor',
        pageSize:100,
        autoLoad:true
    }
});