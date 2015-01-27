/**
 * @class Triton.store.Geolocalizaciones
 * @extends Ext.data.store
 * El store para listar las geolocalizaciones
 */
Ext.define('Triton.store.Geolocalizaciones', {
    extend: 'Ext.data.Store',
    requires: ['Triton.model.Geolocalizacion'],
    config: {
        model: 'Triton.model.Geolocalizacion',
        autoLoad:true,
        pageSize:100
    }
});