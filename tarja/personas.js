var CurrentObject,hasUpdate,hasInsert;
function Mascaras()
{
    jQuery(function ($) {
        jQuery("[name='DNI']").mask("?99.999.999");
        
    });
}

function FormField(record)
{
    try { 
        var tdni = [['DNI', 'DNI'], ['LC', 'LC'], ['LE', 'LE']];
        
        var required = '<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';
        var formFields = [
            {
                xtype: 'displayfield',
                fieldLabel: 'ID',
                name: 'PersonaId',
                value: (record ? record.data['PersonaId'] : null),
                editable: false
            },
            {
                fieldLabel: 'Nombre',
                name: 'Nombre',
                width:'80%',
                afterLabelTextTpl: required,
                value: (record ? record.data['Nombre'] : null),
                allowBlank: false
            }
            ,
            {
                fieldLabel: 'Apellido',
                name: 'Apellido',
                width:'80%',
                afterLabelTextTpl: required,
                value: (record ? record.data['Apellido'] : null),
                allowBlank: false
            },
            {
                fieldLabel: 'Fecha Nac.',
                name: 'FechaNac',
                value: (record ? record.data['FechaNac'] : null),
                width: '33%',
                xtype: 'datefield',
                format: 'd/m/Y',
                submitFormat: 'Y-m-d H:i:s',
            },
            {
                fieldLabel: 'Ingreso',
                name: 'FechaIngreso',
                value: (record ? record.data['FechaIngreso'] : null),
                afterLabelTextTpl: required,
                allowBlank: false,
                width: '33%',
                xtype: 'datefield',
                format: 'd/m/Y',
                submitFormat: 'Y-m-d H:i:s',
            },{
                xtype: 'combo',
                fieldLabel: 'Tipo DNI',
                name: 'TipoDNI',
                store: new Ext.data.ArrayStore({
                    fields: ['Tipo', 'Nombre'],
                    data: tdni
                }),
                afterLabelTextTpl: required,
                valueField: 'Tipo',
                displayField: 'Nombre',
                editable: false,
                forceSelection: true,
                allowBlank: false,
                width: '33%',
                value: (record ? record.data['TipoDNI'].replaceAll(' ', '') : null)
            },
            {
                fieldLabel: 'DNI',
                name: 'DNI',
                width: '33%',
                value: (record ? record.data['DNI'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                fieldLabel: 'Domicilio',
                name: 'Domicilio',
                width: '80%',
                value: (record ? record.data['Domicilio'] : null),
          
            },
            {
                fieldLabel: 'Legajo',
                name: 'Legajo',
                width: '30%',
                value: (record ? record.data['Legajo'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                fieldLabel: 'Tel',
                name: 'Telefono',
                value: (record ? record.data['Telefono'] : null),
                width: '43%'
            },
            {
                fieldLabel: 'Cargo',
                name: 'CargoDesc',
                width: '80%',
                value: (record ? record.data['CargoDesc'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                fieldLabel: 'Cat',
                name: 'Categoria',
                width: '23%',
                value: (record ? record.data['Categoria'] : null),
                afterLabelTextTpl: required,
                allowBlank: false
            },
            {
                xtype: 'checkboxfield',
                name: 'Activo',
                id: 'Activo',
                fieldLabel: 'Activo',
                boxLabel: 'Esta activo?',
                afterLabelTextTpl: required,
                checked: (record ? (record.data['Activo'] == 'off' ? false : true) : null)
            }
        ];
        return formFields;
    }
    catch (e)
    {
        SendJsError(e, "FormField - addperso.js", record);
    }
}

function GuardarPersona(form, action)
{
    try
    {
        var rec = form.getValues();
        var personas;

        if (action !== "add") {
            if (!hasUpdate) {
                return;
            }
            rec['PersonaId'] = CurrentObject.data['PersonaId'];
            personas = JSON.stringify(rec);
            
            x_GuardarPersona(personas, GuardarPersona_callback);
        }
        else
        {
            personas = JSON.stringify(rec);
            x_AgregarPersona(personas, AgregarPersona_callback);
        }


    }
    catch (e)
    {
       SendJsError(e, "GuardarPersona - addperso.js", action);
    }
}
function AgregarPersona_callback(response)
{
 

    if (response)
    {
        humane.success("Se ha agregado la persona correctamente.");
        x_LoadPersonas(LoadPersonas_callback);
    }
    else
    {
        humane.error("Hubo un error al agregar los datos.");
        console.log(response);
        console.log("hay error");
        SendJsError(new Error("Error AgregarPersona_callback - personas.js"), "personas.js", response);
    }

}

function GuardarPersona_callback(response)
{
   
    if (response)
    {
        humane.success("Se ha guardado la persona correctamente.");
        console.log("OK!");
        console.log("Datos:" + response);
        x_LoadPersonas(LoadPersonas_callback);
    }
    else
    {
        humane.error("Hubo un error al guardar los datos.");
        console.log("ERROR!");
        console.log(response);
        SendJsError(new Error("Error GuardarPersona - GuardarPersona_callback"), "personas.js", response);
    }

}

function PopinPersona(action, record, rIdx, grid)
{
    try
    {
        var formFields = FormField(record);
        CurrentObject = record;
        var title;
        if (action === "add")
            title = "Agregar Persona";
        else
            title = "Editar Persona";
        console.log("Por crear popin");
        var win = Ext.create("Ext.window.Window", {
            title: title,
            bodyStyle: "padding: 15px;border:none;",
            width: 700,
            closable: true,
            //modal: true,
            items: {
                xtype: "form",
                //frame: true,
                defaultType: "textfield",
                //overflowY: 'auto',
                bodyStyle: "padding: 15px;border:none;",
                items: formFields,
                buttons: [
                    {
                        text: "Agregar",
                        id: "new-record-add-button",
                        handler: function () {
                            var form = this.up("form").getForm();
                            if (form.isValid())
                            {
                                GuardarPersona(form, action);
                                this.up("window").close();
                            }
                        }
                    },
                    {
                        text: "Cancelar",
                        handler: function () {
                            this.up("window").close();
                        }
                    }

                ]
            }
        });
        return win;
    }
    catch (e)
    {
        SendJsError(e, "PopinPersona - personas.js", action);
    }
}

function GridPanel(store)
{
    try
    {
        Ext.tip.QuickTipManager.init();
        var win;
        var grid = Ext.create('Ext.grid.Panel', {
            store: store,
            columns: [{
                    header: 'Nombre',
                    dataIndex: 'Empleado',
                    flex: 1,
                    width:'300px',
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Ingreso',
                    dataIndex: 'FechaIngreso',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Nac.',
                    dataIndex: 'FechaNac',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Domicilio',
                    dataIndex: 'Domicilio',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Leg',
                    dataIndex: 'Legajo',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Tipo',
                    dataIndex: 'TipoDNI',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'DNI',
                    dataIndex: 'DNI',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Cargo',
                    dataIndex: 'CargoDesc',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Cat.',
                    dataIndex: 'Categoria',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                },
                {
                    header: 'Tel',
                    dataIndex: 'Telefono',
                    flex: 1,
                    editor: {
                        allowBlank: false
                    }
                }/*,
                 {
                 header: 'Activo',
                 dataIndex: 'Activo',
                 width: 60
                 }*/,
                {
                    menuDisabled: true,
                    sortable: false,
                    xtype: 'actioncolumn',
                    header: 'Acciones',
                    align: 'center',
                    width: 70,
                    items: [ {
                            icon: '../images/icons/edit16x16.png',
                            tooltip: 'Editar',
                            align: 'center',
                            altText: 'Editar',
                            handler: function (grid, rowIndex, colIndex) {
                                if (hasUpdate) {
                                    var record = grid.store.getAt(rowIndex);
                                    var win = PopinPersona('edit', record, rowIndex, grid);
                                    win.show();
                                    Mascaras();
                                }
                            }

                        }]
                }
            ],
            //plugins: {                editing: true            },
            renderTo: 'tblPersonas',
            width: '98%',
            height: '80%',
            title: 'Personal  - Dirección General de Obras y Servicios',
            frame: true,
            tbar: [{
                    text: 'Agregar Persona',
                    iconCls: 'icon-add',
                    handler: function () {
                        if (hasInsert) {
                            var record = null;
                            var win = PopinPersona('add', record, 0, grid);
                            win.show();
                            Mascaras();
                        }
                    }
                }
                ,{
                    text: 'Imprimir',
                    iconCls: 'icon-print',
                    handler: function () {
                     
                        
                        Ext.ux.grid.Printer.mainTitle = "Personal ";
                        Ext.ux.grid.Printer.headerText = "Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios";
                        Ext.ux.grid.Printer.printLinkText = "Imprimir";
                        Ext.ux.grid.Printer.closeLinkText = "Cerrar";
                        Ext.ux.grid.Printer.printAutomatically = false;
                        Ext.ux.grid.Printer.print(grid);
                    }
                }
            ], viewConfig: {
                getRowClass: function (record, index) {
                    var active = record.get('Activo');
                //    console.log(active);
                    return (active === 'off' ? 'inactive' : '');

                }
            }
        });
        return grid;
    }
    catch (e)
    {
        SendJsError(e, "GridPanel - personas.js", "load grid");
    }
    return null;
}

$(function () {
    x_LoadPersonas(hasUpdate, hasInsert, LoadPersonas_callback);
});
function LoadPersonas_callback(response)
{
    try
    {
        $("#tblPersonas").html("");
        var data = ObjToArray(response[1]);
        //  console.log("daaaaa");
        //  console.log(data);
        Ext.onReady(function () {
            Ext.define('Personas', {
                extend: 'Ext.data.Model',
                fields: [
                    'PersonaId', 'Nombre', 'Apellido', 'Empleado', 'Legajo', 'TipoDNI', 'CargoDesc',
                    'Categoria', 'UserId', 'Telefono',
                    'Email', 'Domicilio', 'Activo',
                    'VacacionesDias', 'Observaciones', 'Antiguedad',
                    'Compensatorio', 'CUIL', 'FechaNac',
                    'FechaIngreso', 'DNI', 'AntAnses']
            });
            var store = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                model: 'Personas',
                proxy: {type: 'memory'},
                data: data,
                sorters: [{
                        property: 'Empleado',
                        direction: 'ASC'
                    }]
            });
            var grid = GridPanel(store);
        });
    }
    catch (e)
    {
        SendJsError(e, "LoadPersonas_callback - personas.js", response);
    }
}



function DeletePersona_callback(response)
{

    if (response)
    {
        humane.success("Se ha eliminado la persona correctamente.");
        x_LoadChoferes(hasUpdate, hasInsert, LoadChoferes_callback);
    }
    else
    {
        humane.error("Hubo un error al eliminar la persona.");
        SendJsError(new Error("Error DeletePersona-personas.js"), "personas.js", response);
    }

}
