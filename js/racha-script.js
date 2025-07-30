// Variables globales
let currentDate = new Date();
let streakData = {
    currentStreak: 0,
    bestStreak: 0,
    totalDays: 0,
    lastCheckIn: null,
    streakDays: []
};

// Cargar datos guardados
function loadStreakData() {
    const savedData = localStorage.getItem('streakData');
    if (savedData) {
        streakData = JSON.parse(savedData);
        updateStreakDisplay();
        updateAchievements();
    }
}

// Guardar datos
function saveStreakData() {
    localStorage.setItem('streakData', JSON.stringify(streakData));
}

// Actualizar display de racha
function updateStreakDisplay() {
    document.getElementById('streakCount').textContent = streakData.currentStreak;
    document.getElementById('bestStreak').textContent = streakData.bestStreak;
    document.getElementById('totalDays').textContent = streakData.totalDays;
}

// Generar calendario
function generateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    document.getElementById('currentMonth').textContent = 
        new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(currentDate);
    
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // Añadir espacios vacíos para los días antes del primer día del mes
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        calendarDays.appendChild(emptyDay);
    }
    
    // Añadir los días del mes
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;
        
        const currentDateString = `${year}-${month + 1}-${day}`;
        
        // Marcar días con racha
        if (streakData.streakDays.includes(currentDateString)) {
            dayElement.classList.add('streak');
        }
        
        // Marcar día actual
        const today = new Date();
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('active');
        }
        
        dayElement.addEventListener('click', () => checkIn(currentDateString));
        calendarDays.appendChild(dayElement);
    }
}

// Función de check-in
function checkIn(dateString) {
    const today = new Date().toLocaleDateString('en-CA');
    const checkInDate = new Date(dateString).toLocaleDateString('en-CA');
    
    // Solo permitir check-in para el día actual
    if (checkInDate !== today) {
        showAchievementPopup('Solo puedes hacer check-in en el día actual');
        return;
    }
    
    // Evitar check-in duplicado
    if (streakData.streakDays.includes(dateString)) {
        showAchievementPopup('¡Ya has hecho check-in hoy!');
        return;
    }
    
    // Actualizar datos de racha
    streakData.streakDays.push(dateString);
    streakData.totalDays++;
    
    // Verificar si la racha continúa
    const lastCheckIn = streakData.lastCheckIn ? new Date(streakData.lastCheckIn) : null;
    const currentCheckIn = new Date(dateString);
    
    if (lastCheckIn) {
        const dayDifference = Math.floor((currentCheckIn - lastCheckIn) / (1000 * 60 * 60 * 24));
        
        if (dayDifference === 1) {
            // Racha continua
            streakData.currentStreak++;
        } else {
            // Racha rota
            streakData.currentStreak = 1;
        }
    } else {
        // Primera racha
        streakData.currentStreak = 1;
    }
    
    // Actualizar mejor racha
    if (streakData.currentStreak > streakData.bestStreak) {
        streakData.bestStreak = streakData.currentStreak;
    }
    
    streakData.lastCheckIn = dateString;
    
    // Guardar y actualizar
    saveStreakData();
    updateStreakDisplay();
    updateAchievements();
    generateCalendar();
    
    // Mostrar mensaje de éxito
    showAchievementPopup('¡Check-in exitoso! 🎉');
}

// Actualizar logros
function updateAchievements() {
    const achievements = document.querySelectorAll('.achievement-card');
    
    achievements.forEach(achievement => {
        const requiredDays = parseInt(achievement.dataset.days);
        const progress = Math.min((streakData.currentStreak / requiredDays) * 100, 100);
        const progressBar = achievement.querySelector('.progress');
        progressBar.style.width = `${progress}%`;
        
        // Verificar si se alcanzó el logro
        if (streakData.currentStreak >= requiredDays && !achievement.classList.contains('achieved')) {
            achievement.classList.add('achieved');
            showAchievementPopup(`¡Logro desbloqueado: ${achievement.querySelector('h3').textContent}!`);
        }
    });
}

// Mostrar popup de logro
function showAchievementPopup(message) {
    const popup = document.getElementById('achievementPopup');
    const messageElement = document.getElementById('achievementMessage');
    
    messageElement.textContent = message;
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}

// Navegación del calendario
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar();
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadStreakData();
    generateCalendar();
});