// Selección de botones de agregar al carrito
const botonesAgregar = document.querySelectorAll('.cart-button');
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



function buscarCurso() {
    // Obtener el valor del input de búsqueda
    let input = document.getElementById('search').value.toLowerCase();
    
    // Obtener todos los cursos
    let courses = document.getElementsByClassName('course');
    
    // Iterar sobre los cursos y mostrar/ocultar según la búsqueda
    for (let i = 0; i < courses.length; i++) {
        let courseName = courses[i].getAttribute('data-course-name').toLowerCase();
        
        if (courseName.includes(input)) {
            courses[i].style.display = "block";
        } else {
            courses[i].style.display = "none";
        }
    }
}


// Función para mostrar los cursos según la categoría
function mostrarCursosPorCategoria(categoria) {
    let courses = document.querySelectorAll('.course');

    // Iterar sobre los cursos y mostrar/ocultar según la categoría
    courses.forEach(course => {
        if (categoria === 'todo' || course.getAttribute('data-category') === categoria) {
            course.style.display = "block"; // Mostrar el curso
        } else {
            course.style.display = "none"; // Ocultar el curso
        }
    });
}

// Manejar el evento de clic en los íconos de las escuelas
document.querySelectorAll('.school-icons a').forEach(icon => {
    icon.addEventListener('click', function(event) {
        event.preventDefault(); // Evita la redirección
        let categoria = this.getAttribute('data-category'); // Obtener la categoría
        mostrarCursosPorCategoria(categoria); // Filtrar cursos
    });
});

// Al cargar la página, mostrar todos los cursos
mostrarCursosPorCategoria('todo');

