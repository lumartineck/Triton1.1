/**
 * @class  Triton.model.Plan
 * @extends Ext.data.Model
 *
 * Este es el modelo para los planes
 */
Ext.define('Triton.model.Plan', {
    extend: 'Ext.data.Model',
    config: {
        //idProperty: 'id',
        fields: [{
            name: 'id',
            type: 'int'
        }, {
            name: 'id_plan',
            type: 'string'
        }, {
            name: 'clave',
            type: 'string'
        }, {
            name: 'descripcion',
            type: 'string'
        }],
        proxy: {
            type: 'sql'
        }
    }
});