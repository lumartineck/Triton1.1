/**
 * @class  Triton.model.Cliente
 * @extends Ext.data.Model
 *
 * Este es el modelo para los clientes
 */

Ext.define('Triton.model.Cliente',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'id',
			type:'int'
		},{
			name:'firstName',
			type:'string'
		},{
			name:'lastName',
			type:'string'
		},{
			name:'rfc',
			type:'string'
		}],
		proxy:{
			type:'sql'
		}
	}
});