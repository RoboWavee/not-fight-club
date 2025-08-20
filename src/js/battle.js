document.addEventListener('DOMContentLoaded', function () {


    const savedName = localStorage.getItem('fighterName');
    const savedHero = localStorage.getItem('selectedHero');

    const defaultHero = {
        image: '/src/assets/hero/Mouse.png',
        description: 'Mouse Fitzgerald (or just Fitz) is a green mouse who displays sociopathic, alcoholic, amnesiac, and anthropomorphic behavior. He is fond of beer and is caught in a world of espionage, love, and the delights of odd jobs.'
    };


    if (!savedName) {
        window.location.href = 'index.html';
        return; 
    }

    const heroNameElement = document.getElementById('hero_name');
    heroNameElement.textContent = savedName;

   
    const hero = savedHero ? JSON.parse(savedHero) : defaultHero;
    const heroPicElement = document.querySelector('.hero_view img');
    heroPicElement.src = hero.image;
    heroPicElement.alt = hero.name || savedName; // Используем имя героя или имя игрока


    const heroDescriptionElement = document.getElementById('hero_description');
    if (heroDescriptionElement && hero.description) {
        heroDescriptionElement.textContent = hero.description;
    }

    const bosses = [
        {
            name: 'Shark',
            image: '/src/assets/boss/Shark.png',
            health: 150,
            criticalChance: 30,
            description: 'A boss-shark who became everyone\'s nightmare. Pathologically obsessed with control, yet too lazy for brute force. Speaks in whispers, makes threats wrapped in riddles. Won\'t dirty his fins—he\'d rather sic sentient pepperoni on you or leave a severed hand in your fridge. Office terror is his eternal modus operandi. His signature move? Strike one spot while locking down three.'
        },
        {
            name: 'No-Eyed Guy',
            image: '/src/assets/boss/Cub.png',
            health: 200,
            criticalChance: 20,
            description: 'An arrogant pink square sporting round glasses (despite having no eyes), who fancies himself an oligarch and constantly flaunts his wealth. He tears people apart telepathically, then charges them for "consulting services" and offers "business opportunities" that inevitably explode (along with your life). He\'ll "invest" in you with two attacks, yet only patches up one hole in his own budget.'
        },
        {
            name: 'Pronto',
            image: '/src/assets/boss/Pronto.png',
            health: 120,
            criticalChance: 40,
            description: 'This glorified file clerk turned wannabe assassin spends more time running from fights than actually drawing his bow. Claims to live in some fancy "condo by the quiver" like that makes him sound important rather than just unemployed with extra steps. He\'s just as weak (not John Wick) as you are. Operates on "archer math" - fires one arrow maximum before booking it through two emergency exits.'
        }
    ];

    const randomBoss = bosses[Math.floor(Math.random() * bosses.length)];

    document.getElementById('boss_name').textContent = randomBoss.name;
    document.querySelector('.boss_pic').src = randomBoss.image;
    document.querySelector('.boss_pic').alt = randomBoss.name;
    document.getElementById('boss_tooltip').textContent = randomBoss.description;

    localStorage.setItem('currentBoss', JSON.stringify(randomBoss));

});