var modal = document.getElementById("bloque-form");
var Postular = document.getElementById("Postular");
var closeBtn = document.getElementsByClassName("cerrar")[0];

Postular.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}


// Elementos del segundo formulario
var modalPostular = document.getElementById("bloque-form-postular");
var botonPostular = document.getElementById("ComoPostular");
var closePostular = document.getElementsByClassName("cerrar-postular")[0];

// Mostrar el formulario al hacer clic en el botón "¿Cómo postular?"
botonPostular.onclick = function() {
    modalPostular.style.display = "block";
}

// Cerrar el formulario al hacer clic en la "X"
closePostular.onclick = function() {
    modalPostular.style.display = "none";
}

// Cerrar el formulario si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modalPostular) {
        modalPostular.style.display = "none";
    }
}