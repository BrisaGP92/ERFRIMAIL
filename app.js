const loginButton = document.getElementById("loginButton") ;

function mostrarMensaje(mensaje) {
  const mensajeDiv = document.getElementById("mensaje");
  mensajeDiv.textContent = mensaje;
}

document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");

    function mostrarMensaje(mensaje) {
      const mensajeDiv = document.getElementById("mensaje");
      mensajeDiv.textContent = mensaje;
  }
    loginButton.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const header = document.querySelector("header");
        const footer = document.querySelector("footer");
        const otroCampo = document.querySelector("otroCampo");
        const nota = document.querySelector("nota");

        if (username === "RRHH" && password === "aa476708") {
            document.querySelector(".content").style.display = "block";
            document.querySelector(".login-form").style.display = "none";
            footer.style.display = "block"; 
            header.style.display = "block";
            otroCampo.style.display = "block"; 
            nota.style.display = "block"; 

        } else {
            mostrarMensaje("Credenciales incorrectas. Inténtalo de nuevo.");
        }
    });

function mostrarAreas() {
  const listaAreas = document.getElementById("listaAreas");
  listaAreas.style.display = "block";
}
function seleccionarArea() {
  const selectArea = document.getElementById("miArea");
  const areaSeleccionada = selectArea.value;
  // Puedes realizar acciones adicionales según el área seleccionada, si es necesario.
  mostrarMensaje(`Área seleccionada: ${areaSeleccionada}`);
}
function ocultarAreas() {
  const listaAreas = document.getElementById("listaAreas");
  listaAreas.style.display = "none";
}


function borrarUsuario() {
    // Restablecer los campos de nombre, apellido, y otros datos según sea necesario
  document.getElementById("miNombre").value = "";
  document.getElementById("miApellido").value = "";
    // También puedes restablecer otros campos relacionados con el usuario aquí

    // Mostrar un mensaje o realizar otras acciones que consideres apropiadas
  mostrarMensaje("Usuario borrado satisfactoriamente.");
}
}
);