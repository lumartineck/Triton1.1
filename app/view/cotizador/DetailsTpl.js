/**
 * @class  Triton.view.cotizador.DetailsTpl
 * @extends Ext.XTemplate
 * Plantilla para mostrar el resumen del cotizador
 */

Ext.define('Triton.view.cotizador.DetailsTpl', {
	extend: 'Ext.XTemplate',

	constructor: function() {
		var html = [
			'<div class="triton-cotizador-resume-tpl">',
				'<div class="ocupacion">Nombre: <b>{nombre}</b></div>',
				'<div class="header">',
					'RFC: <b>{rfc}</b>',
				'</div>',
				'<div class="ocupacion">Domicilio: <b>{domicilio}</b></div>',		
				'<div class="ocupacion"><b>{ciudad}, {estado}, {cp}</b></div>',
				'<div class="ocupacion">Teléfono: <b>{telefono}</b></div>',
				'<div class="datos">',
					'<span>Datos de la Cartera</span>',
					'<ul>',
						'<li>Plan: <b>{_plan}</b> </li>',
						'<li>Poliza: <b>{poliza}</b></li>',
						'<li>Emisión: <b>{fecha_emision}</b></li>',
						'<li>Suma Asegurada: <b>$ {suma_asegurada}</b></li>',
						'<li>Prima: <b>$ {prima}</b></li>',
						'<li>Prima Exc: <b>$ {prima_excedente}</b></li>',
						'<li>Retenedor: <k class="retenedor">({clave} - {unidad_pago}) {retenedor} </k></li>',
						'<li>Estatus: <b>{estatus_poliza}</b></li>',
						'<li>Concepto Desc: <b>{concepto_descuento}</b></li>',						
						'<li> Reserva= {reserva} y Reserva al 60% = $ {reserva60}</b></li>',						
						'<li>Dígito Verificador: <b>{digito_verificador}</b></li>',
						//'<li>Fondo de Inversión: <b>{fondo_Inversion}</b></li>',
						//'<li>Fecha Último Descuento: <b>{fecha_ultimo_descuento}</b></li>',						
					'</ul>',
					'<span style="font-size:12px">Información Financiera</span>',
					'<ul>',
						'<li>Fecha Último Descuento: <b>{fecha_ultimo_descuento}</b></li>',
						'<li>Reserva : <b>Disp. 60%</b></li>',						
						'<li>Inversión : <b>{fondo_Inversion}</b></li>',
						'<li>R.P.: <b>{recibos_pendientes}</b></li>',				
						'<li>P.P.: <b>$ {primas_pendientes}</b></li>',				
					'</ul>',
					'<span style="font-size:12px">Último Incremento</span>',
					'<ul>',
						//'<li>F. Solicitud: <b>{fecha_solicitud_incremento}</b> </li>',						
						//'<li>Estatus: <b>{estatus_incremento}</b> </li>',						
						'<li>F. Emisión: <b>{fecha_emision_incremento}</b> </li>',						
						'<li>Suma Asegurada: <b>{suma_asegurada_incremento}</b> </li>',					
						'<li>Prima: <b>{prima_incremento}</b> </li>',					
					'</ul>',
					'<span style="font-size:12px">Último Ret. Div.</span>',
					'<ul>',
						//'<li>F. Solicitud: <b>{fecha_solicitud_dividendos}</b> </li>',						
						//'<li>Estatus: <b>{estatus_dividendos}</b> </li>',						
						'<li>F. Emisión: <b>{fecha_emision_dividendos}</b> </li>',						
						'<li>Importe: <b>$ {importe_dividendos}</b> </li>',						
						'<li>No. Cheque: <b>{numero_cheque_dividendos}</b> </li>',						
					'</ul>',

					'<span>Coberturas</span>',
					'<table>',
						'<tr>',
						  '<th>COB.</th>',
						  '<th>SUMA</th>',
						  '<th>EXTRA PRIMA</th>',
						  '<th>PRIMA</th>',
						'</tr>',
						'<tpl for="coberturas">',
							'<tr>',
							  '<td>{clave_cobertura}</td>',
							  '<td>$ {suma_asegurada}</td>', 
							  '<td>$ {extraprima}</td>',
							  '<td>$ {prima}</td>',
							'</tr>',
						'</tpl>',
					'</table>',					
				'</div>',
			'</div>'
		];
		this.callParent(html);
	}
});
