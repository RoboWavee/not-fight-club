document.addEventListener('DOMContentLoaded', function() {
    const enterSection = document.getElementById('enter_section');
    const changeSection = document.getElementById('change_section');
    const nameForm = document.getElementById('name_form');
    const greeting = document.getElementById('greeting');
    const nameInput = document.getElementById('name_input');
    const fightButton = document.getElementById('fight_button');
    const backButton = document.getElementById('back_button');

    changeSection.style.display = 'none';

    const savedName = localStorage.getItem('fighterName');
    if (savedName) {
        enterSection.style.display = 'none';
        changeSection.style.display = 'block';
        greeting.textContent = `Hello, ${savedName}! Don't want to fight?`;
    }

    nameForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
               
        if (name) {
            localStorage.setItem('fighterName', name);
            enterSection.style.display = 'none';
            changeSection.style.display = 'block';
            
            greeting.textContent = `Hello, ${name}! Don't want to fight?`;
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