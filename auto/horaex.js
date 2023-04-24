var date = new Date();
var mes = date.getMonth();
mes = mes + 1;
var anio = date.getFullYear();
var CurrentObject;
var personaId, depId;
personaId = 0;
depId = 0;
var grid, ridx, deps, pers, ve;
var data, store;

x_LoadHoraEx(mes, anio, personaId, depId, LoadHoraEx_callback);
function LoadModel() {
  Ext.define("HoraEx", {
    extend: "Ext.data.Model",
    fields: [
      "HoraExId",
      "PersonaId",
      "Interrupciones",
      "Hora100",
      "Hora50",
      "Responsable",
      "Dependencia",
      "TTEntrada",
      "TTSalida",
      "TMEntrada",
      "TMSalida",
      "Fecha",
      "FechaG",
      "Entrada",
      "Salida",
      "Horario",
      "Concepto",
      "Calculado",
      "DescansosId",
      "Zona",
      "TotalHoras",
      "DependenciaId",
      "Create",
      "Modified",
      "VehiculoId",
      "PersonaName",
      "Laboral",
      "Jornada",
      "EstadoId",
      "Estado",
    ],
  });
}
function LoadStore(data) {
  store = Ext.create("Ext.data.Store", {
    autoDestroy: true,
    model: "HoraEx",
    proxy: {
      type: "memory",
    },
    data: data,
    sorters: [
      {
        property: "Modelo",
        direction: "ASC",
      },
    ],
  });
  return store;
}

