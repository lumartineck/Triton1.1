/**
 * @class  Triton.model.Cotizacion
 * @extends Ext.data.Model
 *
 * Este es el modelo para los clientes
 */
Ext.define('Triton.model.Cotizacion', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'edad'
        }, {
            name: 'genero'
        }, {
            name: 'fuma'
        }, {
            name: 'plan'
        }, {
            name: 'pago'
        }, {
            name: 'ocupacion'
        }, {
            name: 'suma',
            defaultValue:0
        }, {
            name: 'excedente',
            defaultValue:0
        }, {
            name: 'tiba'
        }, {
            name: 'sumaTIBA',
            defaultValue:0
        }, {
            name: 'cii'
        }, {
            name: 'sumaCII',
            defaultValue:0
        }, {
            name: 'bit'
        }, {
            name: 'sumaBIT',
            defaultValue:0
        }, {
            name: 'cma'
        }, {
            name: 'sumaCMA',
            defaultValue:0
        }, {
            name: 'cat'
        }, {
            name: 'sumaCAT',
            defaultValue:0
        }, {
            name: 'gfa'
        }, {
            name: 'sumaGFA',
            defaultValue:0
        }, {
            name: 'ge'
        }, {
            name: 'sumaGE',
            defaultValue:0
        }, {
            name: 'bac'
        }, {
            name: 'sumaBAC',
            defaultValue:0
        }, {
            name: 'edadBAC'
        }, {
            name: 'bacy'
        }, {
            name: 'sumaBACY',
            defaultValue:0
        }, {
            name: 'edadBACY'
        }, {
            name: 'cac1'
        }, {
            name: 'sumaCAC1',
            defaultValue:0
        }, {
            name: 'edadCAC1'
        }, {
            name: 'sexoCAC1'
        }, {
            name: 'cac2'
        }, {
            name: 'sumaCAC2',
            defaultValue:0
        }, {
            name: 'edadCAC2'
        }, {
            name: 'sexoCAC2'
        }, {
            name: 'cac3'
        }, {
            name: 'sumaCAC3',
            defaultValue:0
        }, {
            name: 'edadCAC3'
        }, {
            name: 'sexoCAC3'
        }, {
            name: 'gfc'
        }, {
            name: 'sumaGFC',
            defaultValue:0
        }, {
            name: 'edadGFC'
        }, {
            name: 'gfh'
        }, {
            name: 'sumaGFH',
            defaultValue:0
        }, {
            name: 'hijosGFH'
        }, {
            name: 'gfc1'
        }, {
            name: 'sumaGFC1',
            defaultValue:0
        }, {
            name: 'edadGFC1'
        }, {
            name: 'gfc2'
        }, {
            name: 'sumaGFC2',
            defaultValue:0
        }, {
            name: 'edadGFC2'
        }, {
            name: 'gfc3'
        }, {
            name: 'sumaGFC3',
            defaultValue:0
        }, {
            name: 'edadGFC3'
        }, {
            name: 'ptt'
        }, {
            name: 'tipoPTT'
        }, {
            name: 'p01'
        }, {
            name: 'edadP01'
        }, {
            name: 'tipoP01'
        }, {
            name: 'p02'
        }, {
            name: 'edadP02'
        }, {
            name: 'tipoP02'
        }, {
            name: 'p03'
        }, {
            name: 'edadP03'
        }, {
            name: 'tipoP03'
        }, {
            name: 'p04'
        }, {
            name: 'edadP04'
        }, {
            name: 'tipoP04'
        }],
        validations: [{
            field: 'edad',
            type: 'presence',
            message: 'Ingrese la edad del titular'
        }, {
            field: 'edad',
            type: 'edadTitular',
            message: 'Las edades de aceptación para el asegurado titular van de 15 a 70 años'
        }, {
            field: 'ocupacion',
            type: 'presence',
            message: 'Debe seleccionar una ocupación'
        }, {
            field: 'suma',
            type: 'presence',
            message: 'La suma asegurada es obligatoria'
        }, {
            field: 'suma',
            type: 'sumaAsegurada',
            message: 'La suma asegurada no puede ser menor que 30,000 ni mayor a 10,000,000'
        }, {
            field: 'sumaGE',
            type: 'sumaGE',
            message: 'La suma GE debe ser mayor a 0'
        }, {
            field: 'sumaCII',
            type: 'sumaCII',
            message: 'CII solo puede calcular en el rango de 30,000 a la cobertura BAS'
        }, {
            field: 'sumaTIBA',
            type: 'sumaTIBA',
            message: 'TIBA solo puede calcular en el rango de 30,000 a la cobertura BAS'
        }, {
            field: 'sumaCMA',
            type: 'sumaCMA',
            message: 'CMA solo puede calcular en el rango de 30,000 a la cobertura BAS'
        }, {
            field: 'sumaGFA',
            type: 'rangoSumaGFA',
            message: 'GFA solo puede calcular en el rango de 34,476 a 172,380'
        }, {
            field: 'sumaGFA',
            type: 'sumaGFA',
            message: 'GFA debe ser menor al 35% de BAS'
        }, {
            field: 'gfc',
            type: 'gfcValidation',
            message: 'GFC + BACY no puede ser mayor que BAS'
        }, {
            field: 'edadGFC',
            type: 'gfcEdadConyuge',
            message: 'Las edades de aceptación para el Conyuge en GFC van de los 15 a lo 70 años'
        }, {
            field: 'sumaGFC',
            type: 'rangoSumaGFC',
            message: 'GFC solo puede calcular en el rango de 34,476 a 172,380'
        }, {
            field: 'sumaGFC',
            type: 'sumaGFC',
            message: 'GFC debe ser menor al 35% de BAS'
        }, {
            field: 'hijosGFH',
            type: 'gfhNumeroHijos',
            message: 'Debe establecer un número de Hijos para GFH'
        }, {
            field: 'sumaGFH',
            type: 'rangoSumaGFH',
            message: 'GFC solo puede calcular en el rango de 34,476 a 172,380'
        }, {
            field: 'sumaGFH',
            type: 'sumaGFH',
            message: 'GFH debe ser menor al 35% de BAS'
        },{
            field: 'edadBACY',
            type: 'bacyEdad',
            message: 'Las edades de aceptación para el BACY van de los 15 a lo 70 años'
        }, {
            field: 'sumaBACY',
            type: 'rangoSumaBACY',
            message: 'BACY solo puede calcular en el rango de 30,000 a 344,760'
        }, {
            field: 'sumaBACY',
            type: 'sumaBACY',
            message: 'BACY no puede ser mayor a BAS'
        },{
            field: 'edadBAC',
            type: 'bacEdad',
            message: 'Las edades de aceptación para el BAC van de los 15 a lo 70 años'
        }, {
            field: 'sumaBAC',
            type: 'rangoSumaBAC',
            message: 'BAC solo puede calcular en el rango de 30,000 a la suma asegurada'
        }, {
            field: 'sumaBAC',
            type: 'sumaBAC',
            message: 'BAC debe ser menor al 35% de BAS'
        }, {
            field: 'edadCAC1',
            type: 'edadCAC1',
            message: 'Las edades de aceptación para el beneficiario CAC1 van de los 15 a lo 65 años'
        }, {
            field: 'sumaCAC1',
            type: 'sumaCAC1',
            message: 'CAC1 solo puede calcular en el rango de 30,000 a 1,000,000'
        }, {
            field: 'sumaCAC1',
            type: 'suma2CAC1',
            message: 'CAC1 debe ser menor al 35% de BAS'
        }, {
            field: 'sexoCAC1',
            type: 'sexoCAC1',
            message: 'Debe seleccionar el sexo de la cobertura CAC1'
        }, {
            field: 'edadCAC2',
            type: 'edadCAC2',
            message: 'Las edades de aceptación para el beneficiario CAC2 van de los 15 a lo 65 años'
        }, {
            field: 'sumaCAC2',
            type: 'sumaCAC2',
            message: 'CAC2 solo puede calcular en el rango de 30,000 a 1,000,000'
        }, {
            field: 'sumaCAC2',
            type: 'suma2CAC2',
            message: 'CAC2 debe ser menor al 35% de BAS'
        }, {
            field: 'sexoCAC2',
            type: 'sexoCAC2',
            message: 'Debe seleccionar el sexo de la cobertura CAC2'
        }, {
            field: 'edadCAC3',
            type: 'edadCAC3',
            message: 'Las edades de aceptación para el beneficiario CAC3 van de los 15 a lo 65 años'
        }, {
            field: 'sumaCAC3',
            type: 'sumaCAC3',
            message: 'CAC3 solo puede calcular en el rango de 30,000 a 1,000,000'
        }, {
            field: 'sumaCAC3',
            type: 'suma2CAC3',
            message: 'CAC3 debe ser menor al 35% de BAS'
        }, {
            field: 'sexoCAC3',
            type: 'sexoCAC3',
            message: 'Debe seleccionar el sexo de la cobertura CAC3'
        }, {
            field: 'sumaCAT',
            type: 'sumaCAT',
            message: 'El valor de CAT debe ser mayor a 0 y menor a la Suma Asegurada'
        }, {
            field: 'edadGFC1',
            type: 'edadGFC1',
            message: 'Las edades de aceptación para el GFC1 van de los 15 a lo 70 años'
        }, {
            field: 'sumaGFC1',
            type: 'rangoSumaGFC1',
            message: 'GFC1 solo puede calcular en el rango de 34,476 a 172,380'
        }, {
            field: 'sumaGFC1',
            type: 'sumaGFC1',
            message: 'GFC1 debe ser menor al 35% de BAS'
        }, {
            field: 'edadGFC2',
            type: 'edadGFC2',
            message: 'Las edades de aceptación para el GFC2 van de los 15 a lo 70 años'
        }, {
            field: 'sumaGFC2',
            type: 'rangoSumaGFC2',
            message: 'GFC2 solo puede calcular en el rango de 34,476 a 172,380'
        }, {
            field: 'sumaGFC2',
            type: 'sumaGFC2',
            message: 'GFC2 debe ser menor al 35% de BAS'
        }, {
            field: 'edadGFC3',
            type: 'edadGFC3',
            message: 'Las edades de aceptación para el GFC3 van de los 15 a lo 70 años'
        }, {
            field: 'sumaGFC3',
            type: 'rangoSumaGFC3',
            message: 'GFC3 solo puede calcular en el rango de 34,476 a 172,380'
        }, {
            field: 'sumaGFC3',
            type: 'sumaGFC3',
            message: 'GFC3 debe ser menor al 35% de BAS'
        }, {
            field: 'edadP01',
            type: 'edadP01',
            message: 'Las edades de aceptación para el P01 van de los 15 a lo 70 años'
        }, {
            field: 'edadP02',
            type: 'edadP02',
            message: 'Las edades de aceptación para el P02 van de los 15 a lo 70 años'
        }, {
            field: 'edadP03',
            type: 'edadP03',
            message: 'Las edades de aceptación para el P03 van de los 15 a lo 70 años'
        }, {
            field: 'edadP04',
            type: 'edadP04',
            message: 'Las edades de aceptación para el P04 van de los 15 a lo 70 años'
        }]
    },
    constructor: function() {
        var me = this;
        me.callParent();
        //Custom validations for this model
        Ext.applyIf(Ext.data.Validations, {
            edadTitular: function(config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return value >= 15 && value <= 70;
            },
            sumaAsegurada: function(config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return value >= 30000 && value <= 10000000;
            },
            sumaCII: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cii || value >= 30000 && value <= suma ;
            }, 
            sumaGE: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.ge || value > 0;
            },
            sumaTIBA: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.tiba || value >= 30000 && value <= suma ;
            },
            sumaCMA: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cma || value >= 30000 && value <= suma ;
            },
            rangoSumaGFA:function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfa || value >= 34476 && value <= 172380 ;
            },
            sumaGFA:function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfa || value <= (suma *.35);
            },
            gfcValidation:function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return (!data.gfc && !data.bacy) ||  (data.sumaGFC + data.sumaBACY) <= suma;
            },
            gfcEdadConyuge: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc || (data.edadGFC >= 14 && data.edadGFC <= 70);
            },
            rangoSumaGFC: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc || value >= 34476 && value <= 172380 ;
            },
            sumaGFC:function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc || value <= (suma *.35);
            },
            gfhNumeroHijos: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfh || (data.hijosGFH > 0);
            },
            rangoSumaGFH: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfh || value >= 34476 && value <= 172380 ;
            },
            sumaGFH:function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfh || value <= (suma *.35);
            },
            bacyEdad: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.bacy || (data.edadBACY >= 14 && data.edadBACY <= 70);
            },
            rangoSumaBACY: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.bacy || (value >= 30000 && value <= 344760) ;
            },
            sumaBACY:function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.bacy || value < suma;
            },
            bacEdad: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.bac || (data.edadBAC >= 14 && data.edadBAC <= 70);
            },
            rangoSumaBAC: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.bac || (value >= 30000 && value <= suma) ;
            },
            sumaBAC:function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.bac || value <= suma;
            },
            edadCAC1: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac1 || value >= 15 && value <= 65 ;
            },
            sumaCAC1: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac1 || value >= 30000 && value <= 1000000 ;
            },
            suma2CAC1: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac1 || value <= (suma *.35);
            },
            sexoCAC1: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac1 || data.sexoCAC1;
            },
            edadCAC2: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac2 || value >= 15 && value <= 65 ;
            },
            sumaCAC2: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac2 || value >= 30000 && value <= 1000000 ;
            },
            suma2CAC2: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac2 || value <= (suma *.35);
            },
            sexoCAC2: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac2 || data.sexoCAC2;
            },
            edadCAC3: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac3 || value >= 15 && value <= 65 ;
            },
            sumaCAC3: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac3 || value >= 30000 && value <= 1000000 ;
            },
            suma2CAC3: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac3 || value <= (suma *.35);
            },
            sexoCAC3: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cac3 || data.sexoCAC3;
            },
            sumaCAT : function  (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.cat || (value >= 0 && value <= suma);
            },
            edadGFC1: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc1 || (value >= 15 && value <= 70);
            },
            rangoSumaGFC1: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc1 || value >= 34476 && value <= 172380 ;
            },
            sumaGFC1: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc1 || value <= (suma *.35);
            },
            edadGFC2: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc2 || (value >= 15 && value <= 70);
            },
            rangoSumaGFC2: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc2 || value >= 34476 && value <= 172380 ;
            },
            sumaGFC2: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc2 || value <= (suma *.35);
            },
            edadGFC3: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc3 || (value >= 15 && value <= 70);
            },
            rangoSumaGFC3: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc3 || value >= 34476 && value <= 172380 ;
            },
            sumaGFC3: function (config, value, data) {
                var suma = data.suma * 1;
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.gfc3 || value <= (suma *.35);
            },
            edadP01: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.p01 || (value >= 15 && value <= 70);
            },
            edadP02: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.p02 || (value >= 15 && value <= 70);
            },
            edadP03: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.p03 || (value >= 15 && value <= 70);
            },
            edadP04: function (config, value, data) {
                if (arguments.length === 1) {
                    value = config;
                }
                return !data.p04 || (value >= 15 && value <= 70);
            }
        });
    },
    validate: function() {
        var errors      = Ext.create('Ext.data.Errors'),
            validations = this.getValidations().items,
            validators  = Ext.data.Validations,
            length, validation, field, valid, type, i;

        if (validations) {
            length = validations.length;

            for (i = 0; i < length; i++) {
                validation = validations[i];
                field = validation.field || validation.name;
                type  = validation.type;
                valid = validators[type](validation, this.get(field), this.getData());

                if (!valid) {
                    errors.add(Ext.create('Ext.data.Error', {
                        field  : field,
                        message: validation.message || validators.getMessage(type)
                    }));
                }
            }
        }
        return errors;
    }
});