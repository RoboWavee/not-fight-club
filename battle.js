document.addEventListener('DOMContentLoaded', function () {

    const savedName = localStorage.getItem('fighterName');
    const savedHero = localStorage.getItem('selectedHero');

    const defaultHero = {
        image: 'assets/hero/Mouse.png',
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
            image: 'assets/boss/Shark.png',
            health: 100,
            attack: 1,
            defence: 3,
            description: 'A boss-shark who became everyone\'s nightmare. Pathologically obsessed with control, yet too lazy for brute force. Speaks in whispers, makes threats wrapped in riddles. Won\'t dirty his fins—he\'d rather sic sentient pepperoni on you or leave a severed hand in your fridge. Office terror is his eternal modus operandi. His signature move? Strike one spot while locking down three.'
        },
        {
            name: 'No-Eyed Guy',
            image: 'assets/boss/Cub.png',
            health: 100,
            attack: 2,
            defence: 1,
            description: 'An arrogant pink square sporting round glasses (despite having no eyes), who fancies himself an oligarch and constantly flaunts his wealth. He tears people apart telepathically, then charges them for "consulting services" and offers "business opportunities" that inevitably explode (along with your life). He\'ll "invest" in you with two attacks, yet only patches up one hole in his own budget.'
        },
        {
            name: 'Pronto',
            image: 'assets/boss/Pronto.png',
            health: 100,
            attack: 1,
            defence: 2,
            description: 'This glorified file clerk turned wannabe assassin spends more time running from fights than actually drawing his bow. Claims to live in some fancy "condo by the quiver" like that makes him sound important rather than just unemployed with extra steps. He\'s just as weak (not John Wick) as you are. Operates on "archer math" - fires one arrow maximum before booking it through two emergency exits.'
        }
    ];

    const randomBoss = bosses[Math.floor(Math.random() * bosses.length)];

    document.getElementById('boss_name').textContent = randomBoss.name;
    document.querySelector('.boss_pic').src = randomBoss.image;
    document.querySelector('.boss_pic').alt = randomBoss.name;
    document.getElementById('boss_tooltip').textContent = randomBoss.description;
    localStorage.setItem('currentBoss', JSON.stringify(randomBoss));




    // БОЙ. ВЫБОР АТАКИ И ЗАЩИТЫ

    
    const defenceCheckboxes = document.querySelectorAll('input[name="defence_zone"]');
    const attackCheckboxes = document.querySelectorAll('input[name="attack_zone"]');
    const attackButton = document.getElementById('attack_button');

    let defenceSelected = 0;
    let attackSelected = false;

    defenceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                if (defenceSelected < 2) {
                    defenceSelected++;
                } else {
                    this.checked = false;
                    return;
                }
            } else {
                defenceSelected--;
            }
            
            updateAttackButton();
        });
    });

      attackCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
          
                attackCheckboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
                attackSelected = true;
            } else {
                attackSelected = false;
            }
            
            updateAttackButton();
        });
    });

    function updateAttackButton() {
        
        if (defenceSelected === 2 && attackSelected) {
            attackButton.disabled = false;
            attackButton.style.cursor = 'pointer';
            attackButton.style.opacity = '1';
        } else {
            attackButton.disabled = true;
            attackButton.style.cursor = 'not-allowed';
            attackButton.style.opacity = '0.6';
        }
    }

   attackButton.addEventListener('click', function() {
    // Получаем выбранные зоны защиты
    const selectedDefence = [];
    defenceCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedDefence.push(checkbox.value);
        }
    });
    
    // Получаем выбранную зону атаки
    let selectedAttack = null;
    attackCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedAttack = checkbox.value;
        }
    });
        

     executeBattle(selectedAttack, selectedDefence);
        
    
        resetSelection();
    });

    function resetSelection() {
            defenceCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
         attackCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        
        defenceSelected = 0;
        attackSelected = false;
        
       
        updateAttackButton();
    }

    
    updateAttackButton();




let heroHealth = 100;
let bossHealth = 100;
let currentRound = 1;
const currentBoss = JSON.parse(localStorage.getItem('currentBoss'));

// Обновление полос здоровья
function updateHealthBars() {
    const heroPercentage = (heroHealth / 100) * 100;
    const bossPercentage = (bossHealth / currentBoss.health) * 100;
    
    document.getElementById('hero_health_bar').style.width = `${heroPercentage}%`;
    document.getElementById('boss_health_bar').style.width = `${bossPercentage}%`;
    
    document.getElementById('hero_health_text').textContent = `${heroHealth} / 100`;
    document.getElementById('boss_health_text').textContent = `${bossHealth} / ${currentBoss.health}`;
}

// Функция для получения случайных зон
function getRandomZones(count, availableZones) {
    const zones = [...availableZones];
    const selected = [];
    
    for (let i = 0; i < count; i++) {
        if (zones.length === 0) break;
        const randomIndex = Math.floor(Math.random() * zones.length);
        selected.push(zones[randomIndex]);
        zones.splice(randomIndex, 1);
    }
    
    return selected;
}

// Все возможные зоны
const allZones = ['head', 'body', 'hands', 'belly', 'legs'];

