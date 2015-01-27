/**
 * @class  Triton.model.CoberturasTarifa
 * @extends Ext.data.Model
 *
 * Este es el modelo para las CoberturasTarifas
 */

Ext.define('Triton.model.CoberturasTarifa',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'Id_Cobertura_Tarifa',
			type:'int'
		},{
			name:'id_cobertura',
			type:'int'
		},{
			name:'id_tarifa',
			type:'int'
		}],
		proxy:{
			type:'sql'
		}
	}
});