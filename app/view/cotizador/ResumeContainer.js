/**
 * @class Triton.view.cotizador.ResumeContainer
 * @extends Ext.Container
 * El contenedor para los detalles de la cotización
 */
Ext.define('Triton.view.cotizador.ResumeContainer', {
    extend: 'Ext.Container',
    alias: 'widget.resumecontainer',
    config: {
        tpl: Ext.create('Triton.view.cotizador.ResumeTpl'),
        detailsTpl:false,
        data: {
            edad: 30,
            sexo: 'Hombre',
            fuma:'NO',
            ocupacion:'Ingeniero Civil'
        }
    },
    initialize: function() {
        var me = this;
        me.callParent();
        if(me.getDetailsTpl()){
            me.setTpl(Ext.create('Triton.view.cotizador.DetailsTpl'));
        }        
    }
});
