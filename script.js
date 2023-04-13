
var periodos = [  
  { value: '2022-1', label: '2022-1' },  
  { value: '2022-2', label: '2022-2' },  
  { value: '2023-1', label: '2023-1' }
];

var carreras = [  
  { value: 'Ing. Civil', label: 'Ingeniería Civil' },  
  { value: 'Ing. Sistemas', label: 'Ingeniería de Sistemas' }
];

var grupos = {
  '2022-1': {
    'Ing. Civil': [
      { value: 'Grupo 1', label: 'Grupo 1' },
      { value: 'Grupo 2', label: 'Grupo 2' }
    ],
    'Ing. Sistemas': [
      { value: 'Grupo 3', label: 'Grupo 3' },
      { value: 'Grupo 4', label: 'Grupo 4' }
    ]
  },
  '2022-2': {
    'Ing. Civil': [
      { value: 'Grupo 1', label: 'Grupo 1' },
      { value: 'Grupo 2', label: 'Grupo 2' }
    ],
    'Ing. Sistemas': [
      { value: 'Grupo 3', label: 'Grupo 3' },
      { value: 'Grupo 4', label: 'Grupo 4' }
    ]
  },
  '2023-1': {
    'Ing. Civil': [
      { value: 'Grupo 1', label: 'Grupo 1' },
      { value: 'Grupo 2', label: 'Grupo 2' }
    ],
    'Ing. Sistemas': [
      { value: 'Grupo 3', label: 'Grupo 3' },
      { value: 'Grupo 4', label: 'Grupo 4' }
    ]
  }
};

var alumnos = [    { nombre: 'Juan', matricula: '0001', grupo: 'Grupo 1' },    { nombre: 'María', matricula: '0002', grupo: 'Grupo 1' },    { nombre: 'Pedro', matricula: '0003', grupo: 'Grupo 2' },    { nombre: 'Lucía', matricula: '0004', grupo: 'Grupo 2' },    { nombre: 'Carlos', matricula: '0005', grupo: 'Grupo 2' },    { nombre: 'Ana', matricula: '0006', grupo: 'Grupo 1' }];
var profesores = {
  'Materia 1': 'Profesor 1',
  'Materia 2': 'Profesor 2',
  'Materia 3': 'Profesor 3',
  'Materia 4': 'Profesor 4',
};


