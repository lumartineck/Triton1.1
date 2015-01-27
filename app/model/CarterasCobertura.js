/**
 * @class  Triton.model.CarterasCobertura
 * @extends Ext.data.Model
 *
 * Este es el modelo para las CarterasCoberturas
 */

Ext.define('Triton.model.CarterasCobertura',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'producto',
			type:'string'
		},{
			name:'poliza',
			type:'string'
		},{
			name:'clave_cobertura',
			type:'string'
		},{
			name:'prima',
			type:'string'
		},{
			name:'extraprima',
			type:'string'
		},{
			name:'suma_asegurada',
			type:'string'
		}],
		proxy:{
			type:'sql'
		}
	}
});