function GridPanel(store) {
  try {
    var meses = [
      [1, "Enero"],
      [2, "Febrero"],
      [3, "Marzo"],
      [4, "Abril"],
      [5, "Mayo"],
      [6, "Junio"],
      [7, "Julio"],
      [8, "Agosto"],
      [9, "Septiembre"],
      [10, "Octubre"],
      [11, "Noviembre"],
      [12, "Diciembre"],
    ];
    var stmes = new Ext.data.ArrayStore({
      fields: ["id", "mes"],
      data: meses,
    });
    var anios = arrayAnios();
    var stanio = new Ext.data.ArrayStore({
      fields: ["id", "anio"],
      data: anios,
    });
    var b = [0, "Todos"];
    var persg = pers.slice();
    persg.push(b);

    var personas = new Ext.data.ArrayStore({
      fields: ["PersonaId", "Personas"],
      data: persg,
    });
    var a = [0, "Todas"];
    var depsg = deps.slice();
    depsg.push(a);
    var stdeps = new Ext.data.ArrayStore({
      fields: ["DependenciaId", "Nombre"],
      data: depsg,
    });
    Ext.tip.QuickTipManager.init();
    var cellEditing = Ext.create("Ext.grid.plugin.CellEditing", {
      clicksToEdit: 1,
    });
    var estados = [
      [0, "Pendiente"],
      [1, "Presentada"],
    ];
    var stestados = new Ext.data.ArrayStore({
      fields: ["EstadoId", "Estado"],
      data: estados,
    });

    var cmbMes = Ext.create("Ext.form.field.ComboBox", {
      fieldLabel: "Mes",
      labelWidth: 25,
      store: stmes,
      id: "ddlMes",
      valueField: "id",
      displayField: "mes",
      typeAhead: true,
      mode: "local",
      value: mes,
      width: 130,
      emptyText: "......",
      listeners: {
        select: function (combo, record, idx) {
          mes = combo.value;
          //console.log("Por mes");
          x_LoadGridOnly(mes, anio, personaId, depId, LoadGridOnly_callback);
        },
      },
    });

    var cmbAnio = Ext.create("Ext.form.field.ComboBox", {
      fieldLabel: "Año",
      labelWidth: 25,
      store: stanio,
      id: "ddlAnio",
      valueField: "id",
      displayField: "anio",
      typeAhead: true,
      mode: "local",
      value: anio,
      width: 130,
      emptyText: "......",
      listeners: {
        select: function (combo, record, idx) {
          anio = combo.value;
         // console.log("Por anio");
          x_LoadGridOnly(mes, anio, personaId, depId, LoadGridOnly_callback);
        },
      },
    });

    var cmbPersona = Ext.create("Ext.form.field.ComboBox", {
      fieldLabel: "Persona",
      labelWidth: 60,
      store: personas,
      id: "ddlPersonas",
      valueField: "PersonaId",
      displayField: "Personas",
      value: personaId,
      mode: "local",
      width: 300,
      emptyText: "......",
      listeners: {
        select: function (combo, record, idx) {
          personaId = combo.value;
          x_LoadGridOnly(mes, anio, personaId, depId, LoadGridOnly_callback);
        },
      },
    });
    var cmbDepen = Ext.create("Ext.form.field.ComboBox", {
      xtype: "combo",
      fieldLabel: "Dependencia",
      labelWidth: 90,
      store: stdeps,
      id: "ddlDependencias",
      valueField: "DependenciaId",
      displayField: "Nombre",
      typeAhead: true,
      mode: "local",
      value: depId,
      width: 350,
      emptyText: "......",
      listeners: {
        select: function (combo, record, idx) {
          depId = combo.value;
          x_LoadGridOnly(mes, anio, personaId, depId, LoadGridOnly_callback);
        },
      },
    });

    grid = Ext.create("Ext.grid.Panel", {
      store: store,
      features: [
        {
          ftype: "summary",
          id: "summary",
        },
      ],
      columns: [
        {
          header: "Dia",
          dataIndex: "FechaG",
          flex: 1,
        },
        {
          header: "Horario Cumplido",
          dataIndex: "Horario",
          flex: 1,
        },
        {
          header: "Concepto",
          dataIndex: "Concepto",
          flex: 1,
        },
        {
          header: "Interrupciones",
          dataIndex: "Interrupciones",
          flex: 1,
          summaryType: function (records) {
            return "<b>TOTALES</b>";
          },
        },
        {
          header: "Persona",
          dataIndex: "PersonaName",
          flex: 1,
        },
        {
          header: "Dependencia",
          dataIndex: "Dependencia",
          flex: 1,
        },
        {
          header: "Horario Laboral",
          dataIndex: "Laboral",
          flex: 1,
        },
        {
          header: "Hs. Hábiles",
          dataIndex: "Hora50",
          format: "H:i",
          flex: 1,
          summaryType: function (records) {
            var dataIndex = "Hora50";
            return SumTime(records, dataIndex);
          },
          summaryRenderer: function (value, summaryData, dataIndex) {
            return value;
          },
        },
        {
          header: "Hs. Inhábiles",
          dataIndex: "Hora100",
          format: "H:i",
          flex: 1,
          summaryType: function (records) {
            var dataIndex = "Hora100";
            return SumTime(records, dataIndex);
          },
          summaryRenderer: function (value, summaryData, dataIndex) {
            return value;
          },
        },
        {
          header: "Jornada",
          dataIndex: "Jornada",
          flex: 1,
        },
        {
          header: "Estado",
          dataIndex: "Estado",
          flex: 1,
          editor: {
            allowBlank: false,
            xtype: "combobox",
            queryMode: "local",
            valueField: "Estado",
            displayField: "Estado",
            width: 100,
            // value:'EstadoId',
            store: stestados,
            listeners: {
              /*change: function (thisCmb, newValue, oldValue) {
                  //
                  var data = GetAllDataGrid(grid);
                  data[0].Estado = newValue;
                  if (newValue === "Presentada") data[0].EstadoId = "1";
                  else data[0].EstadoId = "0";
                  SaveEstado(data);
                  //console.log(data);
                },
                beforerender: function (thisCmb, eOpts) {
                  //console.log("antes de renderizar"); console.log(thisCmb);
                },*/
            },
          },
        },
        {
          menuDisabled: true,
          sortable: false,
          xtype: "actioncolumn",
          header: "Acciones",
          align: "center",
          width: 90,
          items: [
           
            {
              icon: "../images/icons/edit16x16.png",
              tooltip: "Editar",
              align: "center",
              altText: "Editar",
              handler: function (grid, rowIndex, colIndex) {
                var record = grid.store.getAt(rowIndex);
                var win = PopinHoraEx("edit", record);
                win.show();
                ridx = rowIndex;
              },
            }, 
            {
                icon: "../images/icons/fam/delete.gif", // Use a URL in the icon config
                tooltip: "Borrar",
                align: "center",
                altText: "Borrar",
                cls: "x-icon-action",
                handler: function (grid, rowIndex, colIndex) {
                  var record = grid.store.getAt(rowIndex);
                  DeleteHoraEx(record, grid);
                },
              }
          ]
        },
      ],
      renderTo: "tblHoraEx",

      width: "98%",
      height: "80%",
      title: "Horas Extraordinarias - DGOyS UNSa",
      //frame: true,
      tbar: [
        cmbMes,
        cmbAnio,
        cmbPersona,
        cmbDepen,

        {
          text: "Agregar",
          iconCls: "icon-add",
          handler: function () {
            if (hasInsert) {
              var record = null;
              var win = PopinHoraEx("add", record);
              win.show();
            }
          },
        },
      ],
     
      plugins: [cellEditing],
    });
    return grid;
  } catch (e) {
    SendJsError(e, "GridPanel - horaex.js", "load grid");
  }
}
var gridid;
function LoadGridOnly_callback(response) {
  try {
    data = ObjToArray(response[1]);
    store = LoadStore(data);
    grid = Ext.getCmp(gridid);
    var store = grid.getStore();
    store.setData(data);
    var view = grid.getView();
    view.refresh();
  } catch (e) {
    SendJsError(e, "LoadHoraEx_callback - horaex.js", response);
  }
}
function LoadHoraEx_callback(response) {
  try {
    $("#tblHoraEx").html("");
    data = ObjToArray(response[1]);
    deps = ObjToArray(response[2]);
    pers = ObjToArray(response[3]);
    ve = ObjToArray(response[4]);
    Ext.onReady(function () {
      LoadModel();
      store = LoadStore(data);
      grid = GridPanel(store, pers, deps);    
      gridid = grid.id;
      grid.show();
    });
  } catch (e) {
    SendJsError(e, "LoadHoraEx_callback - horaex.js", response);
  }
}
function GridPopin(store)
{
  var rowEditing = Ext.create("Ext.grid.plugin.RowEditing", {
    clicksToMoveEditor: 1,
    autoCancel: false,
  });

  var grid = Ext.create("Ext.grid.Panel", {
    store: store,
    id: "gridDesc",
    columns: [
      {
        header: "Entrada",
        dataIndex: "entrada",
        flex: 1,
        with:'50%',
        editor: {
          allowBlank: false,
        },
      },
      {
        header: "Salida",
        dataIndex: "salida",
        with:'50%',
        editor: {
          allowBlank: false,
        },
      },
    ],
    height: 200,
    title: "Interrupciones",
   // frame: true,
    tbar: [
      {
        text: "Agregar",
        iconCls: "icon-add",
        handler: function () {
          rowEditing.cancelEdit();
          var r = Ext.create("Interrupciones", {
            entrada: "13:30:00",
            salida: "14:30:00",
          });
          store.insert(0, r);
          rowEditing.startEdit(0, 0);
        },
      },
      {
        itemId: "removeDescanso",
        text: "Borrar",
        iconCls: "icon-remove",
        handler: function () {
          var sm = grid.getSelectionModel();
          rowEditing.cancelEdit();
          store.remove(sm.getSelection());
          if (store.getCount() > 0) {
            sm.select(0);
          }
        },
        disabled: true,
      },
    ],
    plugins: [rowEditing],
    listeners: {
     selectionchange: function (view, records) {
        grid.down("#removeDescanso").setDisabled(!records.length);
      },
    },
  });
  return grid;
}
function LoadCmbZona(record,required)
{
   var zonas = [
    ["1", "Hábil"],
    ["2", "Inhábil"],
  ];
  var zona = record ? record.data["Zona"] : null;
  var stzonas = new Ext.data.ArrayStore({
    fields: ["Id", "Zona"],
    data: zonas,
   });
  var cmbZona = Ext.create("Ext.form.field.ComboBox", {
    xtype: "combo",
    fieldLabel: "Zona",
    id: "Zona",
    name: "Zona",
    store: stzonas,
    afterLabelTextTpl: required,
    valueField: "Id",
    displayField: "Zona",
    editable: false,
    allowBlank: false,
    width: 230,
    value: zona
  });
  return cmbZona;
}
function LoadCmbPersonas(record,required)
{
  var stpersonas = new Ext.data.ArrayStore({
    fields: ["PersonaId", "Personas"],
    data: pers,
  });
  var cmbPersonas = Ext.create("Ext.form.field.ComboBox", {
      xtype: "combo",
      fieldLabel: "Persona",
      id: "PersonaId",
      name: "PersonaId",
      store: stpersonas,
      afterLabelTextTpl: required,
      valueField: "PersonaId",
      displayField: "Personas",
      editable: false,
      allowBlank: false,
      value: record ? record.data["PersonaId"] : null,
      width: 400,
    
  });
  return cmbPersonas;
}
function LoadCmbDependencias(record,required)
{
  var stdepend = new Ext.data.ArrayStore({
    fields: ["DependenciaId", "Nombre"],
    data: deps,
  });
  var cmbDepen = Ext.create("Ext.form.field.ComboBox", {
    
      xtype: "combo",
      fieldLabel: "Dependencia",
      id: "DependenciaId",
      name: "DependenciaId",
      store: stdepend,
      afterLabelTextTpl: required,
      valueField: "DependenciaId",
      displayField: "Nombre",
      editable: false,
      allowBlank: false,
      width: '50%',
      value: record ? record.data["DependenciaId"] : null,
  });
  return cmbDepen;
}
function LoadCmbVehiculos(record,required)
{
  var stvehiculos = new Ext.data.ArrayStore({
    fields: ["VehiculoId", "Modelo"],
    data: ve,
  });
  var cmbVehiculos = Ext.create("Ext.form.field.ComboBox", {
      xtype: "combo",
      fieldLabel: "Vehiculo",
      id: "VehiculoId",
      name: "VehiculoId",
      store: stvehiculos,
      //afterLabelTextTpl: required,
      valueField: "VehiculoId",
      displayField: "Modelo",
      width: 400,
      editable: false,
      //allowBlank: false,
      value: record ? record.data["VehiculoId"] : null,
    
  });
  return cmbVehiculos;
}
function FormField(record, desc) {
  try {
  
    Ext.define("Interrupciones", {
      extend: "Ext.data.Model",
      fields: ['entrada', 'salida']
    });
    
    var store = new Ext.data.ArrayStore({
      model: "Interrupciones",
      data: desc
    });

    var required ='<span style="color:red;font-weight:bold" data-qtip="Requerido">*</span>';   
    var grid = GridPopin(store);
    var cmbZona=LoadCmbZona(record,required);
    var cmbPersonas =  LoadCmbPersonas(record,required);
    var cmbDepen = LoadCmbDependencias(record,required);
    var cmbVehiculos = LoadCmbVehiculos(record,required);

    var formFields = [
      {
        xtype: "displayfield",
        fieldLabel: "Registro Nº",
        id: "txtHoraExId",
        name: "HoraExId",
        value: record ? record.data["HoraExId"] : null,
        editable: false,
      },
       cmbPersonas,cmbDepen,
      {
        fieldLabel: "Fecha",
        name: "Fecha",
        id: "txtFecha",
        afterLabelTextTpl: required,
        value: record ? record.data["Fecha"] : null,
        xtype: "datefield",
        format: "d/m/Y",
        submitFormat: "Y-m-d H:i:s",
        allowBlank: false,
        listeners: {
          change: function () {
            //  GetChVe("fs");
          },
        },
      },
      cmbZona,
      {
        fieldLabel: "Concepto",
        name: "Concepto",
        id: "txtConcepto",
        afterLabelTextTpl: required,
        value: record ? record.data["Concepto"] : null,
        allowBlank: false,
        width: '50%',
      },cmbVehiculos,
      {
        fieldLabel: "Responsable",
        name: "Responsable",
        id: "txtResponsable",
        width: 400,
        afterLabelTextTpl: required,
        value: record ? record.data["Responsable"] : null,
        allowBlank: true,
      },
      {
        xtype: "fieldset",
        padding: 5,
       // margin: 3,
        //collapsible: false,
        layout: {
          type: "table",
        },
        defaults: {
           border: 'none',
          cellCls: "verticalAlignTop",
          height: 100
        },
        items: [
          {
            xtype: "fieldset",
            title: "Horario Cumplido",
            collapsible: false,
            marginTop: 5,
            defaults: {
             border: 'none',
             cellCls: "verticalAlignTop",
           },
            layout: {
              type: "table",
              columns: 2,
            },
            items: [
              {
                xtype: "fieldset",
                collapsible: false,
                defaults: {
                  border: 'none',
                  cellCls: "verticalAlignTop",
                },
                layout: {
                  type: "table",
                  columns: 2,
                },
                items: [
                  {
                    xtype: "timefield",
                    submitFormat: "H:i",
                    name: "Entrada",
                    format: "H:i",
                    width: 90,
                    id: "Entrada",
                    value: record ? record.data["Entrada"] : null,
                  },
                  {
                    xtype: "timefield",
                    submitFormat: "H:i",
                    name: "Salida",
                    format: "H:i",
                    id: "Salida",
                    width: 90,
                    value: record ? record.data["Salida"] : null,
                  },
                ],
              },
            ],
          },
          {
            xtype: "fieldset",
            title: "Horario Tarjeta",
            collapsible: false,
            defaults: {
              border: 'none',
             cellCls: "verticalAlignTop",
           },
            layout: {
              type: "table",
              columns: 2,
            },
            items: [
              {
                xtype: "fieldset",
                //title: "Mañana",
                collapsible: false,
                defaults: {
                  border: 'none',
                  cellCls: "verticalAlignTop",
                },
                layout: {
                  type: "table",
                  columns: 2,
                  border: 0,
                },
                items: [
                  {
                    xtype: "timefield",
                    submitFormat: "Y-m-d H:i:s",
                    name: "TMEntrada",
                    format: "H:i",
                    width: 90,
                    id: "TMEntrada",
                    value: record ? record.data["TMEntrada"] : null,
                    vType: "time",
                  },
                  {
                    xtype: "timefield",
                    submitFormat: "Y-m-d H:i:s",
                    name: "TMSalida",
                    format: "H:i",
                    width: 90,
                    id: "TMSalida",
                    value: record ? record.data["TMSalida"] : null,
                  },
                ],
              },
              {
                xtype: "fieldset",
                //title: "Tarde",
                collapsible: false,
                layout: {
                  type: "table",
                  columns: 2,
                },
                items: [
                  {
                    xtype: "timefield",
                    submitFormat: "Y-m-d H:i:s",
                    name: "TTEntrada",
                    format: "H:i",
                    width: 90,
                    id: "TTEntrada",
                    value: record ? record.data["TTEntrada"] : null,
                  },
                  {
                    xtype: "timefield",
                    submitFormat: "Y-m-d H:i:s",
                    name: "TTSalida",
                    format: "H:i",
                    width: 90,
                    id: "TTSalida",
                    value: record ? record.data["TTSalida"] : null,
                  },
                ],
              },
            ],
          },
        ],
      },
      grid,
      {
        xtype: "fieldset",
        title: "Horas Extraordinarias",
        height:120,
        defaults: {
           cellCls: "verticalAlignTop",
        },
        layout: {
          type: "table",
          columns: 3,
          tableAttrs: {
            style: {
              width: "99%",
            },
          },
        },
        items: [
          {
            xtype: "displayfield",
            fieldLabel: "Hs. Hábiles",
            name: "Hora50",
            id: "Hora50",
            format: "H:i",
            submitFormat: "H:i",
            value: record ? record.data["Hora50"] : null,
          },
          {
            xtype: "displayfield",
            fieldLabel: "Hs. Inhábiles",
            name: "Hora100",
            id: "Hora100",
            format: "H:i",
            submitFormat: "H:i",
            value: record ? record.data["Hora100"] : null,
          },
        ],
      },
    ];
    return formFields;
  } catch (e) {
    SendJsError(e, "FormField - horaex.js", desc);
  }
}
function PopinHoraEx(action, record) {
  try {
    var desc = [];
    if (record) {
      var inte = record.data["Interrupciones"].split("<br/>");
      for (i = 0; i < inte.length; i++) {
        var a = inte[i].split("a");
        if (a[1] || a[0] !== "") {
          a[0] = a[0].replace(/^\s+|\s+$/g, "");
          a[1] = a[1].replace(/^\s+|\s+$/g, "");
          desc.push(a);
        }
      }
    }
    var formFields = FormField(record, desc);
    CurrentObject = record;
    var title;
    var btnText = "Guardar";
    if (action === "add") {
      title = "Agregar Hora Extra";
      btnText = "Agregar";
    } else
      title =
        "Editar Hora Extra : " + (record ? record.data["PersonaName"] : "");

    var win = Ext.create("Ext.window.Window", {
      title: title,
      bodyStyle: "padding: 15px;border:none;",
      width: '75%',
      closable: true,
      //layout: "fit",
      //modal: true,
      items: {
        xtype: "form",
        //frame: true,
       defaultType: "textfield",
        //overflowY: "auto",
        bodyStyle: "border:none;",
        url: "file-upload.php",
        fileUpload: true,
        items: formFields,
        method: "post", 
        buttons: [
          {
            text: btnText,
            id: "new-record-add-button",
            handler: function () {
              var form = this.up("form").getForm();
              if (form.isValid()) {
                SaveHoraEx(form, action);
                this.up("window").close();
              }
            },
          },
          {
            text: "Calcular",
            handler: function () {
              var form = this.up("form").getForm();
              CalcularHoraEx(form, action);
            },
          },
          {
            text: "Cancelar",
            handler: function () {
              this.up("window").close();
            },
          },
        ],
        
      },
    });
    return win;
  } catch (e) {
    SendJsError(e, "PopinHoraex - horaex.js", action);
  }
}
function SumTime(records, dataIndex) {
  try {
    var length = records.length,
      totalH = 0,
      totalM = 0,
      record;
    var h, m;
    for (i = 0; i < length; ++i) {
      record = records[i].get(dataIndex).split(":");
      if (record[0]) {
        h = parseInt(record[0]);
        m = parseInt(record[1]);
        totalH += h;
        totalM += m;
      }
    }
    var e = new Date();
    var tm = new Date(
      e.getFullYear(),
      e.getMonth() - 1,
      e.getDate(),
      0,
      totalM
    );
    var total = totalH + tm.getHours() + ":" + tm.f("mm");
    return total;
  } catch (e) {
    SendJsError(e, "SumTime - horaex.js", dataIndex);
  }
}

