document.addEventListener('DOMContentLoaded', function () {

    
    const savedName = localStorage.getItem('fighterName');
    const savedHero = localStorage.getItem('selectedHero');
       const nameForm = document.getElementById('name_form');
        const nameInput = document.getElementById('name_input');


if (!savedName || !savedHero) {
    window.location.href = '/src/index.html';
} else {
    
    const hero = JSON.parse(savedHero);
    
    
    const heroNameElement = document.getElementById('hero_name');
    heroNameElement.textContent = savedName;
    
    const heroPicElement = document.querySelector('.hero_view img'); // Исправлено на .hero_view img
    heroPicElement.src = hero.image;
    heroPicElement.alt = hero.name;
}

  nameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const heroNameElement = document.getElementById('hero_name');
        const name = nameInput.value.trim();               
        if (name) {
            localStorage.setItem('fighterName', name);
            nameInput.value = '';
        }

        heroNameElement.textContent = name;
    });
});