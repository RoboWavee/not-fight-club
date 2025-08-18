document.addEventListener('DOMContentLoaded', function () {

    
    const savedName = localStorage.getItem('fighterName');
const savedHero = localStorage.getItem('selectedHero');

// Проверяем, есть ли имя и герой
if (!savedName || !savedHero) {
    window.location.href = 'index.html'; // Перенаправляем, если данных нет
} else {
    // Парсим героя из строки обратно в объект
    const hero = JSON.parse(savedHero);
    
    // Устанавливаем имя
    const heroNameElement = document.getElementById('hero_name');
    heroNameElement.textContent = savedName;
    
    // Устанавливаем картинку героя
    const heroPicElement = document.querySelector('.hero_view img'); // Исправлено на .hero_view img
    heroPicElement.src = hero.image;
    heroPicElement.alt = hero.name;
}




});