$(document).ready(function() {
  // Llenar el select de períodos con los datos del arreglo periodos
  $.each(periodos, function(index, periodo) {
    $('#periodo').append($('<option></option>').attr('value', periodo.value).text(periodo.label));
  });

  // Llenar el select de carreras con los datos del arreglo carreras
  $.each(carreras, function(index, carrera) {
    $('#carrera').append($('<option></option>').attr('value', carrera.value).text(carrera.label));
  });

  // Actualizar el select de grupos al seleccionar un periodo y una carrera
  $('#periodo, #carrera').change(function() {
    var periodoSeleccionado = $('#periodo').val();
    var carreraSeleccionada = $('#carrera').val();
    var gruposCarrera = grupos[periodoSeleccionado][carreraSeleccionada];

    // Llenar el select de grupos con los datos del arreglo gruposCarrera
    $('#grupo').empty();
    $.each(gruposCarrera, function(index, grupo) {
      $('#grupo').append($('<option></option>').attr('value', grupo.value).text(grupo.label));
    });

    // Disparar el evento change del select de grupos para actualizar la tabla
    $('#grupo').trigger('change');
  });

  // Actualizar la tabla al seleccionar un grupo
  $('#grupo').change(function() {
    var grupoSeleccionado = $(this).val();
    var materia1 = 'Materia 1';
    var materia2 = 'Materia 2';
    var materia3 = 'Materia 3';
    var materia4 = 'Materia 4';
    
    // Obtener los alumnos del grupo seleccionado
    var alumnosGrupo = [];
    $.each(alumnos, function(index, alumno) {
      if (alumno.grupo == grupoSeleccionado) {
        alumnosGrupo.push(alumno);
      }
    });
    
    // Actualizar la tabla con los nombres de los alumnos
    // Actualizar la tabla con los nombres de los alumnos
var tbody = $('tbody');
tbody.empty();
$.each(alumnosGrupo, function(index, alumno) {
  var tr = $('<tr></tr>');
  tr.append($('<td></td>').text(alumno.nombre));
  for (var i = 1; i <= 4; i++) {
    tr.append($('<td id="' + alumno.matricula + '-Materia-1-' + i + '"></td>'));
  }
  for (var i = 1; i <= 4; i++) {
    tr.append($('<td id="' + alumno.matricula + '-Materia-2-' + i + '"></td>'));
  }
  for (var i = 1; i <= 4; i++) {
    tr.append($('<td id="' + alumno.matricula + '-Materia-3-' + i + '"></td>'));
  }
  for (var i = 1; i <= 4; i++) {
    tr.append($('<td id="' + alumno.matricula + '-Materia-4-' + i + '"></td>'));
  }
  tbody.append(tr);
});

    
    // Rellenar las calificaciones de los alumnos
rellenarCalificaciones();

// Agregar el nombre del profesor correspondiente en la nueva fila del encabezado
$('.profesor-materia-1').text(profesores['Materia 1']);
$('.profesor-materia-2').text(profesores['Materia 2']);
$('.profesor-materia-3').text(profesores['Materia 3']);
$('.profesor-materia-4').text(profesores['Materia 4']);

  });

  // Llenar la tabla con las calificaciones de los alumnos automáticamente cada 5 segundos
  setInterval(function() {
    rellenarCalificacionesAutomatico();
  }, 5000);
});
function rellenarCalificaciones() {
  $('tbody tr').each(function() {
    var materias = ['Materia 1', 'Materia 2', 'Materia 3', 'Materia 4'];
    for (var i = 0; i < materias.length; i++) {
      var materia = materias[i];
      for (var j = 1; j <= 4; j++) {
        var celdaCalificacion = $(this).find('td[id$="' + materia.replace(/ /g, '-') + '-' + j + '"]');
        var calificacion = Math.floor(Math.random() * 3) + 8;
        celdaCalificacion.text(calificacion);
      }
    }
  });

  
// Calcular los promedios de cada columna
var promedios = [];
$('thead tr:nth-child(2) th').each(function(index, th) {
  if (index > 0) {
    var sum = 0;
    var count = 0;
    $('tbody td:nth-child(' + (index + 1) + ')').each(function() {
      if ($(this).text() != '') {
        sum += parseInt($(this).text());
        count++;
      }
    });
    if (count > 0) {
      var promedio = sum / count;
      promedios.push(promedio.toFixed(2));
    } else {
      promedios.push('');
    }
  }
});

// Agregar la fila de promedios
var tr = $('<tr></tr>');
tr.append($('<td></td>').text('Promedio'));
for (var i = 0; i < promedios.length; i++) {
  tr.append($('<td></td>').text(promedios[i]));
}
$('tbody').append(tr);


}

function rellenarCalificacionesAutomatico() {
  $('tbody tr').each(function() {
    var materias = ['Materia 1', 'Materia 2', 'Materia 3', 'Materia 4'];
    for (var i = 0; i < materias.length; i++) {
      var materia = materias[i];
      for (var j = 1; j <= 4; j++) {
        var celdaCalificacion = $(this).find('td[id$="' + materia.replace(/ /g, '-') + '-' + j + '"]');
        if (celdaCalificacion.text() == '') {
          var calificacion = Math.floor(Math.random() * 3) + 8;
          celdaCalificacion.text(calificacion);
        }
      }
    }
  });
}
const imprimirBtn = document.getElementById("imprimir");
const exportarBtn = document.getElementById("exportar");
 // Funcionalidad de los botones
 imprimirBtn.addEventListener("click", function () {
    window.print();
  });

  function imprimirPagina() {
    window.print();
  }
  function exportarAExcel() {
    const tabla = document.querySelector(".table");
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(tabla);
    const nombreArchivo = "tabla_exportada.xlsx";
  
    XLSX.utils.book_append_sheet(wb, ws, "Hoja1");
    XLSX.writeFile(wb, nombreArchivo);
  }
  exportarBtn.addEventListener("click", exportarAExcel);

