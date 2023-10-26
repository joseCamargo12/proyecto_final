document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("#formularioBusqueda");
  const resultadosTabla = document.querySelector("#resultadosTabla tbody");
  const vaciarButton = document.getElementById("vaciar");
  const buscarButton = document.getElementById("buscar");
  const dataUrl = "../data/consultorias.json";

  let auditorias = [];

  function cargarDatosAuditorias() {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        auditorias = data; // Almacena los datos
      })
      .catch((error) => {
        console.error("Error al cargar datos de auditoría:", error);
      });
  }

  function filtrarAuditorias() {
    const tipo = document.getElementById("tipo").value.toLowerCase();
    const fecha = document.getElementById("fecha").value.toLowerCase();
    const hora = document.getElementById("hora").value.toLowerCase();
    const ubicacion = document.getElementById("ubicacion").value.toLowerCase();
    const prioridad = document.getElementById("prioridad").value.toLowerCase();
    const clave = document.getElementById("clave").value.toLowerCase();

    const resultadosFiltrados = auditorias.filter(
      (auditoria) =>
        (tipo === "" || auditoria.tipo.toLowerCase().includes(tipo)) &&
        (fecha === "" || auditoria.fecha.toLowerCase().includes(fecha)) &&
        (hora === "" || auditoria.hora.toLowerCase().includes(hora)) &&
        (ubicacion === "" ||
          auditoria.ubicacion.toLowerCase().includes(ubicacion)) &&
        (prioridad === "" ||
          auditoria.prioridad.toString().includes(prioridad)) &&
        (clave === "" || auditoria.clave.toLowerCase().includes(clave))
    );

    resultadosTabla.innerHTML = "";

    if (resultadosFiltrados.length > 0) {
      resultadosFiltrados.forEach((auditoria) => {
        const row = resultadosTabla.insertRow();
        row.innerHTML = `<td>${auditoria.tipo}</td>
                         <td>${auditoria.fecha}</td>
                         <td>${auditoria.hora}</td>
                         <td>${auditoria.ubicacion}</td>
                         <td>${auditoria.prioridad}</td>
                         <td>${auditoria.clave}</td>`;
      });
    } else {
      resultadosTabla.innerHTML =
        '<tr><td colspan="6">No se encontraron resultados.</td></tr>';
    }
  }

  cargarDatosAuditorias();

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    filtrarAuditorias();
  });

  vaciarButton.addEventListener("click", function () {
    const resultados = document.querySelector("#resultadosTabla tbody");
  
    if (resultados.innerHTML.trim() !== "") {
      Swal.fire({
        title: "¿Estás seguro de eliminar todo?",
        text: "No será posible revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar todo",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminado!", "Tus resultados han sido eliminados", "success");
          resultados.innerHTML = "";
        }
      });
    }
  });

  buscarButton.addEventListener("click", function () {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Búsqueda realizada",
      showConfirmButton: false,
      timer: 1500,
    });
  });
});
