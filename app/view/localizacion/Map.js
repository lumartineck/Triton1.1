/**
 * @class Triton.view.localizacion.Map
 * @extends Ext.Map
 * Map for localization
 */
Ext.define('Triton.view.localizacion.Map', {
    extend: 'Ext.Map',
    xtype: 'mapa',
    requires: ['Triton.view.localizacion.MapList'],
    config: {
        useCurrentLocation: true,
        mapOptions: {
            zoom: 12
        },
        items: [{
            xtype: Ext.os.is.Phone ? 'component': 'toolbar',
            cls: 'x-toolbar-light',
            height:10,
            title: 'Localización de oficinas',
            docked: 'top'
        },{
            xtype: 'toolbar',
            docked: 'top',
            ui: 'light',
            items: [{
                xtype: 'searchfield',
                placeHolder: ' Buscar lugar...',
                listeners: {
                    focus: function(field) {
                        if (!field.list) {
                            field.list = Ext.create('Ext.Panel', {
                                left: 0,
                                top: 0,
                                cls: Ext.baseCSSPrefix + 'select-overlay',
                                layout: 'fit',
                                modal:true,
                                hideOnMaskTap: true,
                                width: Ext.os.is.Phone ? '14em' : '18em',
                                height: (Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) ? '12em' : (Ext.os.is.Phone ? '12.5em' : '22em'),
                                centered: true,
                                fullscreen: true,
                                items: {
                                    xtype: 'maplist',
                                    listeners: {
                                        itemtap: function(list, index, target, record) {
                                            field.list.hide();
                                            field.fireEvent('seleccionado', field, list, record);
                                            field.setValue(record.get('Descripcion'));
                                        }
                                    }
                                }
                            });
                        }
                        field.list.showBy(field);
                        field.fireEvent('showpicker', field, field.list);
                    }
                }
            }, {
                xtype: 'spacer'
            },{
                xtype:'button',
                itemId:'currentLocation',
                iconCls:'arrow_down'
            }]
        }],
        listeners: {
            show : function(comp){
                new google.maps.Marker({
                    position: new google.maps.LatLng(this._geo.getLatitude(), this._geo.getLongitude()),
                    map: comp.getMap(),
                    icon: './resources/images/current_location.png'
                });
            }
        }
    },
     /**
     * Moves the map center to the designated coordinates hash of the form:
     *
     *     { latitude: 37.381592, longitude: -122.135672 }
     *
     * or a google.maps.LatLng object representing to the target location.
     *
     * @param {Object/google.maps.LatLng} coordinates Object representing the desired Latitude and
     * longitude upon which to center the map.
     */
    setMapCenter: function(coordinates) {
        var me = this,
            map = me.getMap(),
            mapOptions = me.getMapOptions(),
            gm = (window.google || {}).maps;
        if (gm) {
            if (!coordinates) {
                if (map && map.getCenter) {
                    coordinates = map.getCenter();
                }
                else if (mapOptions.hasOwnProperty('center')) {
                    coordinates = mapOptions.center;
                }
                else {
                    coordinates = new gm.LatLng(19.3692879, -99.1453258); // Palo Alto
                }
            }

            if (coordinates && !(coordinates instanceof gm.LatLng) && 'longitude' in coordinates) {
                coordinates = new gm.LatLng(coordinates.latitude, coordinates.longitude);
            }

            if (!map) {
                mapOptions.center = mapOptions.center || coordinates;
                me.renderMap();
                map = me.getMap();
            }

            if (map && coordinates instanceof gm.LatLng) {
                map.panTo(coordinates);
            }
            else {
                this.options = Ext.apply(this.getMapOptions(), {
                    center: coordinates
                });
            }
        }
    }
});