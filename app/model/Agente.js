/**
 * @class  Triton.model.Agente
 * @extends Ext.data.Model
 *
 * Este es el modelo para los agentes
 */

Ext.define('Triton.model.Agente',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'id_agente',
			type:'int'
		},{
			name:'nombre',
			type:'string'
		},{
			name:'activo',
			type:'boolean'
		}],
		proxy:{
			type:'sql'
		}
	}
});