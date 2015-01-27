/**
 * @class  Triton.model.Cartera
 * @extends Ext.data.Model
 *
 * Este es el modelo para las Carteras
 */
Ext.define('Triton.model.Cartera',{
	extend:'Ext.data.Model',
	config:{
		fields:[{
			name:'OportunidadVenta',
			defaultValue: 0,
			type:'int'
		},{
			name:'_plan',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'ciudad',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'concepto_descuento',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'cp',
			defaultValue: 0,
			type:'int'
		},{
			name:'domicilio',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'digito_verificador',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'estado',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'estatus_poliza',
			defaultValue: 0,
			type:'int'
		},{
			name:'fecha_emision',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'fecha_emision_dividendos',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'fecha_emision_incremento',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'fecha_ultimo_descuento',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'fondo_Inversion',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'id',
			defaultValue: 0,
			type:'int'
		},{
			name:'id_poliza',
			defaultValue: 0,
			type:'int'
		},{
			name:'id_retenedor',
			defaultValue: 0,
			type:'int'
		},{
			name:'importe_dividendos',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'nombre',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'nombre_retenedor',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'numero_cheque_dividendos',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'poliza',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'prima',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'prima_excedente',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'prima_incremento',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'primas_pendientes',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'recibos_pendientes',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'reserva',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'rfc',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'suma_asegurada', 
			defaultValue: 'NA',
			type:'string'
		},{
			name:'suma_asegurada_incremento',
			defaultValue: 'NA',
			type:'string'
		},{
			name:'telefono',
			defaultValue: 'NA',
			type:'string'
		}],
		proxy:{
			type:'sql'
		}
	}
});