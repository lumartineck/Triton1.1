/**
 * @class Triton.store.Planes
 * @extends Ext.data.store
 * El store para listar las Planes
 */
Ext.define('Triton.store.Planes', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Plan'],
    config: {
        model: 'Triton.model.Plan',
        autoLoad:true,
        pageSize:100
    }
});