document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        console.log('Intento de login:', email, password);
        
        // Obtener usuarios registrados
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        console.log('Usuarios en storage:', users);
        
        // Función de hash
        function hashPassword(password) {
            let hash = 0;
            for (let i = 0; i < password.length; i++) {
                const char = password.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return hash.toString();
        }
        
        // Buscar usuario
        const user = users.find(u => 
            u.email === email && 
            u.password === hashPassword(password)
        );
        
        if (user) {
            console.log('Usuario encontrado, redirigiendo...');
            // Guardar usuario actual
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirigir - CAMBIA 'inicio.html' POR EL NOMBRE EXACTO DE TU PÁGINA
            window.location.href = '/html/priv/usuario.html';
        } else {
            console.log('Usuario no encontrado');
            alert('Credenciales incorrectas');
        }
    });
});