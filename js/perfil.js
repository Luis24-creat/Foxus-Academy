// Cargar datos de localStorage
// document.addEventListener('DOMContentLoaded', () => {
//     const nombres = localStorage.getItem('nombres') || 'Eduardo';
//     const apellidos = localStorage.getItem('apellidos') || 'Ardiles Elias';
//     const telefono = localStorage.getItem('telefono') || '936301777';
//     const usuario = localStorage.getItem('usuario') || 'eduardoard';
//     const email = localStorage.getItem('email') || 'eardilesel@ucvvirtual.edu.pe';
//     const genero = localStorage.getItem('genero') || 'Masculino';
//     const fechaNacimiento = localStorage.getItem('fechaNacimiento') || '2004-09-08';
    
//     document.getElementById('nombres').textContent = nombres;
//     document.getElementById('apellidos').textContent = apellidos;
//     document.getElementById('telefono').textContent = telefono;
//     document.getElementById('usuario').textContent = usuario;
//     document.getElementById('email').textContent = email;
//     document.getElementById('genero').textContent = genero;
//     document.getElementById('fecha-nacimiento').textContent = fechaNacimiento;
// });

// perfil.js

function showContent(section) {
    const contentDisplay = document.getElementById('content-display');
    let content = '';

    switch (section) {
        case 'subscription':
            content = `
                <div class="icon">💬</div>
                <p>Este usuario no cuenta con una suscripción activa.</p>
            `;
            break;
        case 'certificates':
            content = `
                <div class="icon">🏆</div>
                <p>Este usuario no cuenta con certificados.</p>
            `;
            break;
        case 'likes':
            content = `
                <div class="icon">❤️</div>
                <p>Este usuario no tiene contenido marcado como "Me gusta".</p>
            `;
            break;
        case 'referrals':
            content = `
                <div class="icon">👥</div>
                <p>Este usuario no cuenta con referidos.</p>
            `;
            break;
        default:
            content = '<p>Haz clic en una opción del menú para ver la información.</p>';
    }

    contentDisplay.innerHTML = content;

    // Resaltar el elemento del menú activo
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.menu-item[onclick="showContent('${section}')"]`).classList.add('active');
}
