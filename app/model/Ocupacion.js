/**
 * @class  Triton.model.Ocupacion
 * @extends Ext.data.Model
 *
 * Este es el modelo para las Ocupaciones
 */

Ext.define('Triton.model.Ocupacion',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'id_ocupacion',
			type:'int'
		},{
			name:'clave',
			type:'int'
		},{
			name:'descripcion',
			type:'string'
		},{
			name:'tipo',
			type:'string'
		},{
			name:'BAS',
			type:'string'
		},{
			name:'TIBA',
			type:'string'
		},{
			name:'CII',
			type:'string'
		},{
			name:'BIT',
			type:'string'
		}],
		proxy:{
			type:'sql'
		}
	}
});