/**
 * @class  Triton.model.Geolocalizacion
 * @extends Ext.data.Model
 *
 * Este es el modelo para las geolocalizaciones
 */
Ext.define('Triton.model.Geolocalizacion', {
    extend: 'Ext.data.Model',
    config: {
        //idProperty: 'id',
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'Id_Geolocalizacion',
            type: 'string'
        }, {
            name: 'Id_Geolocalizacion',
            type: 'string'
        }, {
            name: 'Descripcion',
            type: 'string'
        }, {
            name: 'Longitud',
            type: 'string'
        }, {
            name: 'Latitud',
            type: 'string'
        },{
            name:'Oportunidades',
            type:'int',
            defaultValue:'1'
        }],
        proxy: {
            type: 'sql'
        }
    }
});