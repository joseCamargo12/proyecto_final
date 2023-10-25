const formulario = document.querySelector('#formularioBusqueda');
const vaciarButton = document.getElementById('vaciar');
let tablaResultados = [];

window.onload = function () {
  buscarConsultorias();
};

function vaciarResultados() {
  const resultados = document.querySelector("#resultadosTabla tbody");
  resultados.innerHTML = ""; // Vacía el contenido de la tabla
}

function buscarConsultorias() {
  formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    filtrarAuditorias();
  });
}

function filtrarAuditorias() {
  const resultado = auditorias.filter(aplicarFiltro);
  const tablaResultadosHTML = document.querySelector("#resultadosTabla tbody");

  tablaResultadosHTML.innerHTML = "";

  if (resultado.length > 0) {
    resultado.forEach((auditoria) => {
      const tabla = tablaResultadosHTML.insertRow();
      tabla.innerHTML = `<td>${auditoria.tipo}</td>
                         <td>${auditoria.fecha}</td>
                         <td>${auditoria.hora}</td>
                         <td>${auditoria.ubicacion}</td>
                         <td>${auditoria.prioridad}</td>
                         <td>${auditoria.clave}</td>`;
    });
  } else {
    tablaResultadosHTML.innerHTML = '<tr><td colspan="6">No se encontraron resultados.</td></tr>';
  }

  tablaResultados = resultado;  // Actualiza el array de resultados

  sincronizarStorage();
}

function aplicarFiltro(auditoria) {
  const tipo = document.getElementById('tipo').value.toLowerCase();
  const fecha = document.getElementById('fecha').value.toLowerCase();
  const hora = document.getElementById('hora').value.toLowerCase();
  const ubicacion = document.getElementById('ubicacion').value.toLowerCase();
  const prioridad = document.getElementById('prioridad').value.toLowerCase();
  const clave = document.getElementById('clave').value.toLowerCase();

  return (
    (tipo === '' || auditoria.tipo.toLowerCase().includes(tipo)) &&
    (fecha === '' || auditoria.fecha.toLowerCase().includes(fecha)) &&
    (hora === '' || auditoria.hora.toLowerCase().includes(hora)) &&
    (ubicacion === '' || auditoria.ubicacion.toLowerCase().includes(ubicacion)) &&
    (prioridad === '' || auditoria.prioridad.toString().includes(prioridad)) &&
    (clave === '' || auditoria.clave.toLowerCase().includes(clave))
  );
}

function sincronizarStorage() {
  localStorage.setItem('tablaResultados', JSON.stringify(tablaResultados));
}

window.addEventListener("DOMContentLoaded", () => {
  tablaResultados = JSON.parse(localStorage.getItem('tablaResultados')) || [];
  filtrarAuditorias();
});

vaciarButton.addEventListener('click', vaciarResultados);