function GetAllDataGrid(grid) {
  var columns = [];
  //account for grouped columns
  Ext.each(grid.columns, function (c) {
    if (c.items.length > 0) {
      columns = columns.concat(c.items.items);
    } else {
      columns.push(c);
    }
  });
  var data = [];
  grid.store.data.each(function (item, row) {
    var convertedData = {};

    //apply renderers from column model
    for (var key in item.data) {
      var value = item.data[key];
      var found = false;
      if (key === "HoraExId" || key === "EstadoId") {
        Ext.each(
          columns,
          function (column, col) {
            if (column && column.dataIndex == key) {
              /*
               * TODO: add the meta to template
               */
              var meta = {
                item: "",
                tdAttr: "",
                style: "",
              };
              if (column.xtype === "checkcolumn") {
                if (value === true) value = "Si";
                else value = "No";
              } else {
                value = column.renderer
                  ? column.renderer.call(
                      grid,
                      value,
                      meta,
                      item,
                      row,
                      col,
                      grid.store,
                      grid.view
                    )
                  : value;
              }
              var varName = Ext.String.createVarName(column.dataIndex);
              convertedData[varName] = value;
              found = true;
            } else if (column && column.xtype === "rownumberer") {
              var varName = Ext.String.createVarName(column.id);
              convertedData[varName] = row + 1;
              found = true;
            } else if (column && column.xtype === "templatecolumn") {
              value = column.tpl ? column.tpl.apply(item.data) : value;

              var varName = Ext.String.createVarName(column.id);
              convertedData[varName] = value;
              found = true;
            }
          },
          this
        );

        if (!found) {
          // model field not used on Grid Column, can be used on RowExpander
          var varName = Ext.String.createVarName(key);
          convertedData[varName] = value;
        }
      }
    }
    data.push(convertedData);
  });
  return data;
}
function SaveEstado(data) {
  var horaex = JSON.stringify(data);
  //console.log("Lo necesario para grabar");
  //console.log(horaex);
  x_SaveEstado(horaex, SaveEstado_callback);
}
function SaveEstado_callback(response) {
  if (response) {
    humane.success("Se ha guardado el estado correctamente correctamente.");
    // x_LoadHoraEx(mes, anio, personaId, depId, LoadHoraEx_callback);
  } else {
    humane.error("Hubo un error al actualizar el estado de la hora extra.");
    SendJsError(
      new Error("Error Save Hora Extra"),
      "SaveEstado_callback - horaex.js",
      response
    );
  }
}
function ResumeHeader() {
  try {
    var persText = Ext.getCmp("ddlPersonas").rawValue;
    var depText = Ext.getCmp("ddlDependencias").rawValue;
    var mes = Ext.getCmp("ddlMes").rawValue;
    var anio = Ext.getCmp("ddlAnio").rawValue;
    var colshide = "";
    var header =
      "<div>Universidad Nacional de Salta <br/> Dirección General de Obras y Servicios</div><br/>";
    var title = "<div align='center'><u>HORAS EXTRAORDINARIAS </u></div>";
    var addHeader = "";
    if (depText !== "Todas" && persText === "Todos") {
      title =
        "<div align='center'><u>HORAS EXTRAORDINARIAS </u>: " +
        depText +
        "</div>";
      colshide = "5";
    }
    if (depText !== "Todas" && persText !== "Todos") {
      title =
        "<div align='center'><u>HORAS EXTRAORDINARIAS </u>: " +
        depText +
        "</div>";
      addHeader += "<div>Apellido y Nombre : " + persText + "</div>";
      addHeader += "<div>Cargo: Persona</div>";
      colshide = "4,5";
    }
    if (depText === "Todas" && persText !== "Todos") {
      title =
        "<div align='center'><u>HORAS EXTRAORDINARIAS </u>: " +
        persText +
        "</div>";
      addHeader += "<div>Apellido y Nombre : " + persText + "</div>";
      addHeader += "<div>Cargo: Persona</div>";
      colshide = "4";
    }
    header += title;
    header +=
      "<div>Fecha Emisión: " +
      new Date().f("dd/MM/yyyy") +
      "<br/> Mes/Año : " +
      mes +
      "/" +
      anio +
      "</div>";
    header += addHeader;
    var footer =
      "<br/><br/><br/><div style='top:600;left:0'><table cellpadding='2' cellspacing='2' style='border-width:0px;'>" +
      "<tr  style='border-width:0px;'><td  style='border-width:0px;'>--------------------</td><td  style='border-width:0px;'>----------------------------</td></tr>" +
      "<tr  style='border-width:0px;'><td  style='border-width:0px;'>Firma del Agente</td><td  style='border-width:0px;'>Firma del Jefe Inmediato</td></tr></table></div>";
    return [header, colshide, footer];
  } catch (e) {
    SendJsError(e, "ResumeHeader - horaex.js", "load header print");
  }
}
function DeleteHoraEx(record, grid) {
  try {
    if (hasUpdate) {
      Ext.Msg.confirm(
        "Eliminar hora extraordinaria",
        "Esta seguro que quiere eliminar este hora extraordinaria?",
        function (button) {
          if (button === "yes") {
            var sm = grid.getSelectionModel();
            var rec = grid.getSelectionModel().getSelection()[0];
            grid.store.remove(sm.getSelection());
            if (grid.store.getCount() > 0) {
              sm.select(0);
            }
            var horaexId = record.data["HoraExId"];
            x_DeleteHoraEx(horaexId, DeleteHoraEx_callback);
          }
        }
      );
    }
  } catch (e) {
    SendJsError(e, "DeleteHoraEx - horaex.js", record);
  }
}
function DeleteHoraEx_callback(response) {
  if (response) {
    humane.success("Se ha eliminado el vehiculo correctamente.");
    x_LoadGridOnly(mes, anio, personaId, depId, LoadGridOnly_callback);
  } else {
    humane.error("Hubo un error al eliminar el vehiculo.");
    SendJsError(
      new Error("Error DeleteHoraEx-vehiculos.js"),
      "vehiculos.js",
      response
    );
  }
}

