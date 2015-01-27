/**
 * @class  Triton.model.Factor
 * @extends Ext.data.Model
 *
 * Este es el modelo para las Factores
 */

Ext.define('Triton.model.Factor',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'id_factor',
			type:'int'
		},{
			name:'id_tarifa',
			type:'int'
		},{
			name:'edad',
			type:'int'
		},{
			name:'factor',
			type:'float'
		}],
		proxy:{
			type:'sql'
		}
	}
});