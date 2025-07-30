// Selección de botones de agregar al carrito
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const carritoItems = document.querySelector('.carrito-items');
const carritoTotal = document.querySelector('.carrito-total span');
const botonVaciar = document.querySelector('.btn-vaciar');

let total = 0;

// Función para agregar curso al carrito
botonesAgregar.forEach(btn => {
    btn.addEventListener('click', function() {
        // Obtener el contenedor del curso desde el botón
        const cursoItem = this.parentElement;
        
        // Tomar los datos del curso desde el DOM
        const nombre = cursoItem.querySelector('.curso-nombre').innerText;
        const profesor = cursoItem.querySelector('.curso-profesor').innerText;
        const precio = cursoItem.querySelector('.precio-descuento').innerText.replace('$', '').replace(' USD', '');
        const original = cursoItem.querySelector('.precio-original').innerText.replace('$', '').replace(' USD', '');
        const imagen = cursoItem.querySelector('img').src;

        // Crear el nuevo curso en el carrito con la estructura deseada
        const cursoHTML = `
            <div class="carrito-item">
                <img src="${imagen}" alt="${nombre}">
                <div class="info">
                    <h4>${nombre}</h4>
                    <p>${profesor}</p>
                    <p><span class="precio-original">$${original} USD</span> <span class="precio-descuento">$${precio} USD</span></p>
                </div>
                <button class="btn-eliminar">&times;</button>
            </div>
        `;
        carritoItems.innerHTML += cursoHTML;

        // Actualizar el total
        total += parseFloat(precio);
        actualizarTotal();

        // Añadir evento de eliminar a los nuevos botones
        actualizarBotonesEliminar();
    });
});

// Función para actualizar el total del carrito
function actualizarTotal() {
    carritoTotal.innerText = `$${total} USD`;
}

// Función para vaciar el carrito
botonVaciar.addEventListener('click', () => {
    carritoItems.innerHTML = '';
    total = 0;
    actualizarTotal();
});

// Función para eliminar elementos del carrito
function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', function() {
            const precio = this.previousElementSibling.querySelector('.precio-descuento').innerText.replace('$', '').replace(' USD', '');
            total -= parseFloat(precio);
            this.parentElement.remove();
            actualizarTotal();
        });
    });
}


// Función para alternar la visibilidad del menú desplegable
function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

// Opcional: Cerrar el menú si se hace clic fuera de él
window.onclick = function(event) {
    var dropdown = document.getElementById("dropdownMenu");
    if (!event.target.closest('.profile-pic-container')) {
        dropdown.style.display = "none";
    }
};







const carouselSlide = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let counter = 0;
const videos = document.querySelectorAll('.carousel-slide');
const totalSlides = videos.length;

// Muestra el primer video
function updateCarousel() {
    carouselSlide.style.transform = `translateX(${-counter * 100}%)`; // Desplaza el carrusel
}

// Botón siguiente
nextBtn.addEventListener('click', () => {
    if (counter >= totalSlides - 1) return; // Detener al llegar al último video
    counter++;
    updateCarousel();
});

// Botón anterior
prevBtn.addEventListener('click', () => {
    if (counter <= 0) return; // Detener al llegar al primer video
    counter--;
    updateCarousel();
});