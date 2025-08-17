document.addEventListener('DOMContentLoaded', function() {
    const heroName = document.getElementById('hero_name');
    const savedName = localStorage.getItem('fighterName');

    if (savedName) {
        heroName.textContent = savedName; 
        } else {
         window.location.href = 'index.html';
    }
});

