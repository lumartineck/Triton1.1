/**
 * @class  Triton.model.Cobertura
 * @extends Ext.data.Model
 *
 * Este es el modelo para las Coberturas
 */

Ext.define('Triton.model.Cobertura',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'Id_Cobertura',
			type:'int'
		},{
			name:'Descripcion',
			type:'string'
		},{
			name:'Nombre',
			type:'string'
		}],
		proxy:{
			type:'sql'
		}
	}
});