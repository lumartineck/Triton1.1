/**
 * @class Triton.form.EdadField
 * @extends Ext.field.Number
 * Description
 */
Ext.define('Triton.form.EdadField', {
    extend: 'Ext.field.Number',
    xtype: 'edadfield',

    config: {
        label: 'Edad',
        minValue: 15,
        maxValue: 70,
        name: 'edad'
    }
});
