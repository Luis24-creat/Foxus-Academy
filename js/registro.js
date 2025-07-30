document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.register-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Recolectar datos del formulario
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value;

        // Validaciones
        if (!validateForm(firstName, lastName, email, password, birthdate, gender)) {
            return;
        }

        // Crear objeto de usuario
        const user = {
            id: generateUniqueId(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword(password), // Función para hashear la contraseña
            birthdate: birthdate,
            gender: gender,
            registeredAt: new Date().toISOString()
        };

        // Guardar usuario en localStorage
        saveUser(user);

        // Limpiar formulario y mostrar mensaje de éxito
        form.reset();
        alert('¡Registro exitoso!');
        
        // Opcional: Redirigir a página de inicio de sesión
        // window.location.href = 'logearse.html';
    });

    // Función de validación
    function validateForm(firstName, lastName, email, password, birthdate, gender) {
        // Validaciones detalladas
        if (firstName.length < 2 || lastName.length < 2) {
            alert('Nombre y apellido deben tener al menos 2 caracteres');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un correo electrónico válido');
            return false;
        }

        // Validar contraseña (al menos 8 caracteres, una mayúscula, una minúscula y un número)
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números');
            return false;
        }

        // Validar edad (debe ser mayor de 14 años)
        const today = new Date();
        const birthDate = new Date(birthdate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 14) {
            alert('Debes tener al menos 14 años para registrarte');
            return false;
        }

        if (!gender) {
            alert('Por favor, selecciona un género');
            return false;
        }

        return true;
    }

    // Función para generar un ID único
    function generateUniqueId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Función para hashear contraseña (simulación simple)
    function hashPassword(password) {
        // NOTA: En un entorno real, usa una función de hash segura como bcrypt
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a 32 bits
        }
        return hash.toString();
    }

    // Función para guardar usuario
    function saveUser(user) {
        // Obtener usuarios existentes
        let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Verificar si el correo ya existe
        const emailExists = users.some(existingUser => existingUser.email === user.email);
        
        if (emailExists) {
            alert('Ya existe un usuario registrado con este correo electrónico');
            return false;
        }

        // Agregar nuevo usuario
        users.push(user);
        
        // Guardar en localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        return true;
    }

    // Función para obtener todos los usuarios (opcional, para depuración)
    function getAllUsers() {
        return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    }

    // Función para limpiar todos los usuarios registrados (opcional)
    function clearAllUsers() {
        localStorage.removeItem('registeredUsers');
    }
});