function GetHorarioTarjeta() {
  var ht = [];
  try {
    var te, ts;
    if (Ext.getCmp("TMEntrada").getValue()) {
      te = new Date(Ext.getCmp("TMEntrada").getValue());
    }
    if (Ext.getCmp("TTEntrada").getValue()) {
      te = new Date(Ext.getCmp("TTEntrada").getValue());
    }
    if (Ext.getCmp("TMSalida").getValue()) {
      ts = new Date(Ext.getCmp("TMSalida").getValue());
    }
    if (Ext.getCmp("TTSalida").getValue()) {
      ts = new Date(Ext.getCmp("TTSalida").getValue());
    }
    var t = new Date();
    if (ts && te) {
      t.setHours(
        ts.getHours() - te.getHours(),
        ts.getMinutes() - te.getMinutes(),
        0,
        0
      );
      ht[0] = te.getHours() + ":" + te.getMinutes();
      ht[1] = ts.getHours() + ":" + ts.getMinutes();
    } else {
      t.setHours(0, 0, 0, 0);
      ht[0] = "00:00";
      ht[1] = "00:00";
    }
    ht[2] = t;
    return ht;
  } catch (e) {
    SendJsError(e, "GetHorarioTarjeta - horaex.js", ht);
  }
}

var bj = false;
function CalcularHoraEx(form) {
  var rec;
  try {
    rec = form.getValues();
    //console.log(rec);
    var e, s, he, hs, ms, me, zona, te, ts, a, am, b, bm, hex;
    e = new Date();
    de = rec["Entrada"].split(":");
    e.setHours(de[0], de[1], 0, 0);

    s = new Date();
    ds = rec["Salida"].split(":");
    s.setHours(ds[0], ds[1], 0, 0);
    /*
         s = new Date(rec['Salida']);
         newdate = new Date();
         console.log(newdate);
         
         console.log(newdate);
         if (e != 'Invalid Date')
         e = Ext.util.Format.date(e, 'H:i');
         }
         if (s != 'Invalid Date')
         s = Ext.util.Format.date(s, 'H:i');
         }*/
    //console.log("Ingreso :" + e + "-Egreso:" + s);
    he = e.getHours();
    me = e.getMinutes();
    hs = s.getHours();
    ms = s.getMinutes();
    zona = rec["Zona"];
    var b1 = 0;
    if (hs < he && hs === 0) hs = 24;
    if (hs === he && he === 0) {
      hs = 23;
      ms = 59;
      b1 = 1;
    }
    // CASOS DE 12 de la NOCHE
    // Si ban =1 es que la hora de entrada fue entre las (00:00 a 00:59)
    /*var ban=0;
         
         if (hs === 0) {
         hs = 24;
         //ms = 00;
         }
         if (he === 0) {
         he = 24;
         //ms = 00;
         bandera = 1;
         }
         var vth;
         if(bandera === 1) 
         if(hs < 24) vth = hs;
         else
         vth = (hs - he);*/

    var vth = hs - he;
    //console.log("Entrada :" + he + "----" + "-Salida:" + hs);
    var vtm = ms - me;
    //console.log(vth);
    if (vth < 0) {
      alert("Error en la carga de datos");
      return;
    }
    //console.log("Horas y minutos:" + vth + "---:" + vtm);
    var vt = new Date();
    vt.setHours(vth, vtm, 0, 0);
    if (rec["Entrada"] && rec["Salida"] && zona === "1") {
      var t = GetHorarioTarjeta();
      a = t[0].split(":");
      am = parseInt(a[1]);
      a = parseInt(a[0]);
      b = t[1].split(":");
      bm = parseInt(b[1]);
      b = parseInt(b[0]);
      if (t[2].getHours() >= 7) bj = true;
      //console.log(
     //   " Hora de Trabajo " + t + " Horas en total :" + t[2].getHours()
     // );
     // console.log(
      //  "'a' Lab. Entrada :" +
      //    a +
     //     ", 'b' Lab. Salida:" +
     //     b +
     //     ",'he' Salida:" +
    //      he +
    //      ",'hs' LLegada" +
    //      hs
    //  );
      var ht = t[2];
      hv = new Date(
        e.getFullYear(),
        e.getMonth() - 1,
        e.getDate(),
        hs - he,
        ms - me
      );
      //console.log("Cant. horas viaje :" + hv);
      if (a <= he && he < b && b < hs) {
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          hs - b,
          ms - bm
        );
      }
      if (he < a && a <= hs && hs <= b) {
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          a - he,
          am - ms
        );
      }
      if (he <= a && a <= hs && b <= hs) {
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          a - he + (hs - b),
          am - me + (ms - bm)
        );
      }
      if (a <= he && hs <= b) {
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          hs - he,
          ms - me
        );
      }
      if (hs <= a && hs < b) {
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          hs - he,
          ms - me
        );
      }
      if (b <= he && a < he) {
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          hs - he,
          ms - me
        );
      }
      if (ht.getHours() === 0) {
        var horaex = 0,
          minex = 0;
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          hs - he,
          ms - me
        );
        if (hex.getHours() >= 7) {
          bj = true;
          horaex = hex.getHours() - 7;
          minex = hex.getMinutes();
        } else bj = false;
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          horaex,
          minex
        );
      }
    } // dia inhábil se considera todas las horas de viaje
    else {
      hex = vt;
    }
    var grid = Ext.getCmp("gridDesc");
    var descs = grid.store.data.items;
    //console.log("Cantidad de horas extras:" + hex);
    for (var i = 0; i < descs.length; i++) {
      var de = descs[i].data["entrada"].split(":")[0];
      var dem = descs[i].data["entrada"].split(":")[1];
      var ds = descs[i].data["salida"].split(":")[0];
      var dsm = descs[i].data["salida"].split(":")[1];
      var dt = new Date();
      dt.setHours(ds - de, dsm - dem);
      //console.log("Horas extras :" + hex.getHours() + ":" + hex.getMinutes());
     // console.log(
     //   "Horas descanso a restar :" + dt.getHours() + ":" + dt.getMinutes()
     // );
      hexd = hex.getHours() - dt.getHours();
      mexd = hex.getMinutes() - dt.getMinutes();
     // console.log("Diferencias: " + hexd + ", minutos:" + mexd);

      if (hexd <= 0 && mexd <= 30) {
        if (mexd === 30)
          hex = new Date(
            e.getFullYear(),
            e.getMonth() - 1,
            e.getDate(),
            0,
            mexd
          );
        else
          hex = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), 0, 0);
        break;
      }
      if (hexd > 0)
        hex = new Date(
          e.getFullYear(),
          e.getMonth() - 1,
          e.getDate(),
          hex.getHours() - dt.getHours(),
          hex.getMinutes() - dt.getMinutes()
        );
    }
    Ext.getCmp("Hora50").setValue("00:00");
    Ext.getCmp("Hora100").setValue("00:00");
    /*  Ext.getCmp('TotalHoras').setValue('00:00');
         var totalextra = parseFloat(hex.getHours() + "." + hex.getMinutes());*/

    if (b1 === 1) {
      hex.setMinutes(hex.getMinutes() + 1);
    }
    if (zona === "1") {
      /* totalextra = parseFloat(totalextra * 1.5);*/
      Ext.getCmp("Hora50").setValue(hex.f("HH:mm"));
    } else {
      /* totalextra = parseFloat(totalextra * 2);*/
      Ext.getCmp("Hora100").setValue(hex.f("HH:mm"));
    }
    /* totalextra = totalextra.toFixed(2);
         //totalextra = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate(), totalextra.split(".")[0], totalextra.split(".")[1]);
         Ext.getCmp('TotalHoras').setValue(totalextra);*/
   // console.log("Jornada completa?" + bj);
  } catch (e) {
    SendJsError(e, "CalcularHoraEx - horaex.js", rec);
  }
}

