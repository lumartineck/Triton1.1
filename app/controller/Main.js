Ext.define('Triton.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: {
                selector: 'main'
            }
        },
        control: {
            'loginform': {
                loginuser: 'onLoginUser'
            },
            'mapa': {
                activate: 'setMarkers'
            },
            'mapa #currentLocation': {
                tap: 'setCurrentLocation'
            },
            carterasnavigationview: {
                back: 'onCarterasNavigationViewBack'
            },
            'carterasnavigationview carteraslist': {
                itemtap: 'onSelectCartera'
            },
            'carterasnavigationview carteraslist searchfield': {
                clearicontap: 'onSearchCarterasClearIconTap'
                //keyup: 'onSearchCarterasKeyUp'
            },
            'carterasnavigationview #buscarCartera': {
                tap: 'onSearchCarterasKeyUp'
            },
            'ocupacioneslist searchfield': {
                clearicontap: 'onSearchOcupacionesClearIconTap',
                keyup: 'onSearchOcupacionesKeyUp'
            },
            'main #configurationPanel #sincronizar': {
                tap: 'updateDataFromServer'
            },
            'main #configurationPanel #borrarInformacion': {
                tap: 'clearUser'
            },
            'cotizadorform ocupacionselectfield': {
                seleccionado: 'setOcupacionDetails',
                onShowPicker: 'onShowPicker'
            },
            'cotizadorform selectfield': {
                onShowPicker: 'onShowPicker'
            },
            'cotizadorform': {
                validdata: 'setCotizacionDetails'
            },
            'mapa searchfield': {
                clearicontap: 'onSearchPlaceIconTap',
                keyup: 'onSearchPlaceKeyUp',
                seleccionado: 'onSelectPlace',
                onShowPicker: 'onShowPicker'
            },
            'main #logout': {
                activate: 'logoutUser'
            },
            'main tabpanel': {
                activeitemchange: 'onActivateTabsOnTabPanel'
            }
        }
    },
    onShowPicker: function(picker, panel) {
        var me = this;
        me.activeListPanel = panel;
    },
    setCurrentLocation: function(btn) {
        var lat, lng, map = btn.up('mapa'),
            gm = (window.google || {}).maps,
            coordinates;
        //http://community.phonegap.com/nitobi/topics/geolocation_works_with_one_android_device_but_not_another
        Ext.device.Geolocation.getCurrentPosition({
            allowHighAccuracy: true,
            maximumAge: 90000,
            success: function(position) {
                map.setMapCenter(position.coords);
            },
            failure: function() {
                Ext.Msg.alert('Aviso', 'Error mientras se obtenía la localización');
            }
        });
    },
    onSelectPlace: function(field, list, record) {
        var me = this,
            map = field.up('mapa');
        map.setMapCenter({
            latitude: record.get('Latitud'),
            longitude: record.get('Longitud')
        });
    },
    onSearchPlaceIconTap: function() {
        Ext.getStore('Geolocalizaciones').clearFilter();
    },
    /**
     * Cuando buscamos un lugar en el mapa
     */
    onSearchPlaceKeyUp: function(field) {
        var me = this,
            store = Ext.getStore('Geolocalizaciones'),
            query = '',
            value = field.getValue(),
            db = store.getModel().getProxy().getDatabaseObject();
        me.mask('Buscando ...');
        //we make the query
        query = "SELECT * FROM GEOLOCALIZACION WHERE ((Descripcion like '%" + value + "%'))";
        store.removeAll();
        db.transaction(function(tx) {
            tx.executeSql(query, [], function(tx, results) {
                var len = results.rows.length,
                    i;
                for (i = 0; i < len; i++) {
                    store.add(results.rows.item(i));
                }
                me.unmask();
            }, null);
        });
    },
    setMarkers: function(mapa) {
        var me = this,
            map = mapa.getMap(),
            bounds;
        //bounds = new google.maps.LatLngBounds();
        me.clearMarkers();
        Ext.getStore('Geolocalizaciones').each(function(record, index, length) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(record.get('Latitud'), record.get('Longitud')),
                animation: google.maps.Animation.DROP,
                map: map
            });
            //bounds.extend(marker.position);
            var infoWindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', function() {
                
                infoWindow.setContent(record.get('Descripcion'));
                infoWindow.open(map, marker);
                setTimeout(function() {
                    infoWindow.close();
                }, 2000);
                me.trazarRuta(map, record.get('Latitud'), record.get('Longitud'));
            });
            me.mapMarkers.push(marker);
        });
    },
    // remove all markers
    clearMarkers: function() {
        var me = this;
        for (var i = 0; i < me.mapMarkers.length; i++) {
            me.mapMarkers[i].setMap(null);
        }
        me.mapMarkers = new Array();
    },
    trazarRuta: function(map, lat, lng) {
        var me = this;
        me.directionsService = new google.maps.DirectionsService();
        if (me.directionsDisplay) {
            me.directionsDisplay.setMap(null);
        }
        me.directionsDisplay = new google.maps.DirectionsRenderer();
        me.directionsDisplay.setMap(map);
        var origin = new google.maps.LatLng(me.latitude, me.longitude);
        var destination = new google.maps.LatLng(lat, lng);
        var request = {
            origin: origin,
            destination: destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        me.directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                me.directionsDisplay.setMap(null);
                me.directionsDisplay.setMap(map);
                me.directionsDisplay.setDirections(result);
            }
        });
    },
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        var me = this;
        me.mapMarkers = me.mapMarkers || [];
        //si ya expiraron su consultas
        if (me.expiroAcceso()) {
            return false;
        }
        if (localStorage.getItem('activate_login') == "true") {
            return false;
        }
        //si tiene usuario valido
        if (localStorage.getItem('triton_token') && localStorage.getItem('clave') && localStorage.getItem('password')) {
            this.getMain().setActiveItem(1);
            var geo = Ext.create('Ext.util.Geolocation', {
                autoUpdate: true,
                listeners: {
                    locationupdate: function(geo) {
                        me.latitude = geo.getLatitude();
                        me.longitude = geo.getLongitude();
                    },
                    locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                        me.latitude = geo.getLatitude();
                        me.longitude = geo.getLongitude();
                    }
                }
            });
            geo.updateLocation();
            //si no ha sincronizado
            if (localStorage.getItem('fechaUltimaSincronizacion')) { // si existen datos en las tablas cambia al tab default
                me.getMain().down('tabpanel').setActiveItem(0);
                Ext.getStore("Carteras").load();
            }
        }
        //back button logic     
        document.addEventListener("backbutton", function() {
            me.activeListPanel.hide();
        }, true);
    },
    expiroAcceso: function() {
        var me = this,
            consultasTotales = localStorage.getItem('consultasTotales') * 1,
            consultasHechas = localStorage.getItem('consultasHechas') * 1,
            diasTotales = localStorage.getItem('diasTotales') * 1,
            diasActivo = me.calcularDiasActivo();
        if (consultasHechas > consultasTotales || diasActivo > diasTotales) {
            me.clearUser();
            Ext.Msg.alert('Vuelve a iniciar sesión.');
            return true;
        }
        return false;
    },
    calcularDiasActivo: function() {
        var me = this,
            fechaUltimaSincronizacion = localStorage.getItem('fechaUltimaSincronizacion'),
            total = 0;
        if (fechaUltimaSincronizacion) {
            total = new Date() - new Date(fechaUltimaSincronizacion);
            total = total / 1000; //segundos
            total = total / 60; //minutos
            total = total / 60; //horas
            total = total / 24; //dias            
        }
        return total;
    },
    //si no estan sincronizadas las tablas mandamos solo el panel de configuración
    onActivateTabsOnTabPanel: function(panel, newPanel) {
        if (newPanel.initialConfig.title === 'Configuración') {
            return true;
        }
        if (!localStorage.getItem('fechaUltimaSincronizacion') && newPanel.initialConfig.title !== 'Salir') {
            Ext.Msg.alert('Aviso', 'Por favor sincroniza tu aplicación');
            return false;
        }

        switch(newPanel.initialConfig.title){
            case 'Cotizador':
                newPanel.down('#cotizadorMainMenu').setPressedButtons([0]);
            break;
            case 'Cartera':
                newPanel.reset();
                newPanel.getNavigationBar().hide();
            break;
        }
    },
    setOcupacionDetails: function(field, list, record) {
        var form = this.getMain().down('cotizadorform');
        form.down('#ocupacionDetails').setData(record.getData());
        //desabilitamos los campos correspondientes
        form.setEnable(form.down('field[name=tiba]'), record.get('TIBA'));
        form.setEnable(form.down('field[name=cii]'), record.get('CII'));
        form.setEnable(form.down('field[name=cii]'), record.get('BIT'));

        //form.reset();
    },
    /**
     * cuando se logea el usuario
     * @param  {object} form el formulario de login
     * @return {function} el metodo login user
     */
    onLoginUser: function(form) {
        var me = this,
            values = form.getValues(),
            data = undefined,
            uuid = window && window.device && window.device.uuid;
        //si el usuario ya inicio sesión no hacemos la llamada y ocupamos sus credenciales actuales
        if (localStorage.getItem('clave') && localStorage.getItem('password') && localStorage.getItem('triton_token')) {
            if (localStorage.getItem('clave') === values.clave && localStorage.getItem('password') === values.password) {
                me.getMain().setActiveItem(1);
                localStorage.setItem('activate_login', false);
                //si no esta logeado debe de poner el panel de sincronización primero
                if (!localStorage.getItem('fechaUltimaSincronizacion')) {
                    me.getMain().down('tabpanel').setActiveItem(3);
                } else {
                    me.getMain().down('tabpanel').setActiveItem(0);
                }
            } else {
                Ext.Msg.alert('Error', 'Usuario o contraseña incorrectos. Favor de verificarlo.');
            }
            return;
        }
        me.mask('Iniciando ...');
        Ext.data.JsonP.request({
            url: Ext.String.format('http://triton.grupokc.com.mx/login/validar/{0}/{1}/{2}/{3}', values.clave, values.password, uuid, Ext.device.Device.platform),
            params: values,
            callback: function(c, response) {
                response = Ext.decode(response);
                if (response) {
                    if (response.success === true) {
                        data = response.data[0];
                        if (data.Agente_Activo !== true) {
                            Ext.Msg.alert('Error', 'Este dispositivo no ha sido activado');
                            me.unmask();
                            return;
                        }
                        me.getMain().setActiveItem(1);
                        //si no hay tablas sincronizadas
                        if (localStorage.getItem('fechaUltimaSincronizacion')) {
                            me.getMain().down('tabpanel').setActiveItem(0);
                        } else {
                            me.getMain().down('tabpanel').setActiveItem(3);
                        }
                        localStorage.setItem('triton_token', data.Token);
                        localStorage.setItem('activate_login', false);
                        localStorage.setItem('url', data.Direccion);
                        localStorage.setItem('agente', data.Mensaje);
                        localStorage.setItem('fechaCartera', data.Fecha_Cartera);
                        //guardamos los datos de sesion del usuario
                        localStorage.setItem('clave', values.clave);
                        localStorage.setItem('password', values.password);
                        //guardamos la expiracion de la aplicacion
                        localStorage.setItem('consultasTotales', data.Consultas);
                        localStorage.setItem('consultasHechas', 0);
                        localStorage.setItem('diasTotales', data.DiasVigencia);
                    } else {
                        Ext.Msg.alert('Error', response.message);
                    }
                    me.unmask();
                }
            },
            failure: function() {
                me.unmask();
                Ext.Msg.alert('Verifica tu conexión a internet');
            }
        });
    },
    /**
     * Cuando se selecciona un cliente de la cartera para ver su historial
     * @param  {Ext.dataview.List} list   La lista que disparo el evento
     * @param  {Number} index  El indice de la lista que fue seleccionado
     * @param  {Ext.data.Record} record El record qeu fue seleccionado
     * @return {function}
     */
    onSelectCartera: function(list, index, target, record) {
        var me = this,
            estatus_polizas,
            navigationView = list.up('carterasnavigationview'),
            store = Ext.getStore('CarterasCoberturas'),
            proxy = store.getModel().getProxy(),
            db = proxy.getDatabaseObject();
        estatus_polizas = ['', 'Vigente', 'Cancelación x Agotamiento de reserva', 'Cancelación x Falta de pago', 'Cancelación interna','Rescate','Siniestro','Invalidez'];
        me.mask('Consultando Cartera ...');
        navigationView.push({
            title: 'Datos de la poliza',
            scrollable: 'vertical',
            xtype: 'resumecontainer',
            detailsTpl: true
        });
        //aqui buscamos la coberturas de las carteras
        queryCoberturas = "SELECT * FROM CARTERASCOBERTURA WHERE poliza = '" + record.get('poliza') + "'";
        queryRetenedor = "SELECT * FROM RETENEDOR WHERE id_retenedor = '" + record.get('id_retenedor') + "'";
        db.transaction(function(tx) {
            var coberturas = [],
                retenedor,
                data = record.getData();
            tx.executeSql(queryCoberturas, [], function(txx, results) {
                var len = results.rows.length,
                    i;
                for (i = 0; i < len; i++) {
                    coberturas.push(results.rows.item(i));
                }
                data.coberturas = coberturas;
                tx.executeSql(queryRetenedor, [], function(txx, results) {
                    data.retenedor = results.rows.item(0).nombre;
                    data.clave = results.rows.item(0).clave;
                    data.unidad_pago = results.rows.item(0).unidad_pago;
                    
                    data.estatus_poliza = estatus_polizas[data.estatus_poliza];
                    data.fecha_ultimo_descuento = data.fecha_ultimo_descuento && data.fecha_ultimo_descuento.split(' ');
                    data.fecha_ultimo_descuento = data.fecha_ultimo_descuento && data.fecha_ultimo_descuento[0];

                    data.fecha_emision = data.fecha_emision && data.fecha_emision.split(' ');
                    data.fecha_emision = data.fecha_emision && data.fecha_emision[0];

                    data.fecha_solicitud_incremento = data.fecha_solicitud_incremento && data.fecha_solicitud_incremento.split(' ');
                    data.fecha_solicitud_incremento = data.fecha_solicitud_incremento && data.fecha_solicitud_incremento[0];
                    
                    data.fecha_emision_incremento = data.fecha_emision_incremento && data.fecha_emision_incremento.split(' ');
                    data.fecha_emision_incremento = data.fecha_emision_incremento && data.fecha_emision_incremento[0];

                    //para la reserva
                    data.reserva60 = parseFloat(data.reserva * 0.6).toFixed(2);

                    /*data.fecha_solicitud_dividendos = data.fecha_solicitud_dividendos.split(' ');
                    data.fecha_solicitud_dividendos = data.fecha_solicitud_dividendos[0];*/

                    data.fecha_emision_dividendos = data.fecha_emision_dividendos && data.fecha_emision_dividendos.split(' ');
                    data.fecha_emision_dividendos = data.fecha_emision_dividendos && data.fecha_emision_dividendos[0];
                    
                    navigationView.getNavigationBar().show();
                    navigationView.getNavigationBar().down('button').setText('Atrás');
                    navigationView.down('resumecontainer').setData(data);
                    me.unmask();
                }, function() {});
            }, function() {});
        });
    },
    onCarterasNavigationViewBack: function(navigationView, view) {
        navigationView.getNavigationBar().hide();
    },
    /**
     * Cuando buscamos un cliente mediante el searchfield
     */
    onSearchCarterasKeyUp: function(btn) {
        var me = this,
            field = btn.up('toolbar').down('searchfield'),
            store = Ext.getStore('Carteras'),
            list = btn.up('carteraslist'),
            query = '',
            value = field.getValue(),
            db = store.getModel().getProxy().getDatabaseObject(),
            records = [];
        me.mask('Buscando ...');
        //we make the query
        query = "SELECT * FROM CARTERA WHERE ((rfc like '%" + value + "%') OR (poliza like '%" + value + "%') OR (nombre like '%" + value + "%') OR (id_retenedor like '%" + value + "%')) Order by nombre ASC LIMIT 100";
        store.removeAll();
        db.transaction(function(tx) {
            tx.executeSql(query, [], function(tx, results) {
                var len = results.rows.length,
                    i;
                for (i = 0; i < len; i++) {
                    records.push(results.rows.item(i))
                }
                store.insert(0,records);
                me.unmask();
                list.setCurrentPage(1);
            }, function() {
                console.log(arguments)
            });
        });
    },
    /**
     * Limpiamos el searchfield y el store
     */
    onSearchCarterasClearIconTap: function(f) {
        f.setValue('');
        this.onSearchCarterasKeyUp(f);
    },
    /**
     * Cuando buscamos un cliente mediante el searchfield
     */
    onSearchOcupacionesKeyUp: function(field) {
        var me = this,
            store = Ext.getStore("Ocupaciones"),
            query = '',
            value = field.getValue(),
            db = store.getModel().getProxy().getDatabaseObject();
        if (field.getValue().length < 3 && field.getValue() !== '') {
            return false;
        }
        me.mask('Buscando ...');
        //we make the query
        query = "SELECT * FROM Ocupacion WHERE ((descripcion like '%" + value + "%')) ORDER BY descripcion ASC LIMIT 50 ";
        store.removeAll();
        db.transaction(function(tx) {
            tx.executeSql(query, [], function(tx, results) {
                var len = results.rows.length,
                    i;
                for (i = 0; i < len; i++) {
                    store.add(results.rows.item(i));
                }
                me.unmask();
            }, null);
        });
    },
    /**
     * Limpiamos el searchfield y el store
     */
    onSearchOcupacionesClearIconTap: function(f) {
        f.setValue('');
        this.onSearchOcupacionesKeyUp(f);
    },
    updateDataFromServer: function() {
        var me = this,
            d = new Date(),
            fecha = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
            tablesArray = ['Agentes', 'Ocupaciones', 'Carteras', 'Planes', 'CarterasCoberturas', 'Geolocalizaciones', 'Coberturas', 'Retenedores', 'Factores', 'CoberturasTarifas', 'Tarifas'];
        //traemos las tablas que se necesitan actualizar
        me.mask('Sincronizando ...');
        //si se quedo pendiente la sincronización
        if (localStorage.getItem('pendingTablesArray') && localStorage.getItem('pendingTablesIndex')) {
            tablesArray = Ext.decode(localStorage.getItem('pendingTablesArray'));
            me.updateInformation(localStorage.getItem('pendingPage') * 1, localStorage.getItem('pendingTotalPages') * 1, undefined, tablesArray, localStorage.getItem('pendingTablesIndex') * 1);
            return;
        }
        if (fecha == localStorage.getItem('fechaUltimaSincronizacion')) {
            Ext.Msg.alert('Dispositivo sincronizado.');
            me.unmask();
            return;
        }
        Ext.data.JsonP.request({
            url: Ext.String.format('{0}/{1}/{2}/{3}/{4}', localStorage.getItem('url'), 'tablas', localStorage.getItem('triton_token'), 1, fecha),
            callback: function(c, action) {
                action = Ext.decode(action);
                if (action) {
                    if (action.success && action.data.length) {
                        tablesArray = [];
                        Ext.each(action.data, function(item) {
                            var nombreTabla = item.Nombre;
                            nombreTabla = nombreTabla.split('_');
                            if (nombreTabla.length > 1) {
                                nombreTabla[1] = nombreTabla[1].charAt(0).toUpperCase() + nombreTabla[1].slice(1)
                            }
                            nombreTabla = nombreTabla.join('');
                            tablesArray.push(nombreTabla);
                        }, this);
                        Ext.each(tablesArray, function(item) {
                            me.clearTable(item);
                        });
                        me.updateInformation(undefined, undefined, undefined, tablesArray, 0);
                    }else if(action.data.length == 0){                        
                        Ext.Msg.alert('No hay datos que sincronizar.');
                    } else {
                        Ext.Msg.alert('Tu dispositivo esta deshabilitado.');
                    }
                }
                me.unmask();
            },
            failure: function(error, object) {
                me.unmask();
                Ext.Msg.alert('Error de conexión.');
            }
        });
    },
    /**
     * Metodo para sincronizar la información de las tablas
     * @param  {Number} pagina
     * @param  {Number} paginasTotales
     * @param  {Object} query
     * @param  {Array} tablesArray
     * @param  {Number} tableIndex
     * @return
     */
    updateInformation: function(pagina, paginasTotales, query, tablesArray, tableIndex) {
        var me = this,
            pagina = pagina || 1,
            paginasTotales = paginasTotales || 0,
            query = query || me.makeQuery(tablesArray[tableIndex]),
            db = query.db,
            columns = query.columns,
            proxy = query.proxy;
        me.mask('Sincronizando ' + query.storeName + ' </br> Paso ' + pagina + (paginasTotales ? ' de ' + paginasTotales : ' de ...'));
        Ext.data.JsonP.request({
            url: me.constructURL(query.storeName, pagina),
            callback: function(c, action) {
                action = Ext.decode(action);
                //console.log(action);
                if (action.success === true) {
                    paginasTotales = action.paginas;
                    db.transaction(function(tx) {
                        Ext.each(action.data, function(item, index) {
                            tx.executeSql(query.query, proxy.getColumnValues(columns, item), function() {console.log(arguments)}, function() {console.log(arguments)});
                        });
                        me.unmask();
                        /**
                         * Recursión para cargar sincronizar todas las tablas
                         */
                        //cargamos recursivamente hasta que se carguen todas las paginas de caad tabla
                        if (pagina < paginasTotales) {
                            me.updateInformation(pagina + 1, paginasTotales, query, tablesArray, tableIndex);
                        } else {
                            //cambiamos de tabla y la cargamos nuevamente 
                            localStorage.setItem(query.storeName + 'TotalPages', paginasTotales);
                            localStorage.setItem(query.storeName + 'TotalRecords', paginasTotales * 1000);
                            tableIndex++;
                            if (tablesArray.length > tableIndex) {
                                me.updateInformation(undefined, undefined, undefined, tablesArray, tableIndex);
                            } else {
                                //cargamos todos los stores una vez que concluyo la sincronización
                                Ext.each(tablesArray, function(item) {
                                    Ext.getStore(item).load();
                                });
                                //guardamos la ultima fecha de actualización
                                var d = new Date();
                                d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                                localStorage.setItem('fechaUltimaSincronizacion', d);
                                Ext.fly('fechaSincronizacion').setHtml(d);
                                //limpiamos los pending
                                localStorage.removeItem('pendingTablesArray');
                                localStorage.removeItem('pendingTablesIndex');
                                localStorage.removeItem('pendingPage');
                                localStorage.removeItem('pendingTotalPages');
                                //habilitamos el boton de salir
                                me.getMain().down('#logout').setDisabled(false);
                            }
                        }
                    });
                } else {
                    Ext.Msg.alert('Error', action.error, function() {
                        me.clearUser();
                    });
                    me.unmask();
                }
            },
            failure: function() {
                me.unmask();
                Ext.Msg.alert('Verifica tu conexión a internet.');
                //guardamos en donde se quedo la sincronización
                localStorage.setItem('pendingTablesArray', Ext.encode(tablesArray));
                localStorage.setItem('pendingTablesIndex', tableIndex);
                localStorage.setItem('pendingPage', pagina);
                localStorage.setItem('pendingTotalPages', paginasTotales);
            }
        });
    },
    mask: function(txt) {
        var me = this;
        me.getMain().setMasked({
            xtype: 'loadmask',
            message: txt
        });
    },
    unmask: function() {
        var me = this;
        me.getMain().setMasked(false);
    },
    constructURL: function(tabla, pagina) {
        tabla = tabla.toLowerCase();
        tabla = (tabla === 'carterascoberturas') ? 'carteras_coberturas' : tabla;
        tabla = (tabla === 'coberturastarifas') ? 'coberturas_tarifas' : tabla;
        return Ext.String.format('{0}/{1}/{2}/{3}', localStorage.getItem('url'), tabla, localStorage.getItem('triton_token'), pagina);
    },
    makeQuery: function(storeName) {
        var me = this,
            store = Ext.getStore(storeName),
            proxy = store.getModel().getProxy(),
            table = proxy.getTable(),
            columns = proxy.getColumns(),
            tmp = [],
            placeholders,
            query;
        columns.push('id');
        for (i = 0, ln = columns.length; i < ln; i++) {
            tmp.push('?');
        }
        placeholders = tmp.join(', ');
        query = 'INSERT INTO ' + table + ' (' + columns.join(', ') + ') VALUES (' + placeholders + ')';
        //console.log(query);
        return {
            query: query,
            proxy: proxy,
            store: store,
            columns: columns,
            storeName: storeName,
            db: proxy.getDatabaseObject()
        };
    },
    /**
     * Termina la sesión del usuario, borrando toda la informacion
     * @param  {Ext.Button} btn el boton que lo dispara
     */
    clearUser: function(btn) {
        var me = this,
            tables = ['Carteras', 'Ocupaciones', 'Planes', 'Coberturas', 'CarterasCoberturas', 'Geolocalizaciones'];
        localStorage.removeItem('triton_token');
        localStorage.removeItem('clave');
        localStorage.removeItem('password');
        localStorage.removeItem('activate_login');
        localStorage.removeItem('fechaUltimaSincronizacion');
        Ext.each(tables, function(item) {
            me.clearTable(item);
        }, this);
        this.getMain().setActiveItem(0);
    },
    /**
     * Termina las sesión del usuario sin borrar nada
     * @param  {Ext.Panel} btn el panel que dispara el evento
     */
    logoutUser: function(panel) {
        var me = this;
        me.getMain().setActiveItem(0);
        me.getMain().down('cotizadorform').reset();
        localStorage.setItem('activate_login', true);
        if (navigator.app) {
            navigator.app.exitApp();
        }
    },
    clearTable: function(store) {
        var me = this,
            store = Ext.getStore(store),
            proxy = store.getModel().getProxy(),
            table = proxy.getTable();
        proxy.getDatabaseObject().transaction(function(tx) {
            tx.executeSql('DELETE FROM ' + table + ' WHERE id > ?', [0]);
        });
    },
    dropTable: function(store) {
        Ext.getStore(store).getModel().getProxy().dropTable();
    },
    setCotizacionDetails: function(form, data) {
        var me = this,
            pagos = {
                Mensual: 12,
                Trimestral: 4,
                Semestral: 2,
                Anual: 1
            };
        me.generarCotizacion(data, form.down('ocupacionselectfield').getRecord(), pagos[data.pago]);
    },
    calcularExtraprima: function(ocupacionRecord, formaPago, coberturas, data) {
        var suma = 0,
            auxSuma,
            me = this;
        //tenemos que ir por las tarifas para hacer los calculos
        if (ocupacionRecord.get('BAS') && data.suma) {
            suma = ((data.suma / 1000) * ocupacionRecord.get('BAS')) / formaPago;
            me.Coberturas['BAS'].extraprima = suma;
        }
        if (ocupacionRecord.get('BIT') && coberturas['BIT']) {
            auxSuma = (coberturas['BIT'].prima * ocupacionRecord.get('BIT')) / formaPago;
            auxSuma = auxSuma - (coberturas['BIT'].prima / formaPago);
            suma = suma + auxSuma;
            me.Coberturas['BIT'].extraprima = suma;
        }
        if (ocupacionRecord.get('CII') && coberturas['CII']) {
            auxSuma = (coberturas['CII'].prima * ocupacionRecord.get('CII')) / formaPago;
            auxSuma = auxSuma - (coberturas['CII'].prima / formaPago);
            suma = suma + auxSuma;
            me.Coberturas['CII'].extraprima = suma;
        }
        if (ocupacionRecord.get('TIBA') && coberturas['TIBA']) {
            auxSuma = (coberturas['TIBA'].prima * ocupacionRecord.get('TIBA')) / formaPago;
            auxSuma = auxSuma - (coberturas['TIBA'].prima / formaPago);
            suma = suma + auxSuma;
            me.Coberturas['TIBA'].extraprima = suma;
        }
        if (ocupacionRecord.get('TIBA') && coberturas['CMA']) { //
            auxSuma = (coberturas['CMA'].prima * ocupacionRecord.get('TIBA')) / formaPago;
            auxSuma = auxSuma - (coberturas['CMA'].prima / formaPago);
            suma = suma + auxSuma;
            me.Coberturas['CMA'].extraprima = suma;
        }
        if (ocupacionRecord.get('GE') && coberturas['GE']) { //
            auxSuma = (coberturas['GE'].prima * ocupacionRecord.get('GE')) / formaPago;
            auxSuma = auxSuma - (coberturas['GE'].prima / formaPago);
            suma = suma + auxSuma;
            me.Coberturas['GE'].extraprima = suma;
        }
        if (ocupacionRecord.get('GFA') && coberturas['GFA']) { //
            auxSuma = (coberturas['GFA'].prima * ocupacionRecord.get('GFA')) / formaPago;
            auxSuma = auxSuma - (coberturas['GFA'].prima / formaPago);
            suma = suma + auxSuma;
            me.Coberturas['GFA'].extraprima = suma;
        }
        return parseFloat(suma).toFixed(2) * 1;
    },
    /*
    simpre se debe de mandar a llamar a este metodo
     */
    ajustarEdad: function(edad, sexo, fuma) {
        edad = (sexo == 'Mujer') ? edad - 3 : edad;
        edad = (fuma == 'NO') ? edad - 2 : edad;
        edad = (edad < 15) ? 15 : edad;
        return edad;
    },
    calculaCoberturaConTarifa: function(data, edad, suma, tipoCobertura, extra, cat) {
        var me = this,
            cancer = (data.genero === 'Mujer') ? 'CANM' : 'CANH',
            auxCobertura = tipoCobertura,
            db = Ext.getStore('Tarifas').getModel().getProxy().getDatabaseObject();
        me.Coberturas = me.Coberturas || {};
        auxCobertura = extra ? (data['tipo' + tipoCobertura] === 'basico' ? 'ACPER Basico' : 'ACPER Extra') : auxCobertura;
        //coberturas tipo cancer
        if (tipoCobertura == 'CAC1' || tipoCobertura == 'CAC2' || tipoCobertura == 'CAC3') {
            auxCobertura = (data['sexo' + tipoCobertura] === 'Mujer') ? 'CANM' : 'CANH';
        }
        db.transaction(function(tx) {
            var query = 'SELECT * FROM TARIFA T JOIN  FACTOR F ON T.id_tarifa = F.id_tarifa  WHERE F.edad = ' + edad + "  AND T.nombre like '" + auxCobertura + "'";
            tx.executeSql(query, [], function(tx, results) {
                var tarifa, cobertura;
                tarifa = results.rows.item(0);
                if (tarifa.nombre == 'CANH' || tarifa.nombre == 'CANM') { //si se trata de las tarifas tipo cancer
                    cobertura = suma / 100000 * tarifa.factor * 12;
                } else if (tarifa.nombre == 'ACPER Basico' || tarifa.nombre == 'ACPER Extra') {
                    cobertura = tarifa.factor;
                } else {
                    cobertura = suma * tarifa.factor / 1000;
                }
                tipoCobertura = cat ? 'CAT' : tipoCobertura;
                me.Coberturas[tipoCobertura] = {
                    cobertura: tipoCobertura,
                    prima: parseFloat(cobertura).toFixed(2) * 1,
                    extraprima: 0,
                    cantidad: suma
                };
            }, function() {});
        });
    },
    generarCotizacion: function(data, ocupacionRecord, pagos) {
        var me = this,
            edadAjustada = me.ajustarEdad(data.edad, data.genero, data.fuma),
            coberturas = {},
            cotizadorConyugue;
        //limpiamos los datos del a consulta pasada
        data.prima = 0;
        data.primaTotal = 0;
        data.coberturas = 0;
        me.Coberturas = undefined;
        me.mask('Calculando ...');
        if (data.suma) { //para el caso de BAS
            //me.calculaCoberturaConTarifa(data, data.edad, data.suma, 'BAS');
            me.calculaCoberturaConTarifa(data, edadAjustada, data.suma, 'BAS');
        }
        if (data.gfa) { //para el caso de GFA
            me.calculaCoberturaConTarifa(data, edadAjustada, data.sumaGFA, 'GFA');
        }
        if (data.bacy) { //para el caso de BACY
            me.calculaCoberturaConTarifa(data, data.edadBACY, data.sumaBACY, 'BACY');
        }
        if (data.gfc) { //para el caso de GFC
            me.calculaCoberturaConTarifa(data, data.edadGFC, data.sumaGFC, 'GFC');
        }
        if (data.gfc1) { //para el caso de GFC1
            me.calculaCoberturaConTarifa(data, data.edadGFC1, data.sumaGFC1, 'GFC1');
        }
        if (data.gfc2) { //para el caso de GFC2
            me.calculaCoberturaConTarifa(data, data.edadGFC2, data.sumaGFC2, 'GFC2');
        }
        if (data.gfc3) { //para el caso de GFC3
            me.calculaCoberturaConTarifa(data, data.edadGFC3, data.sumaGFC3, 'GFC3');
        }
        if (data.ptt) { //para el caso de PTT
            me.calculaCoberturaConTarifa(data, edadAjustada, data.suma, 'PTT', true); //no puedes asegurar a nadie que tenga mayor de 55            
        }
        // en los P0 no se ocupa la suma
        if (data.p01) { //para el caso de P01
            me.calculaCoberturaConTarifa(data, data.edadP01, 0, 'P01', true); //no puedes asegurar a nadie que tenga mayor de 55
        }
        if (data.p02) { //para el caso de P02
            me.calculaCoberturaConTarifa(data, data.edadP02, 0, 'P02', true); //no puedes asegurar a nadie que tenga mayor de 55
        }
        if (data.p03) { //para el caso de P03
            me.calculaCoberturaConTarifa(data, data.edadP03, 0, 'P03', true); //no puedes asegurar a nadie que tenga mayor de 55
        }
        if (data.p04) { //para el caso de P04
            me.calculaCoberturaConTarifa(data, data.edadP04, 0, 'P04', true); //no puedes asegurar a nadie que tenga mayor de 55
        }
        if (data.bac) { //para el caso de BAC
            me.calculaCoberturaConTarifa(data, data.edadBAC, data.sumaBAC, 'BAC');
        }
        if (data.cat) { //para el caso de CAT ocupa GFC
            //me.calculaCoberturaConTarifa(data, edadAjustada, data.sumaCAT , 'CAT');
            me.calculaCoberturaConTarifa(data, edadAjustada, data.sumaCAT, 'GFC', false, true);
        }
        if (data.gfh) { //para el caso de GFH
            me.calculaCoberturaConTarifa(data, data.hijosGFH, data.sumaGFH, 'GFH');
        }
        if (data.bit) { //para el caso de BIT
            setTimeout(function() {
                var sumaParaBIT = 0,
                    coberturasBIT = ['PTT', 'BACY', 'BAC', 'CAT', 'GFA', 'GFH'];
                Ext.each(coberturasBIT, function(item) {
                    sumaParaBIT += me.Coberturas[item] ? me.Coberturas[item].prima : 0;
                }, this);
                me.calculaCoberturaConTarifa(data, edadAjustada, sumaParaBIT * 10, 'BIT'); //aqui va lo de prima total * 10 y sumar los anteriores
            }, 200);
        }
        if (data.ge) { //para el caso de GE
            me.calculaCoberturaConTarifa(data, edadAjustada, data.sumaGE, 'GE');
        }
        if (data.cii) { //para el caso de CII
            me.calculaCoberturaConTarifa(data, edadAjustada, data.sumaCII, 'CII');
        }
        if (data.cma) { //para el caso de CMA
            me.calculaCoberturaConTarifa(data, edadAjustada, data.sumaCMA, 'CMA');
        }
        if (data.tiba) { //para el caso de TIBA
            me.calculaCoberturaConTarifa(data, edadAjustada, data.sumaTIBA, 'TIBA');
        }
        //coberturas de cancer
        if (data.cac1) { //para el caso de CAC1
            me.calculaCoberturaConTarifa(data, data.edadCAC1, data.sumaCAC1, 'CAC1');
        }
        if (data.cac2) { //para el caso de CAC2
            me.calculaCoberturaConTarifa(data, data.edadCAC2, data.sumaCAC2, 'CAC2');
        }
        if (data.cac3) { //para el caso de CAC3
            me.calculaCoberturaConTarifa(data, data.edadCAC3, data.sumaCAC3, 'CAC3');
        }
        setTimeout(function() {
            var suma = 0,
                auxCoberturas = [];
            data.excedente = (data.excedente * 1) || 0;
            data.extraprima = me.calcularExtraprima(ocupacionRecord, pagos, me.Coberturas, data);
            Ext.iterate(me.Coberturas, function(key, item) {
                suma += item.prima;
                item.prima /= pagos;
                item.extraprima /= pagos;
                item.suma = item.prima + item.extraprima;
                item.prima = parseFloat(item.prima).toFixed(2);
                item.extraprima = parseFloat(item.extraprima).toFixed(2);
                item.suma = parseFloat(item.suma).toFixed(2);          
                auxCoberturas.push(item);
            }, me);
            data.prima = (suma / pagos) + data.extraprima;
            data.primaTotal = data.prima + data.excedente + data.extraprima;
            data.primaTotal = parseFloat(data.primaTotal).toFixed(2);
            data.prima = parseFloat(data.prima).toFixed(2);
            data.coberturas = auxCoberturas;
            //calculamos los demas tipos de pago
            data.tiposPago = me.calcularTipoPago(data.prima, data);           
            me.getMain().down('tabpanel').down('cotizadorform').down('resumecontainer').setData(data);
            me.unmask();
        }, 1000);
    },
    calcularTipoPago: function(suma, data) {
        var pagos = {},
            prima = 0,
            primaTotal = 0,
            tiposPago = [],
            obj = {};

        switch(data.pago){
            case 'Diaria':break;
            case 'Quincenal':
                pagos = {
                    Diaria: 15
                };
            break;
            case 'Mensual':
                pagos = {
                    Diaria: 30,
                    Quincenal: 2
                };
            break;
            case 'Trimestral':
                pagos = {
                    Diaria: 90,
                    Quincenal: 6,
                    Mensual: 3
                };
            break;
            case 'Semestral':
                pagos = {
                    Diaria: 180,
                    Quincenal: 12,
                    Mensual: 6,
                    Trimestral: 2
                };
            break;
            case 'Anual':
                pagos = {
                    Diaria: 365,
                    Quincenal: 24,
                    Mensual: 12,
                    Trimestral: 4,
                    Semestral: 2
                };
            break;
        }

        Ext.iterate(pagos, function(key, value) {
            //prima = (suma / value) + data.extraprima;
            //primaTotal = prima + data.excedente + data.extraprima;
            primaTotal = (suma + data.excedente + data.extraprima) / value;
            primaTotal = parseFloat(primaTotal).toFixed(2);
            tiposPago.push({
                pago: key,
                primaTotal: primaTotal
            })
        }, this);
        return tiposPago;
    }
});