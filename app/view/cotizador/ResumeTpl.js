/**
 * @class  Triton.view.cotizador.ResumeTpl
 * @extends Ext.XTemplate
 * Plantilla para mostrar el resumen del cotizador
 */

Ext.define('Triton.view.cotizador.ResumeTpl', {
	extend: 'Ext.XTemplate',

	constructor: function() {
		var html = [
			'<div class="triton-cotizador-resume-tpl">',
				'<div class="ocupacion">Ocupación: <b>{ocupacion}</b></div>',
				'<div class="header">',
					'Edad: <b>{edad}</b>| Sexo: <b>{genero}</b>| Fuma: <b>{fuma}</b>',
				'</div>',				
				'<div class="datos">',
					'<span>Datos de la Cotización</span>',
					'<ul>',
						'<li>Plan: <b>{plan}</b> </li>',
						'<li>Prima: <b>$ {prima}</b></li>',
						'<li>Extraprima: <b>$ {extraprima}</b></li>',
						'<li>Prima Excedente: <b>$ {excedente}</b></li>',
					'</ul>',
					'<span>PRIMA TOTAL</span>',
					'<ul>',
						'<tpl for="tiposPago">',
							'<li><i>{pago}: </i><b>$ {primaTotal}</b></li>',
						'</tpl>',
						'<li><i>{pago}: </i><b>$ {prima}</b></li>',
					'</ul>',
					'<span>Coberturas</span>',
					'<table>',
						'<tr>',
						  '<th>COB.</th>',
						  '<th>SUMA</th>',
						  '<th>EXTRA PRIMA</th>',
						  '<th>PRIMA</th>',
						  '<th>TOTAL</th>',
						'</tr>',
						'<tpl for="coberturas">',
							'<tr>',
							  '<td>{cobertura}</td>',
							  '<td>$ {cantidad}</td>',
							  '<td>$ {extraprima}</td>',
							  '<td>$ {prima}</td>',
							  '<td>$ {suma}</td>',
							'</tr>',
						'</tpl>',
					'</table>',					
				'</div>',
			'</div>'
		];
		this.callParent(html);
	}
});
