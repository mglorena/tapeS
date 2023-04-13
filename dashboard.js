var host = 'http://bo.unsa.edu.ar/dr/R2023/'
var html, html1
var date = new Date()
var mes = date.getMonth()
mes = mes + 1
var anio = date.getFullYear()

$.getJSON('./resoluciones.json', function (data) {
  html = "<table cellspacing='2' cellpadding='2'>"
  c = 0
  data.resoluciones.forEach((element) => {
    if (c > 4) {
      html += '<tr><td>'
      html += "<a href='" + host + element + "' target='_blank' >" + element + '</a>'
      html += '</td></tr>'
    }

    c += 1
  })
  html += '</table>'
})
function reemplazar () {
  let i = $('div i')

  // Clona el elemento <ol>
  //i.parent().remove();
  i.remove();

  let ol = $('div ol')

  // Clona el elemento <ol>
  let olClone = ol.clone()

  // Envuelve el elemento clonado en un nuevo elemento <p>
  let p = $('<p></p>').append(olClone)

  // Reemplaza el elemento original con el clon
  ol.replaceWith(p)
}
function colapsar (div) {
  $('#' + div.id).toggleClass('active')
}
$.getJSON('./novedades.json', function (data) {
  html1 = "<table cellspacing='2' cellpadding='2'>"
  c = 0
  data.novedades.forEach((element) => {
    html1 += '<tr><td>'
    html1 +=
      "<div class='divnovedad' id='divNov" +
      c +
      "' onclick='colapsar(this);'>" +
      element +
      '</div>'

    html1 += '</td></tr>'
    c += 1
  })
  html1 += '</table>'
})

var win1 = Ext.create('Ext.Window', {
  title: 'Resoluciones Rectorado <br/> Año ' + anio,
  width: 270,
  height: '76%',
  // Constraining will pull the Window leftwards so that it's within the parent Window
  x: 0,
  y: 0,
  constrain: true,
  layout: 'fit',
  scrollable: true,
  listeners: {
    render: function (p) {
      p.body.dom.innerHTML = html
    }
  }
})
var win2 = Ext.create('Ext.Window', {
  title: 'Novedades para No-Docentes',
  width: '35%',
  height: '76%',

  x: 275,
  y: 0,
  constrain: true,
  scrollable: true,
  layout: 'fit',
  listeners: {
    render: function (p) {
      p.body.dom.innerHTML = html1
      reemplazar()
      
    }
  }
})
Ext.onReady(function () {
  var panel = Ext.create('Ext.Panel', {
    id: 'main-panel',
    baseCls: 'x-plain',
    renderTo: 'divBoard',
    height: '77%',
    width: '98%',
    items: [win1, win2]
  })
  win2.show()
  win1.show()
})
