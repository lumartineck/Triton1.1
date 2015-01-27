/**
 * @class Triton.store.Agentes
 * @extends Ext.data.store
 * El store para listar los agentes
 */
Ext.define('Triton.store.Agentes', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Agente'],
    config: {
        model: 'Triton.model.Agente',
        autoLoad:true
    }
});
