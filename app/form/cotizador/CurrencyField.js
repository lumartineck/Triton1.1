/**
 * @class Triton.form.cotizador.CurrencyField
 * @extends Ext.field.Text
 * This is the currency field for triton
 */
Ext.define('Triton.form.cotizador.CurrencyField', {
    extend: 'Ext.field.Number',
    xtype: 'currencyfield',

    config :{
    	currencyPrecision: 2,
	    currencySign: '$',
	    currencyAtEnd: false,
	    decimalSeparator: '.',
	    thousandSeparator: ',',
	    maxValue: 9999999,
        minValue: 1,
        realValue: 0
    },

    initialize: function() {
        var me = this,
        	label = '';
        me.callParent();

        label = me.getLabel() || '';
        if(label == ''){
        	me.setLabelWidth('10%');
        }
        me.setLabel(label + '<div style="float:right;font-size:1.0em">$</div>');
    }
});