// Функция добавления записи в лог
function addToLog(message, className = '') {
    const logContainer = document.getElementById('battle_log');
    const logEntry = document.createElement('div');
    logEntry.className = `log_entry ${className}`;
    
    // Применяем стилизацию к тексту
    let formattedMessage = message;
    
    // Стилизация для разных типов сообщений
    if (message.includes('=== BATTLE STARTED ===')) {
        formattedMessage = `<span class="log_battle_start">${message}</span>`;
        className = 'log_battle_start';
    }
    else if (message.includes('=== ROUND') && message.includes('===')) {
        formattedMessage = `<span class="log_round">${message}</span>`;
        className = 'log_round';
    }
    else if (message.includes('=== ') && message.includes(' TURN ===')) {
        formattedMessage = `<span class="log_turn">${message}</span>`;
        className = 'log_turn';
    }
    else if (message.includes('=== ROUND') && message.includes('RESULTS ===')) {
        formattedMessage = `<span class="log_results">${message}</span>`;
        className = 'log_results';
    }
    else {
        // Замена имен на стилизованные версии
        formattedMessage = formattedMessage
            .replace(new RegExp(savedName, 'g'), `<span class="log_hero">${savedName}</span>`)
            .replace(new RegExp(currentBoss.name, 'g'), `<span class="log_boss">${currentBoss.name}</span>`)
            .replace(/THIS ZONE WAS PROTECTED!/g, '<span class="log_protected">THIS ZONE WAS PROTECTED!</span>')
            .replace(/SUCCESSFUL HIT! DAMAGE = \d+/g, '<span class="log_hit">$&</span>');
    }
    
    logEntry.innerHTML = formattedMessage;
    
    // Добавляем пробел между раундами
    if (message.includes('RESULTS ===')) {
        const spacer = document.createElement('div');
        spacer.className = 'log_spacer';
        logContainer.appendChild(spacer);
    }
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Основная функция боя
function executeBattle(playerAttack, playerDefence) {
    // Ход босса
    const bossAttackZones = getRandomZones(currentBoss.attack, allZones);
    const bossDefenceZones = getRandomZones(currentBoss.defence, allZones);

    // Заголовок раунда
    addToLog(`=== ROUND ${currentRound} ===`, 'log_round');
    addToLog(`=== ${currentBoss.name.toUpperCase()} TURN ===`, 'log_turn');
    
    // Атака босса
    bossAttackZones.forEach(zone => {
        if (playerDefence.includes(zone)) {
            addToLog(`${currentBoss.name} attacked ${savedName} in ${zone.toUpperCase()} - THIS ZONE WAS PROTECTED! DAMAGE = 0`);
        } else {
            heroHealth = Math.max(0, heroHealth - 10);
            addToLog(`${currentBoss.name} attacked ${savedName} in ${zone.toUpperCase()} - SUCCESSFUL HIT! DAMAGE = 10`);
        }
    });

    // Защита босса
    if (bossDefenceZones.length > 0) {
        addToLog(`${currentBoss.name} is defending: ${bossDefenceZones.map(z => z.toUpperCase()).join(', ')}`);
    }

    // Ход игрока
    addToLog(`=== ${savedName.toUpperCase()} TURN ===`, 'log_turn');
    
    // Атака игрока
    if (playerAttack) {
        if (bossDefenceZones.includes(playerAttack)) {
            addToLog(`${savedName} attacked ${currentBoss.name} in ${playerAttack.toUpperCase()} - THIS ZONE WAS PROTECTED! DAMAGE = 0`);
        } else {
            bossHealth = Math.max(0, bossHealth - 10);
            addToLog(`${savedName} attacked ${currentBoss.name} in ${playerAttack.toUpperCase()} - SUCCESSFUL HIT! DAMAGE = 10`);
        }
    } else {
        addToLog(`${savedName} did not select an attack zone!`);
    }

    // Защита игрока
    if (playerDefence.length > 0) {
        addToLog(`${savedName} is defending: ${playerDefence.map(z => z.toUpperCase()).join(', ')}`);
    } else {
        addToLog(`${savedName} is not defending any zones!`);
    }

    // Итоги раунда
    addToLog(`=== ROUND ${currentRound} RESULTS ===`, 'log_results');
    addToLog(`${savedName} Health: ${heroHealth}/100`);
    addToLog(`${currentBoss.name} Health: ${bossHealth}/${currentBoss.health}`);
    
    // Добавляем пустую строку между раундами
    addToLog('', 'log_spacer');

    // Увеличиваем счетчик раундов
    currentRound++;

    // Обновляем здоровье
    updateHealthBars();

    // Проверка конца игры
    if (heroHealth <= 0 || bossHealth <= 0) {
        setTimeout(() => {
            addToLog('=== BATTLE ENDED ===', 'log_battle_start');
            if (heroHealth <= 0) {
                addToLog(`${currentBoss.name.toUpperCase()} WINS!`, 'log_boss');
                alert('DEFEAT! The boss has won!');
            } else {
                addToLog(`${savedName.toUpperCase()} WINS!`, 'log_hero');
                alert('VICTORY! You defeated the boss!');
            }
            resetGame();
        }, 1000);
    }
}

// Функция сброса игры
function resetGame() {
    heroHealth = 100;
    bossHealth = currentBoss.health;
    currentRound = 1;
    updateHealthBars();
    document.querySelector('.battle_log').innerHTML = '';
    addToLog('=== NEW BATTLE STARTED ===');
    addToLog(`${savedName} vs ${currentBoss.name}`);
    addToLog('');
}


// Инициализация здоровья и начало боя
updateHealthBars();
addToLog('=== BATTLE STARTED ===', 'log_battle_start');
addToLog(`${savedName} vs ${currentBoss.name}`);
addToLog('', 'log_spacer');




});