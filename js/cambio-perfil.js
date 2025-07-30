// Clase principal para manejar el editor de perfil
class ProfileEditor {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.showDefaultTab();
    }

    // Inicializar elementos del DOM
    initializeElements() {
        this.tabLinks = document.querySelectorAll('.tab-link');
        this.contentAreas = {
            'profile': document.getElementById('profile-content'),
            'edit': document.getElementById('edit-profile'),
            'settings': document.getElementById('account-settings'),
            'delete': document.getElementById('delete-account')
        };
        this.profileUpload = document.getElementById('profile-upload');
        this.toggleButtons = document.querySelectorAll('.toggle-password');
        this.saveButtons = document.querySelectorAll('.btn-save');
        this.deleteButton = document.querySelector('.btn-delete');
        this.form = document.querySelector('.profile-form');
    }

    // Adjuntar event listeners
    attachEventListeners() {

        // Manejo de pestañas con redirección para el perfil
        this.tabLinks.forEach(tabLink => {
            tabLink.addEventListener('click', (e) => {
                const tabItem = tabLink.querySelector('.tab-item');
                const tabName = tabItem.getAttribute('data-tab');
                
                // Si es la pestaña de perfil, redirigir
                if (tabName === 'profile') {
                    // Puedes cambiar esta URL por la que necesites
                    window.location.href = 'perfil.html';
                    return;
                }
                
                // Para otras pestañas, mantener el comportamiento normal
                this.handleTabClick(e, tabLink);
            });
        });

        // Manejo de pestañas
        this.tabLinks.forEach(tabLink => {
            tabLink.addEventListener('click', (e) => this.handleTabClick(e, tabLink));
        });

        // Manejo de subida de avatar
        if (this.profileUpload) {
            this.profileUpload.addEventListener('change', (e) => this.handleAvatarUpload(e));
        }

        // Manejo de toggles de contraseña
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handlePasswordToggle(e, button));
        });

        // Manejo de guardado de cambios
        this.saveButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleSave(e));
        });

        // Manejo de eliminación de cuenta
        if (this.deleteButton) {
            this.deleteButton.addEventListener('click', () => this.handleDeleteAccount());
        }

        // Validación en tiempo real de los campos
        const formInputs = document.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    // Mostrar pestaña por defecto
    showDefaultTab() {
        const defaultTab = 'settings'; // O la pestaña que prefieras como inicial
        this.showContent(defaultTab);
        const defaultTabLink = document.querySelector(`.tab-link a[data-tab="${defaultTab}"]`).parentElement;
        defaultTabLink.classList.add('active');
    }

    // Método para manejar la redirección
    handleProfileRedirect() {
        const profileTab = document.querySelector('.tab-item[data-tab="profile"]');
        if (profileTab) {
            profileTab.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = '/tu-perfil.html';
            });
        }
    }

    // Manejador de click en pestañas
    handleTabClick(e, tabLink) {
        e.preventDefault();
        
        // Remover clase activa de todas las pestañas
        this.tabLinks.forEach(t => t.classList.remove('active'));
        
        // Agregar clase activa a la pestaña seleccionada
        tabLink.classList.add('active');
        
        // Obtener y mostrar el contenido correspondiente
        const tabItem = tabLink.querySelector('.tab-item');
        const tabName = tabItem.getAttribute('data-tab');
        this.showContent(tabName);
    }

    // Mostrar contenido de pestaña
    showContent(tabName) {
        Object.values(this.contentAreas).forEach(content => {
            if (content) content.style.display = 'none';
        });
        
        if (this.contentAreas[tabName]) {
            this.contentAreas[tabName].style.display = 'block';
            this.animateContent(this.contentAreas[tabName]);
        }
    }

    // Animar contenido al mostrar
    animateContent(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    }

    // Manejar subida de avatar
    handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (file) {
            if (this.validateImage(file)) {
                this.previewImage(file);
            } else {
                alert('Por favor, selecciona una imagen válida (JPG, PNG) de menos de 5MB');
                this.profileUpload.value = '';
            }
        }
    }

    // Validar imagen
    validateImage(file) {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        return validTypes.includes(file.type) && file.size <= maxSize;
    }

    // Previsualizar imagen
    previewImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const avatarCircle = document.querySelector('.avatar-circle');
            avatarCircle.innerHTML = `<img src="${e.target.result}" 
                style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        };
        reader.readAsDataURL(file);
    }

    // Manejar toggle de contraseña
    handlePasswordToggle(e, button) {
        e.preventDefault();
        const input = button.parentElement.querySelector('input');
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        button.innerHTML = isPassword ? 
            '<i class="icon-eye-off">👁️</i>' : 
            '<i class="icon-eye">👁️</i>';
    }

    // Validar campo individual
    validateField(input) {
        const value = input.value.trim();
        const isValid = value !== '';
        
        if (input.hasAttribute('required')) {
            input.classList.toggle('error', !isValid);
            this.updateFieldStatus(input, isValid);
        }

        if (input.type === 'email') {
            const emailValid = this.validateEmail(value);
            input.classList.toggle('error', !emailValid);
            this.updateFieldStatus(input, emailValid);
        }

        if (input.type === 'password') {
            const passwordValid = value.length >= 6;
            input.classList.toggle('error', !passwordValid);
            this.updateFieldStatus(input, passwordValid);
        }
    }

    // Actualizar estado visual del campo
    updateFieldStatus(input, isValid) {
        const parent = input.parentElement;
        let validationMessage = parent.querySelector('.validation-message');
    
        if (!isValid) {
            if (!validationMessage) {
                validationMessage = document.createElement('div');
                validationMessage.className = 'validation-message';
                validationMessage.textContent = this.getValidationMessage(input);
                parent.appendChild(validationMessage);
            }
        } else if (validationMessage) {
            validationMessage.remove();
        }
    }

    // Obtener mensaje de validación
    getValidationMessage(input) {
        if (input.type === 'email') return 'Ingresa un email válido';
        if (input.type === 'password') return 'La contraseña debe tener al menos 6 caracteres';
        return 'Este campo es requerido';
    }

    // Validar email
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Validar formulario completo
    validateForm() {
        const requiredInputs = document.querySelectorAll('.form-control[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            this.validateField(input);
            if (input.classList.contains('error')) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Manejar guardado de cambios
    async handleSave(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            this.showNotification('Por favor, completa todos los campos requeridos', 'error');
            return;
        }

        const button = e.target;
        button.textContent = 'Guardando...';
        button.disabled = true;

        try {
            // Simular llamada a API
            await this.simulateApiCall();
            this.showNotification('Cambios guardados correctamente', 'success');
        } catch (error) {
            this.showNotification('Error al guardar los cambios', 'error');
        } finally {
            button.textContent = 'Guardar cambios';
            button.disabled = false;
        }
    }

    // Manejar eliminación de cuenta
    handleDeleteAccount() {
        const confirmed = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
        
        if (confirmed) {
            this.deleteButton.textContent = 'Eliminando...';
            this.deleteButton.disabled = true;

            // Simular proceso de eliminación
            setTimeout(() => {
                this.showNotification('Cuenta eliminada correctamente', 'success');
                // Aquí podrías redirigir al usuario a la página de inicio o login
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            }, 1500);
        }
    }

    // Mostrar notificación
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos para la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '4px',
            backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
            color: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            zIndex: '1000'
        });

        document.body.appendChild(notification);

        // Eliminar notificación después de 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Simular llamada a API
    simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }
}

// Inicializar el editor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ProfileEditor();
});