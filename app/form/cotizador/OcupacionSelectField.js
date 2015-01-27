/**
 * @class Triton.form.cotizador.OcupacionSelectField
 * @extends Ext.field.Select
 * Este es el combo para seleccionar la ocupación
 */
Ext.define('Triton.form.cotizador.OcupacionSelectField', {
    extend: 'Ext.field.Select',
    //extend: 'Ext.field.Text',
    xtype: 'ocupacionselectfield',
    requires: ['Triton.view.cotizador.OcupacionesList'],
    config: {
        name: 'ocupacion',
        label: 'Ocupación',
        store: 'Ocupaciones',
        displayField: 'descripcion',
        valueField: 'descripcion',
        autoSelect :false
    },
    /**
     * Shows the picker for the select field, whether that is a {@link Ext.picker.Picker} or a simple
     * {@link Ext.List list}.
     */
    showPicker: function() {
        var me = this,
            store = me.getStore(),
            value = me.getValue();
        //check if the store is empty, if it is, return
        if (!store || store.getCount() === 0) {
            return;
        }
        if (me.getReadOnly()) {
            return;
        }
        me.isFocused = true;
        var listPanel = me.getTabletPicker(),
            list = listPanel.down('list'),
            index, record;
        if (!listPanel.getParent()) {
            Ext.Viewport.add(listPanel);
        }
        listPanel.show();
        if (value || me.getAutoSelect()) {
            store = list.getStore();
            index = store.find(me.getValueField(), value, null, null, null, true);
            record = store.getAt(index);
            if (record) {
                list.select(record, null, true);
            }
        }
        me.fireEvent('onShowPicker', me, listPanel);
    },
    // @private
    getTabletPicker: function() {
        var config = this.getDefaultTabletPickerConfig(),
            me = this;
        if (!me.listPanel) {
            me.listPanel = Ext.create('Ext.Panel', Ext.apply({
                left: 0,
                top: 0,
                modal: true,
                //cls: Ext.baseCSSPrefix + 'select-overlay',
                layout: 'fit',
                hideOnMaskTap: true,
                width: '100%',//Ext.os.is.Phone ? '14em' : '18em',
                height: '100%',//(Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) ? '12em' : (Ext.os.is.Phone ? '12.5em' : '22em'),
                //centered: true,
                //fullscreen:true,
                items: {
                    xtype: 'ocupacioneslist',
                    store: me.getStore(),
                    itemTpl: '<span class="x-list-label">{' + me.getDisplayField() + ':htmlEncode}</span>',
                    listeners: {
                        select: me.onListSelect,
                        itemtap: function (list, index, target, record) {
                            me.onListTap();
                            me.fireEvent('seleccionado', me, list, record);
                        },
                        scope: me
                    }
                }
            }, config));
        }
        return this.listPanel;
    }
});