function SaveHoraEx(form, action) {
  var rec;
  try {
    rec = form.getValues();
    if (action !== "add") {
      if (!hasUpdate) {
        return;
      }
      rec["HoraExId"] = CurrentObject.data["HoraExId"];
      rec["DescansosId"] = CurrentObject.data["DescansosId"];
    } else rec["HoraExId"] = 0;
    var grid = Ext.getCmp("gridDesc");
    var descs = grid.store.data.items;
    var descan = [];
    for (i = 0; i < descs.length; i++) {
      var a = new Array();
      a[(0, 0)] = descs[i].data["entrada"];
      a[(0, 1)] = descs[i].data["salida"];
      descan.push(a);
    }

    rec["Descansos"] = descan;
    rec["Hora50"] = Ext.getCmp("Hora50").getValue();
    rec["Hora100"] = Ext.getCmp("Hora100").getValue();
    rec["Hora100"] = rec["Hora100"] == "" ? "00:00" : rec["Hora100"];
    rec["Hora50"] = rec["Hora50"] == "" ? "00:00" : rec["Hora50"];
    rec["Jornada"] = bj ? 1 : 0;
    var horaex = JSON.stringify(rec);
   // console.log("tesssssssssssssssssssssssssssssssssssssssssss");
   // console.log(horaex);
    x_SaveHoraEx(horaex, SaveHoraEx_callback);
  } catch (e) {
    SendJsError(e, "SaveHoraEx - horaex.js", rec);
  }
}
function SaveHoraEx_callback(response) {
  try {
    if (response) {
      humane.success("Se ha guardado la hora extraordinaria correctamente.");
      //x_LoadHoraEx(mes, anio, personaId, depId, LoadHoraEx_callback);
      x_LoadGridOnly(mes, anio, personaId, depId, LoadGridOnly_callback);
    } else {
      humane.error("Hubo un error al guardar la hora.");
      SendJsError(new Error("Error SaveHoraEx-horaex.js"),"horaex.js", response);
    }
  } catch (e) {
    SendJsError(e, "SaveHoraEx_callback - horaex.js", response);
  }
}
