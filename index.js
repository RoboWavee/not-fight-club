document.addEventListener('DOMContentLoaded', function() {
    const enterSection = document.getElementById('enter_section');
    const changeSection = document.getElementById('change_section');
    const nameForm = document.getElementById('name_form');
    const greeting = document.getElementById('greeting');
    const nameInput = document.getElementById('name_input');
    const fightButton = document.getElementById('fight_button');
    const backButton = document.getElementById('back_button');
    const savedName = localStorage.getItem('fighterName');
    const savedHero = localStorage.getItem('selectedHero');
    const heroImg = document.getElementById('main_hero_img');

    changeSection.style.display = 'none';

    if (savedName) {
        enterSection.style.display = 'none';
        changeSection.style.display = 'block';
        
        greeting.textContent = `Hello, ${savedName}!`;
    } 

     if (savedHero) {
        const hero = JSON.parse(savedHero);
        heroImg.src = hero.image; 
    }

    nameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
               
        if (name) {
            localStorage.setItem('fighterName', name);
            enterSection.style.display = 'none';
            changeSection.style.display = 'block';
            
            greeting.textContent = `Hello, ${name}!`;
            nameInput.value = '';
        }
    });

    fightButton.addEventListener('click', function() {
        window.location.href = 'fight.html'; // Замените на нужный URL
    });

        backButton.addEventListener('click', function() {
        localStorage.removeItem('fighterName');
        enterSection.style.display = 'block';
        changeSection.style.display = 'none';
    });
});