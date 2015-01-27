/**
 * @class  Triton.model.Retenedor
 * @extends Ext.data.Model
 *
 * Este es el modelo para los retenedores
 */

Ext.define('Triton.model.Retenedor',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'id_retenedor',
			type:'int'
		},{
			name:'nombre',
			type:'string'
		},{
			name:'clave',
			type:'string'
		},{
			name:'unidad_pago',
			type:'string'
		}],
		proxy:{
			type:'sql'
		}
	}
});