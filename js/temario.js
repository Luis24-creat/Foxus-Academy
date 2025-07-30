document.addEventListener('DOMContentLoaded', function() {
    // Toggle module content visibility
    const moduleHeaders = document.querySelectorAll('.module-header');
    moduleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('expanded');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar .search-icon');
    const modules = document.querySelectorAll('.module');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        modules.forEach(module => {
            const moduleText = module.textContent.toLowerCase();
            const lessons = module.querySelectorAll('.lessons li');
            let hasMatch = false;

            lessons.forEach(lesson => {
                const lessonText = lesson.textContent.toLowerCase();
                if (lessonText.includes(searchTerm)) {
                    lesson.style.display = 'flex';
                    hasMatch = true;
                } else {
                    lesson.style.display = 'none';
                }
            });

            if (hasMatch || moduleText.includes(searchTerm)) {
                module.style.display = 'block';
                module.classList.add('expanded');
            } else {
                module.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});