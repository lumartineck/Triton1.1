/**
 * @class Triton.form.cotizador.PlanSelecField
 * @extends Ext.field.Select
 * Este es el combo para selecionar el plan
 */
Ext.define('Triton.form.cotizador.PlanSelecField', {
    extend: 'Ext.field.Select',
    xtype:'planselectfield',

    config: {
        name:'plan',
        label:'Plan',
        store: 'Planes',
        usePicker:false,
        displayField: 'descripcion',
        valueField: 'descripcion'
    },
    /**
     * Shows the picker for the select field, whether that is a {@link Ext.picker.Picker} or a simple
     * {@link Ext.List list}.
     */
    showPicker: function() {
        var store = this.getStore();
        //check if the store is empty, if it is, return
        if (!store || store.getCount() === 0) {
            return;
        }

        if (this.getReadOnly()) {
            return;
        }

        this.isFocused = true;

        if (this.getUsePicker()) {
            var picker = this.getPhonePicker(),
                name   = this.getName(),
                value  = {};

            value[name] = this.getValue();
            picker.setValue(value);
            if (!picker.getParent()) {
                Ext.Viewport.add(picker);
            }
            picker.show();
        } else {
            var listPanel = this.getTabletPicker(),
                list = listPanel.down('list'),
                index, record;

            store = list.getStore();
            index = store.find(this.getValueField(), this.getValue(), null, null, null, true);
            record = store.getAt((index == -1) ? 0 : index);

            if (!listPanel.getParent()) {
                Ext.Viewport.add(listPanel);
            }

            listPanel.showBy(this.getComponent(), (Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) ? 't-b' : null);
            list.select(record, null, true);
        }
        this.fireEvent('onShowPicker', this, listPanel);
    }
});