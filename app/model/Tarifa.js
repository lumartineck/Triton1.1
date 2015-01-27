/**
 * @class  Triton.model.Tarifa
 * @extends Ext.data.Model
 *
 * Este es el modelo para las Tarifas
 */

Ext.define('Triton.model.Tarifa',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'id_tarifa',
			type:'int'
		},{
			name:'nombre',
			type:'string'
		}],
		proxy:{
			type:'sql'
		}
	}
});