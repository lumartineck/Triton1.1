/**
 * @class Triton.view.cotizador.DefinitionsPanel
 * @extends Ext.Panel
 * El panel que tiene las definiciones de las coberturas
 */
Ext.define('Triton.view.cotizador.DefinitionsPanel', {
    extend: 'Ext.Panel',
    xtype: 'definitionspanel',
    config: {
        modal: true,
        width: '100%',
        height: '100%',
        margin:'-5',
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            title: 'Definiciones',
            items: [ {
                text: 'Atrás',
                ui:'back',
                handler: function(btn) {
                    btn.up('definitionspanel').hide();
                }
            }]
        }],
        scrollable: true,
        tpl: [
        	'<div class="triton-cotizador-resume-tpl">',
        		'<tpl for=".">',
	         		'<div class="datos">',
				        '<span>{nombre}</span>',
				        '<ul>',
							'<li><b style="font-size:12px">{definicion}</b></li>',
							'<li>Beneficiario: <b style="font-size:12px">{beneficiario}</b></li>',
							'<li>Costo: <b style="font-size:12px">{costo}</b></li>',
							'<li>Caracteristicas:</li>',
							'<tpl for="caracteristicas">',
						        '<li style="font-size:10px">* {.}</li>',
						    '</tpl>',
						'</ul>',
				    '</div>',
			    '</tpl>',
         	'</div>'
        ].join(''),
        data:[{
        	nombre: 'BAS',
        	definicion: 'Beneficio básico por fallecimiento (Fallecimiento)',
        	beneficiario: 'Titular',
        	costo: 'Paquete Básico',
        	caracteristicas: []
        },{
        	nombre: 'PFT',
        	definicion: 'Beneficio adicional de pago por falleciemiento (Fallecimiento)',
        	beneficiario: 'Titular',
        	costo: 'Paquete Básico',
        	caracteristicas: []
        },{
        	nombre: 'CPFT',
        	definicion: 'Constancia de proteccion por falleciemiento (Fallecimiento)',
        	beneficiario: 'Titular',
        	costo: 'Paquete Básico',
        	caracteristicas: []
        },{
        	nombre: 'ET',
        	definicion: 'Beneficio adicional de pago anticipado por enfemedad en fase terminal (Enfermedad)',
        	beneficiario: 'Titular',
        	costo: 'Paquete Básico',
        	caracteristicas: []
        },{
        	nombre: 'BIT',
        	definicion: 'Beneficio adicional de extencion de pago de primas por invalidez total y permanente (Invalidez)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales',
        	caracteristicas: []
        },{
        	nombre: 'CII',
        	definicion: 'Beneficio adicional de indemnización por invalidez (Invalidez)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales',
        	caracteristicas: []
        },{
        	nombre: 'CMA',
        	definicion: 'Beneficio adicional por muerte accidental (Accidentes)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales',
        	caracteristicas: []
        },{
        	nombre: 'TIBA',
        	definicion: 'Beneficio adicional de triple indemnizacion por muerte accidental y/o perdidas organicas (Accidentes)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales',
        	caracteristicas: []
        },{
        	nombre: 'BCAT',
        	definicion: 'Beneficio adicional cancer del asegurado titular (Cancer)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales',
        	caracteristicas: []
        },{
        	nombre: 'GFA',
        	definicion: 'Beneficio adicional cancer del asegurado titular (Gastos funerarios)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales',
        	caracteristicas: []
        },{
        	nombre: 'GE',
        	definicion: 'Beneficio adicional de garantia educacional (Educacion)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales',
        	caracteristicas: []
        },{
        	nombre: 'PIT',
        	definicion: 'Beneficio adicionales de accidentes personales del asegurado (Accidentes personales)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales',
        	caracteristicas: []
        },{
        	nombre: 'BACY',
        	definicion: 'Beneficio adicional conyuge (Fallecimiento)',
        	beneficiario: 'Conyuge del titular',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'GFC',
        	definicion: 'Beneficio adicional de gastos funerarios conyuge (Fallecimiento)',
        	beneficiario: 'Conyuge del titular',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'BCAC',
        	definicion: 'Beneficio adicional cancer plus (Cancer)',
        	beneficiario: 'Hijos del titular',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'GFH',
        	definicion: 'Beneficio adicional de gastos funerarios hijos (Fallecimiento)',
        	beneficiario: 'Hijos del titular',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'BAC',
        	definicion: 'Beneficio adicional complementario (Fallecimiento)',
        	beneficiario: 'Complementarios',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'BCAC',
        	definicion: 'Beneficio adicional cancer plus (Cancer)',
        	beneficiario: 'Complementarios',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'GFC',
        	definicion: 'Beneficio adicional de gastos funerarios complementarios (Gastos funerarios)',
        	beneficiario: 'Complementarios',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'APC',
        	definicion: 'Beneficio adicional de accidentes personales complementarios (Accidentes personales)',
        	beneficiario: 'Complementarios',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'PV',
        	definicion: 'Protección Vitalicia',
        	beneficiario: 'Caracteristicas generales',
        	costo: '',
        	caracteristicas: ['Hasta los 99 años del asegurado titular se actualiza mensualmente primas excedentes / Retiros se puden incluir o eliminar beneficios adicionales']
        },{
        	nombre: 'FR',
        	definicion: 'Fondo de reserva',
        	beneficiario: 'Caracteristicas generales',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'FA',
        	definicion: 'Fondo de ahorro',
        	beneficiario: 'Caracteristicas generales',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: '--',
        	definicion: 'Puede incrementar SA',
        	beneficiario: 'Caracteristicas generales',
        	costo: '',
        	caracteristicas: []
        },{
        	nombre: 'BAS',
        	definicion: 'Beneficio basico por fallecimiento',
        	beneficiario: 'Titular',
        	costo: 'Cobertura basica',
        	caracteristicas: [
        		'Cobertura: Fallecimiento del titular',
        		'Asegurado: Titular',
        		'Edades de aceptacion (EA): 15 a 70 años',
        		'Descuento 2 años por no fumador, 3 años por ser mujer',
        		'Suma asegurada (SA): contratada por titular',
        		'SA Minima: $30,000 m.n. Maxima: sujeto a suscripcion',
        		'Cobertura vitalicia (Se cancela por fallecimiento o solucion del asegurado)',
        		'Cobertura si el titular fallece dentro de los primeros 5 años, se devuelven las primas de riesgo',
        		'EA: 15 a 70 años'
        	]
        },{
        	nombre: 'PFT',
        	definicion: 'Beneficio Adicional de pago por fallecimiento',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'SA Minima y maxima: suma de primas de riesgo pagadas',
        		'Cancelacion a)Falleciemiento titular b) Al finalizar el 5to año de vigencia',
        		'Cobertura: proteccion provicional por fallecimiento durante 90 dias a partir de la fecha de contratacion',
        		'EA: 18 a 65 años',
        		'SA: Hasta $ 500,00 m.n. o igual a la solicitada en BAS',
        		'Cancelacion a)Fallecimiento titular b)Al finalizar 90 dias c)Al emitirse la poliza'
        	]
        },{
        	nombre: 'CPPF',
        	definicion: 'Constancia de proteccion por fallecimiento',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Cobertura: Proteccion provisional por fallecimiento durante 90 dias a partir de la fecha de contratacion',
        		'EA: 18 a 65 años',
        		'SA: Hasta $500,000 m.n. o igual a la solicitada en BAS',
        		'Cancelacion a)Fallecimiento titular b)Al finalizar 90 dias c) Al terminarse la poliza'
        	]
        },{
        	nombre: 'ET',
        	definicion: 'Beneficio adicional de pago por fallecimiento temprano',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Cobertura: Proteccion provisional por fallecimiento durante 90 dias a partir de la fecha de contratacion',
        		'EA: 18 a 65 años',
        		'SA: Hasta $500,000 m.n. o igual a la solicitada en BAS',
        		'Cancelacion a)Fallecimiento titular b)Al finalizar 90 dias c) Al terminarse la poliza'
        	]
        },{
        	nombre: 'BIT',
        	definicion: 'Beneficio adicional de extencion de pago de promas por invalidez total y permanente(Invalidez)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Cobertura: Extencion de pagos de primas por invalidez totaly permanente',
        		'EA: 15 a 55 años',
        		'Cancelacion a) 60 años b) al pago de la cobertura c) A solicitud expresa d) Fallecimiento'
        	]
        },{
        	nombre: 'CII',
        	definicion: 'Beneficio adicional de indemnizacionpor invalidez total y permante(Invalidez)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Cobertura: Pago SA en caso de que el titular sufra estado de invalidez total y permanente',
        		'SA: Igual o menos a la basica',
        		'EA: 15 a 55 años',
        		'Cancelacion a) 60 años b) Al pago de la cobertura c) A solicitud expresa d) Fallecimiento'
        	]
        },{
        	nombre: 'CMA',
        	definicion: 'Beneficio adicional por muerte accidental(Accidentes)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Cobertura: pago adicional de SA a beneficiarios si el titular fallece a consecuendia de un accidente',
        		'SA: Igual o menor a la basica',
        		'EA: 15 a 65 años',
        		'Cancelacion a) 70 años b) Solicitud del titular c) Pago de esta cobertura'
        	]
        },{
        	nombre: 'TIBA',
        	definicion: 'Beneficio adicional de triple indemnizacion por muerte accidental y/o (Accidentes)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Cobertura de pago adicional de SA a beneficiarios si el titular fallece a consecuencia de un accidente o tiene perdidas organicas y/o un pago adicional extra si existe un accidente colectivo',
        		'SA: Igual o menor a la basica Nota: Despues del accidente un plazo para fallcer de 90 dias',
        		'EA de 15 a 65 años',
        		'Cancelacion a) 70 años b)Solicitud del titular c) Pago de esta cobertura d) Pago por invalidez'
        	]
        },{
        	nombre: 'BCAT',
        	definicion: 'Beneficio adicional cancer del asegurado del titular(Cancer)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Cobertura: Cubre gastos por cancer (In situ / Metastasis), Cubre hasta 3 complementarios',
        		'SA: Igual o menora la basica. Minimo $ 300,000 m.n. Maxima: $1,000,000 m.n.',
        		'Periodo de espera: 3 meses cancer in situ 25% SA, si posteriormente se da metastasis 75% restante',
        		'EA: 15 a 65 años',
        		'Cancelacion a) Fallecimiento titular b) Solicitud titular c) Pago de esta cobertura d) 70 años'
        	]
        },{
        	nombre: 'GFA',
        	definicion: 'Beneficio adicional de gastos funerarios del asegurado(Gastos funerarios)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Cobertura: cubre servicios funerarios al fallecer el asegurado',
        		'SA: 35% de la SA basica con tope hasta 100 smgmvdf',
        		'EA: 15 a 70 años',
        		'Cancelacion a) Fallecimiento del titular b) Solicitud del titular c) No se cancela por edad'
        	]
        },{
        	nombre: 'GF',
        	definicion: 'Asistencia funeraria(Gastos funerarios)',
        	beneficiario: 'Titular',
        	costo: 'Beneficios adicionales sin costo',
        	caracteristicas: [
        		'Asesoria legal ante cualquier tramite, para obtener el certificado, el acta de defuncion y la liberacion del cuerpo del asegurado. Exime la necropsia. Asignacion de funeraria, de velacion en capilla funeraria o en domicilio particular, de cremacion o inhumanacion',
        		'Gestoria de funeral, traslado del cuerpo, arreglo estetico del cuerpo, ataud metalico o urna, carroza al sementerio y autobus de acompañamiento',
        		'Fosa en panteon civil o municial'
        	]
        },{
        	nombre: 'BACY',
        	definicion: 'Beneficio adicional conyuge',
        	beneficiario: 'Conyuge del titular',
        	costo: '',
        	caracteristicas: [
        		'Cobertura: pago de SA a los beneficiarios del conyuge al fallecimiento del mismo',
        		'No se necesita la firma del conyuge en beneficiarios reciprocos',
        		'Asegurado: Conyuge del titular EA 15 a 70 años',
        		'SA: hasta 100% de la basica y tope de 200 smgmvdf',
        		'Cobertura vitalicia se cancela por: a) Fallecimiento del titular o  conyuge b) Pago cobertura c) Solicitud del titular'
        	]
        },{
        	nombre: 'GFC',
        	definicion: 'Beneficios adicional de gastos funerarios conyuge',
        	beneficiario: 'Conyuge del titular',
        	costo: '',
        	caracteristicas: [
        		'Cobertura: pago de SA al titular para solventar los gastos de servicios funerarios al fallecer el conyuge',
        		'Prima: según la edad del conyuge',
        		'SA: hasta 35% de la SA basica con tope hasta 100 smgmvdf',
        		'EA 15 a 65 años',
        		'Cancelacion a) Fallecimiento del titular o  conyuge b) Pago cobertura c) Solicitud del titular'
        	]
        },{
        	nombre: 'Cancer plus',
        	definicion: 'Beneficio adicional de gastos funerarios hijos',
        	beneficiario: 'Conyuge del titular',
        	costo: '',
        	caracteristicas: [
        		'Cobertura: Cubre gastos por cancer (In situ/metastasis)',
        		'SA: Igual o menor SA basica. Minimo $300,000 m.n., Maxima 1,000,000 m.n.',
        		'Periodo de espera: 3 meses, cancer in situ 25% SA, si posteriormente se desarolla metastasis es el 75% restante',
        		'EA: 15 a 65 años',
        		'Cancelacion a) Fallecimiento del titular o  conyuge b) Pago cobertura c) Solicitud del titular d) 70 años'
        	]
        },{
        	nombre: 'GFH',
        	definicion: 'Beneficio adicional de gastos funerarios hijos',
        	beneficiario: 'Hijos del titular',
        	costo: '',
        	caracteristicas: [
        		'Cobertura: Pago SA al titular para solventar gastos de servicios funerarios al fallecer los hijos del titular designados en la poliza',
        		'Prima: De acuerdo al numero de hijos',
        		'SA: 35% de SA basica con tope hasta de 100 smgmvdf',
        		'La suma de las SA de todos los hijos no exceda a la basica',
        		'EA: Menores de 24 años',
        		'Cancelacion a) Fallecimiento del titular o  conyuge b) Pago de la cobertura total por todos los hijos c) Solicitud del titular'
        	]
        },{
        	nombre: 'BAC',
        	definicion: 'Beneficio adicional complementario',
        	beneficiario: 'Complementario',
        	costo: '',
        	caracteristicas: [
        		'Cobertura: Pago de SA a los beneficiarios',
        		'Fallecimiento del mismo',
        		'Prima edad real del complementario',
        		'Asegurado: complementario',
        		'SA: hasta el 100% de la basica',
        		'EA: 15 a 70 años',
        		'Cobertura vitalicia se cancela por a) Fallecimiento titular o complementario b) Pago cobertura c) solicitud del titular'
        	]
        },{
        	nombre: 'Cancer plus',
        	definicion: 'Beneficio adicional cancer plus',
        	beneficiario: 'Complementario',
        	costo: '',
        	caracteristicas: [
        		'Cobertura: cubre gastos medicos por cancer (In situ / metastasis)',
        		'SA Igual o menor SA basica, Minimo $ 30,000 m.n. Maxima hasta $1000,000 m.n.',
        		'Periodo de espera: 3 meses cancer in situ 25% SA, si posteriormente se desarrolla metastasis es el 75% restante',
        		'EA: 15 a 65 años',
        		'Cancelacion a) Fallecimiento del titular b) Solicitud del titular c) pago de esta cobertura d) 70 años'
        	]
        }]
    }
});