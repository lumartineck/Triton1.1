/**
 * @class Triton.form.cotizador.PaquetesSelectField
 * @extends Ext.field.Select
 * Este es el combo para seleccionar paquetes
 */
Ext.define('Triton.form.cotizador.PaquetesSelectField', {
    extend: 'Ext.field.Select',
    xtype: 'paquetesselectField',

    config: {
        name:'paquetes',
        label:'Paquetes',
        usePicker:false,
        options:[{
        	text:'Básico',
        	value:0
        },{
        	text:'Intermedio',
        	value:1
        },{
        	text:'Avanzado',
        	value:2
        }]
    }
});