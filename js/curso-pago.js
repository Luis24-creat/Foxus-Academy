document.addEventListener('DOMContentLoaded', function () {
    const toggleClassesBtn = document.getElementById('toggleClasses');
    const classesList = document.getElementById('classesList');
    const chatWindow = document.getElementById('chatWindow');
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    const videoPlayer = document.getElementById('courseVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoDate = document.getElementById('videoDate');

    const classItems = document.querySelectorAll('.classes-list li[data-video-url]');
    const totalVideos = classItems.length;
    let currentProgress = 0; // Para llevar un registro de los videos vistos

    toggleClassesBtn.addEventListener('click', function () {
        classesList.classList.toggle('hidden');
        chatWindow.classList.toggle('hidden');
        this.textContent = classesList.classList.contains('hidden') ? 'Ver clases' : 'Ver comentarios';
    });

    // Simulating video change when clicking on a class in the list
    classItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            classItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');

            // Update video title and date based on the clicked item
            const newTitle = this.querySelector('.video-title').textContent;
            const newDate = 'Publicado el ' + new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
            const newVideoSrc = this.getAttribute('data-video-url');

            // Update video player source
            videoPlayer.src = newVideoSrc;
            videoPlayer.play();

            // Update title and date
            videoTitle.textContent = newTitle;
            videoDate.textContent = newDate;

            // Incrementar el progreso
            currentProgress = Math.floor(((index + 1) / totalVideos) * 100);
            progressBar.style.width = currentProgress + '%';
            progressText.textContent = currentProgress + '%';

            // Close the classes list and show chat
            classesList.classList.add('hidden');
            chatWindow.classList.remove('hidden');
            toggleClassesBtn.textContent = 'Ver clases';
        });
    });

    // Simulating adding a new comment
    const commentInput = document.querySelector('.comment-input textarea');
    const sendCommentBtn = document.querySelector('.comment-input button');
    const commentsContainer = document.querySelector('.comments');

    sendCommentBtn.addEventListener('click', function () {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `
                <img src="user-avatar.jpg" alt="User Avatar" class="avatar">
                <div class="comment-content">
                    <h4>Usuario</h4>
                    <p>${commentText}</p>
                    <span class="timestamp">Ahora</span>
                </div>
            `;
            commentsContainer.prepend(newComment);
            commentInput.value = '';
        }
    });
});
