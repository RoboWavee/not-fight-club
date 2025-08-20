document.addEventListener('DOMContentLoaded', function () {
    const heroName = document.getElementById('hero_name');
    const savedName = localStorage.getItem('fighterName');

    if (savedName) {
        heroName.textContent = savedName;
    } else {
        window.location.href = 'index.html';
    }


    const heroes = [
        {
            id: 1,
            image: '/src/assets/hero/Mouse.png',
            description: 'Mouse Fitzgerald (or just Fitz) is a green mouse who displays sociopathic, alcoholic, amnesiac, and anthropomorphic behavior. He is fond of beer and is caught in a world of espionage, love, and the delights of odd jobs. His speech usually consists of slow surrealist talking or a roundabout figure of speech instead of straight answers to questions.'
        },
        {
            id: 2,
            image: '/src/assets/hero/Skillet-re.jpg',
            description: 'Skillet isn\'t a squirrel — he\'s a chinchilla who can blast lasers from his eyes (yep, handy for cutting ropes when tied to a chair). In his free time, he shreds on drums like a pro.'
        },
        {
            id: 3,
            image: '/src/assets/hero/NewGuy-re.jpg',
            description: 'The New Guy is a strange, ghostly umbrella-like being who lives in a Warehouse. He has a huge obsession with a lounge/exotic song named Princess Cruiser by Tongo Hiti, which often plays on his Record Player so he can dance to it on a hula hoop to hypnotize and torture people with it.'
        },
        {
            id: 4,
            image: '/src/assets/hero/Cop.png',
            description: 'Peanut Cop is a blue peanut who works as a cop but usually fails at his own job of solving crimes by being very drunk or stoned. Peanut is mostly unintelligent (such as mistaking blood for ice cream or hats for shoes) but does have some sort of knowledge at times such as knowing about the functions of the JavaScript and accounting audit.'
        },
        {
            id: 5,
            image: '/src/assets/hero/Roosty.png',
            description: 'Roostre (pronounced and also spelled as Rooster) is a corndog farmer who lives on a farm full of giant corndogs. He has blonde hair that is constantly moving, a hook used in place for one of his hands, and has a habit of playing on an acoustic guitar to sing. Roostre often talks about flat earth and reptilians, which is enough to give anyone a stroke.'
        }
    ];

    const heroPic = document.querySelector('.hero_pic');
    const heroDescription = document.getElementById('hero_description');
    const heroSelector = document.getElementById('hero_selector');
    const heroOptions = document.getElementById('hero_options');
    const closeSelector = document.querySelector('.close_selector');

   
    const savedHero = localStorage.getItem('selectedHero');
    if (savedHero) {
        const heroData = JSON.parse(savedHero);
        heroPic.src = heroData.image;
        heroDescription.textContent = heroData.description;
    } else {
      
        localStorage.setItem('selectedHero', JSON.stringify({
            image: heroes[0].image,
            description: heroes[0].description
        }));
        
        heroPic.src = heroes[0].image;
        heroDescription.textContent = heroes[0].description;
    }


    function createHeroOptions() {
        heroOptions.innerHTML = '';

        heroes.forEach(hero => {
            const option = document.createElement('div');
            option.className = 'hero_option';
            option.innerHTML = `
                    <img src='${hero.image}' alt='hero'>
                    
                    <p class='option_description'>${hero.description}</p>
                `;

            option.addEventListener('click', () => {
                heroPic.src = hero.image;
                heroDescription.textContent = hero.description;

                localStorage.setItem('selectedHero', JSON.stringify({
                    image: hero.image,
                    description: hero.description
                }));

                heroSelector.style.display = 'none';


            });

            heroOptions.appendChild(option);
        });
    }

    heroPic.addEventListener('click', () => {
        createHeroOptions();
        heroSelector.style.display = 'flex';
    });


    closeSelector.addEventListener('click', () => {
        heroSelector.style.display = 'none';
    });

    heroSelector.addEventListener('click', (e) => {
        if (e.target === heroSelector) {
            heroSelector.style.display = 'none';
        }
    });

});