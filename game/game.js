/**
 * Math Knight: Quest for the Golden Chest - Main Game Engine
 * Free-Roaming 2D World Exploration, Ultra-Realistic Metallic Knight Armor, Atmospheric 8-Level Scenery & Weather Particles, 10 Shop Equipment Items & Potions.
 */

// --- Game State Object ---
const GameState = {
    mode: "EXPLORE", // "EXPLORE" or "BATTLE"
    level: 1,
    unlockedLevel: 1,
    currentInput: "",
    timerInterval: null,
    timeLeft: 0,
    maxTime: 20,
    isTimed: false,
    screenShake: 0,
    battleCooldownTimer: 0,
    settings: {
        add: true,
        sub: true,
        arrays: true
    },
    // Knight State with Potions & 10 Equipment Items
    knight: {
        hp: 100,
        maxHp: 100,
        xp: 0,
        maxXp: 100,
        gold: 20,
        potions: 0,
        levelNum: 1,
        title: "Squire Knight",
        gear: {
            helmet: false,
            sword: false,
            boots: false,
            shield: false,
            ring: false,
            cloak: false,
            thunderBlade: false,
            crown: false,
            aegisArmor: false,
            frostHammer: false,
            phoenixAmulet: false,
            vorpalDagger: false,
            astralRing: false,
            titanScepter: false,
            phoenixUsedThisLevel: false
        },
        // Battle Position
        x: 180,
        y: 210,
        // World Exploration Position
        worldX: 100,
        worldY: 220,
        vx: 0,
        vy: 0,
        speed: 4,
        dir: "right",
        isWalking: false,
        animFrame: 0,
        isAttacking: false,
        attackProgress: 0,
        isHit: false,
        hitProgress: 0
    },
    // Roaming Map Entities
    mapEnemies: [],
    mapChests: [],
    // Current Active Battle Enemy
    enemy: {
        name: "King Slime",
        hp: 50,
        maxHp: 50,
        type: "slime",
        x: 740,
        y: 210,
        isHit: false,
        hitProgress: 0,
        isAttacking: false,
        attackProgress: 0,
        isFrozen: false
    },
    // Verified Math Equation Object
    currentMath: {
        text: "",
        answer: 0,
        hint: "",
        visualCount: 0
    },
    particles: [],
    weatherParticles: [],
    damageFloatingTexts: [],
    keysPressed: {}
};

// 12 Level Configurations
const LEVEL_CONFIGS = [
    {
        level: 1,
        name: "Level 1: Whispering Forest (Untimed)",
        enemyName: "King Slime",
        enemyHp: 50,
        enemyType: "slime",
        isTimed: false,
        rewardText: "You unlocked 50 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 2,
        name: "Level 2: Goblin Outpost (Untimed)",
        enemyName: "Goblin Berserker",
        enemyHp: 70,
        enemyType: "goblin",
        isTimed: false,
        rewardText: "You unlocked 60 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 3,
        name: "Level 3: Crystal Mines (Untimed)",
        enemyName: "Gargoyle Guardian",
        enemyHp: 90,
        enemyType: "gargoyle",
        isTimed: false,
        rewardText: "You unlocked 75 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 4,
        name: "Level 4: Phantom Catacombs (Timed 25s)",
        enemyName: "Shadow Phantom",
        enemyHp: 110,
        enemyType: "phantom",
        isTimed: true,
        timeLimit: 25,
        rewardText: "You unlocked 90 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 5,
        name: "Level 5: Frostbite Peak (Timed 20s)",
        enemyName: "Ice Golem",
        enemyHp: 130,
        enemyType: "golem",
        isTimed: true,
        timeLimit: 20,
        rewardText: "You unlocked 100 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 6,
        name: "Level 6: Enchanted Citadel (Timed 18s)",
        enemyName: "Dark Wizard",
        enemyHp: 150,
        enemyType: "wizard",
        isTimed: true,
        timeLimit: 18,
        rewardText: "You unlocked 120 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 7,
        name: "Level 7: Volcanic Crater (Timed 15s)",
        enemyName: "Fire Serpent",
        enemyHp: 175,
        enemyType: "serpent",
        isTimed: true,
        timeLimit: 15,
        rewardText: "You unlocked 150 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 8,
        name: "Level 8: Dragon's Vault (Timed 12s BOSS)",
        enemyName: "Grand Crimson Dragon",
        enemyHp: 220,
        enemyType: "dragon",
        isTimed: true,
        timeLimit: 12,
        rewardText: "You completed World 1 and earned 200 Gold Coins!",
        gearKey: null
    },
    {
        level: 9,
        name: "Level 9: Sky Citadel (Timed 15s)",
        enemyName: "Storm Griffin",
        enemyHp: 250,
        enemyType: "griffin",
        isTimed: true,
        timeLimit: 15,
        rewardText: "You unlocked 200 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 10,
        name: "Level 10: Abyss Dungeon (Timed 14s)",
        enemyName: "Abyssal Leviathan",
        enemyHp: 280,
        enemyType: "leviathan",
        isTimed: true,
        timeLimit: 14,
        rewardText: "You unlocked 220 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 11,
        name: "Level 11: Celestial Realm (Timed 12s)",
        enemyName: "Archangel Sentinel",
        enemyHp: 320,
        enemyType: "archangel",
        isTimed: true,
        timeLimit: 12,
        rewardText: "You unlocked 250 Bonus Gold Coins!",
        gearKey: null
    },
    {
        level: 12,
        name: "Level 12: Titan's Lair (Timed 10s FINAL BOSS)",
        enemyName: "Omega Chaos Titan",
        enemyHp: 400,
        enemyType: "titan",
        isTimed: true,
        timeLimit: 10,
        rewardText: "🏆 CONGRATULATIONS CHAMPION! You defeated the Omega Chaos Titan and conquered all 12 levels!",
        gearKey: null
    }
];

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    loadSaveData();
    setupEventListeners();
    setupScratchpad();
    startLevel(GameState.level);
    requestAnimationFrame(gameLoop);
});

let canvas, ctx;
function initCanvas() {
    canvas = document.getElementById('battle-canvas');
    ctx = canvas.getContext('2d');
}

// Mode Switching (EXPLORE vs BATTLE)
function setGameMode(mode) {
    GameState.mode = mode;
    const banner = document.getElementById('mode-banner');
    const mathPanel = document.getElementById('math-panel');
    const dpad = document.getElementById('virtual-dpad');
    const enemyStatusCard = document.getElementById('enemy-status-card');
    const timerContainer = document.getElementById('timer-container');

    mathPanel.style.opacity = "1";
    mathPanel.style.pointerEvents = "auto";

    if (mode === "EXPLORE") {
        banner.innerText = "🚶 EXPLORE MODE - Walk around using WASD / Arrow Keys or D-Pad!";
        dpad.style.display = "grid";
        enemyStatusCard.style.opacity = "0.7";
        timerContainer.classList.remove('active');
        document.getElementById('btn-toggle-mode').innerText = "⚔️ Switch to Battle";
    } else {
        banner.innerText = "⚔️ BATTLE MODE - Solve equations to unleash sword attacks!";
        dpad.style.display = "none";
        enemyStatusCard.style.opacity = "1";
        if (GameState.isTimed) {
            timerContainer.classList.add('active');
        }
        document.getElementById('btn-toggle-mode').innerText = "🏃 Switch to Explore";
    }
}

// Setup Roaming Map Entities
function setupWorldMapEntities() {
    const config = LEVEL_CONFIGS[GameState.level - 1] || LEVEL_CONFIGS[0];

    GameState.mapEnemies = [
        { id: 1, type: config.enemyType, name: config.enemyName, x: 450, y: 180, vx: 1, dirTimer: 0 },
        { id: 2, type: config.enemyType, name: config.enemyName, x: 680, y: 240, vx: -1, dirTimer: 0 },
        { id: 3, type: config.enemyType, name: config.enemyName, x: 820, y: 160, vx: 1, dirTimer: 0 }
    ];

    GameState.mapChests = [
        { id: 1, x: 320, y: 140, opened: false },
        { id: 2, x: 860, y: 230, opened: false }
    ];
}

// Save & Load State
function saveGameData() {
    const saveObj = {
        level: GameState.level,
        unlockedLevel: GameState.unlockedLevel,
        knight: GameState.knight,
        settings: GameState.settings
    };
    localStorage.setItem('math_knight_save', JSON.stringify(saveObj));
}

function loadSaveData() {
    const saved = localStorage.getItem('math_knight_save');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (parsed.knight) GameState.knight = { ...GameState.knight, ...parsed.knight };
            if (parsed.level) GameState.level = parsed.level;
            if (parsed.unlockedLevel) GameState.unlockedLevel = parsed.unlockedLevel;
            if (parsed.settings) GameState.settings = { ...GameState.settings, ...parsed.settings };
            updateInventoryUI();
            updateSettingsUI();
        } catch (e) {
            console.error("Save state error", e);
        }
    }
}

// --- Level & Checked Math Equation Generator ---
function startLevel(levelNum) {
    GameState.level = levelNum;
    if (levelNum > GameState.unlockedLevel) {
        GameState.unlockedLevel = levelNum;
    }

    const config = LEVEL_CONFIGS[levelNum - 1] || LEVEL_CONFIGS[0];

    document.getElementById('level-badge').innerText = config.name;
    GameState.enemy.name = config.enemyName;
    GameState.enemy.hp = config.enemyHp;
    GameState.enemy.maxHp = config.enemyHp;
    GameState.enemy.type = config.enemyType;
    GameState.enemy.isAttacking = false;
    GameState.enemy.isHit = false;
    GameState.isTimed = config.isTimed;
    
    let moveSpeed = 4;
    if (GameState.knight.gear.cloak) moveSpeed += 2;
    if (GameState.knight.gear.boots) moveSpeed += 3;
    GameState.knight.speed = moveSpeed;

    let timeLim = config.timeLimit || 20;
    if (GameState.knight.gear.cloak) timeLim += 5;
    GameState.maxTime = timeLim;

    GameState.knight.worldX = 100;
    GameState.knight.worldY = 220;
    GameState.battleCooldownTimer = 100;

    initWeatherParticles();
    setupWorldMapEntities();
    updateHealthBars();
    generateMathProblem();
    saveGameData();
}

// Atmospheric Weather Particles Initializer
function initWeatherParticles() {
    GameState.weatherParticles = [];
    const lvl = GameState.level;
    const count = 35;

    for (let i = 0; i < count; i++) {
        GameState.weatherParticles.push({
            x: Math.random() * 960,
            y: Math.random() * 340,
            size: Math.random() * 3 + 1,
            vx: (Math.random() - 0.5) * 1.5,
            vy: lvl === 5 ? (Math.random() * 2 + 1) : (lvl === 7 ? - (Math.random() * 2 + 1) : (Math.random() - 0.5) * 0.8),
            alpha: Math.random() * 0.8 + 0.2
        });
    }
}

function generateMathProblem() {
    clearInterval(GameState.timerInterval);

    const level = GameState.level;
    const settings = GameState.settings;

    let op = "+";
    const availableOps = [];
    if (settings.add) availableOps.push("+");
    if (settings.sub) availableOps.push("-");
    if (availableOps.length > 0) {
        op = availableOps[Math.floor(Math.random() * availableOps.length)];
    }

    let n1 = 0, n2 = 0, ans = 0, hint = "", visualDots = 0;

    if (level === 1) {
        n1 = Math.floor(Math.random() * 5) + 1;
        n2 = Math.floor(Math.random() * 4) + 1;
        if (op === "+") {
            ans = n1 + n2;
            hint = `Count: ${n1} + ${n2} = ?`;
            visualDots = ans;
        } else {
            n1 = n1 + n2;
            ans = n1 - n2;
            hint = `Take away: ${n1} - ${n2} = ?`;
            visualDots = n1;
        }
    } else if (level === 2) {
        n1 = Math.floor(Math.random() * 8) + 4;
        n2 = Math.floor(Math.random() * 7) + 3;
        if (op === "+") {
            ans = n1 + n2;
            hint = `Add ${n1} and ${n2}`;
            visualDots = ans <= 15 ? ans : 0;
        } else {
            n1 = n1 + n2;
            ans = n1 - n2;
            hint = `Subtract ${n2} from ${n1}`;
            visualDots = n1 <= 15 ? n1 : 0;
        }
    } else if (level === 3) {
        if (Math.random() > 0.5) {
            n1 = (Math.floor(Math.random() * 4) + 1) * 10;
            n2 = (Math.floor(Math.random() * 4) + 1) * 10;
            if (op === "+") {
                ans = n1 + n2;
                hint = `Add tens: ${n1/10} tens + ${n2/10} tens`;
            } else {
                n1 = n1 + n2;
                ans = n1 - n2;
                hint = `Subtract tens: ${n1/10} tens - ${n2/10} tens`;
            }
        } else {
            n1 = Math.floor(Math.random() * 8) + 6;
            ans = Math.floor(Math.random() * 6) + 3;
            n2 = n1 + ans;
            GameState.currentMath = {
                text: `${n1} +  ?  = ${n2}`,
                answer: ans,
                hint: `What number added to ${n1} equals ${n2}?`,
                visualCount: 0
            };
            displayMathProblem();
            if (GameState.mode === "BATTLE") startTimer();
            return;
        }
    } else if (level === 4 || level === 5) {
        n1 = Math.floor(Math.random() * 30) + 15;
        n2 = Math.floor(Math.random() * 20) + 10;
        if (op === "+") {
            ans = n1 + n2;
            hint = `Add ones (${n1%10} + ${n2%10}), then tens (${Math.floor(n1/10)} + ${Math.floor(n2/10)})`;
        } else {
            n1 = n1 + n2;
            ans = n1 - n2;
            hint = `Subtract ones, then tens!`;
        }
    } else if (level === 6) {
        n1 = Math.floor(Math.random() * 40) + 20;
        n2 = Math.floor(Math.random() * 30) + 12;
        if (op === "+") {
            ans = n1 + n2;
            hint = `Double-digit addition!`;
        } else {
            n1 = n1 + n2;
            ans = n1 - n2;
            hint = `Double-digit subtraction!`;
        }
    } else if (level === 7 || level === 8) {
        if (settings.arrays && Math.random() > 0.4) {
            const groups = Math.floor(Math.random() * 4) + 2;
            const items = Math.floor(Math.random() * 4) + 2;
            ans = groups * items;
            const hintRepeated = Array(groups).fill(items).join(' + ');
            GameState.currentMath = {
                text: `${groups} groups of ${items} = ?`,
                answer: ans,
                hint: `Repeated addition: ${hintRepeated} = ${ans}`,
                visualCount: 0
            };
            displayMathProblem();
            if (GameState.mode === "BATTLE") startTimer();
            return;
        } else {
            const names = ["Knight Bennett", "Knight Alex", "Squire Leo"];
            const chosenName = names[Math.floor(Math.random() * names.length)];
            n1 = Math.floor(Math.random() * 12) + 8;
            n2 = Math.floor(Math.random() * 10) + 5;
            ans = n1 + n2;
            GameState.currentMath = {
                text: `${chosenName} has ${n1} coins & finds ${n2} more. Total = ?`,
                answer: ans,
                hint: `Add ${n1} + ${n2}`,
                visualCount: 0
            };
            displayMathProblem();
            if (GameState.mode === "BATTLE") startTimer();
            return;
        }
    }

    GameState.currentMath = {
        text: `${n1} ${op} ${n2} = ?`,
        answer: ans,
        hint: hint,
        visualCount: visualDots
    };

    displayMathProblem();
    if (GameState.mode === "BATTLE") startTimer();
}

function displayMathProblem() {
    document.getElementById('equation-text').innerText = GameState.currentMath.text;
    document.getElementById('equation-hint').innerText = GameState.currentMath.hint;
    GameState.currentInput = "";
    updateAnswerDisplay();

    const container = document.getElementById('visual-counters');
    container.innerHTML = "";
    if (GameState.currentMath.visualCount > 0 && GameState.currentMath.visualCount <= 20) {
        for (let i = 0; i < GameState.currentMath.visualCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot-counter';
            container.appendChild(dot);
        }
    }
}

// Timer
function startTimer() {
    if (!GameState.isTimed || GameState.mode !== "BATTLE") return;

    GameState.timeLeft = GameState.maxTime;
    updateTimerBar();

    GameState.timerInterval = setInterval(() => {
        GameState.timeLeft -= 0.1;
        updateTimerBar();

        if (GameState.timeLeft <= 0) {
            clearInterval(GameState.timerInterval);
            triggerEnemyAttack("Time Expired!");
        }
    }, 100);
}

function updateTimerBar() {
    const fill = document.getElementById('timer-bar');
    const pct = Math.max(0, (GameState.timeLeft / GameState.maxTime) * 100);
    fill.style.width = `${pct}%`;
}

// --- Player Input & Combat ---
function handleInput(key) {
    sound.playClick();

    if (GameState.mode !== "BATTLE") {
        setGameMode("BATTLE");
    }

    if (key === 'del') {
        GameState.currentInput = GameState.currentInput.slice(0, -1);
    } else if (key === 'clear') {
        GameState.currentInput = "";
    } else if (GameState.currentInput.length < 4) {
        GameState.currentInput += key;
    }
    updateAnswerDisplay();
}

function updateAnswerDisplay() {
    const disp = document.getElementById('answer-display');
    disp.innerText = GameState.currentInput !== "" ? GameState.currentInput : "?";
}

function submitAnswer() {
    if (GameState.currentInput === "") return;

    if (GameState.mode !== "BATTLE") {
        setGameMode("BATTLE");
    }

    clearInterval(GameState.timerInterval);
    const userAns = parseInt(GameState.currentInput, 10);
    const correctAns = Math.round(GameState.currentMath.answer);

    console.log(`[SUBMIT] User: ${userAns}, Correct: ${correctAns}, Enemy HP before: ${GameState.enemy.hp}/${GameState.enemy.maxHp}`);

    GameState.currentInput = "";
    updateAnswerDisplay();

    if (userAns === correctAns) {
        handleKnightAttack();
    } else {
        triggerEnemyAttack("Wrong Answer!");
    }
}

// Knight Attack Execution & Active Equipment Abilities
function handleKnightAttack() {
    sound.playCorrect();
    sound.playAttack();

    GameState.knight.isAttacking = true;
    GameState.knight.attackProgress = 0;

    const gear = GameState.knight.gear;

    let damage = 35;

    // ⚔️ Flaming Sword Ability: Fireball Slash & Burn (+15 damage + 5 burn tick!)
    if (gear.sword) {
        damage += 15;
        createFireballParticles(GameState.knight.x + 40, GameState.knight.y - 10);
        setTimeout(() => {
            if (GameState.enemy.hp > 0) {
                GameState.enemy.hp = Math.max(0, GameState.enemy.hp - 5);
                addDamagePopup("🔥 BURN -5 HP!", GameState.enemy.x, GameState.enemy.y - 60, "#ff4757");
                updateHealthBars();
            }
        }, 500);
    }

    // 🔨 Frost Hammer Ability: Glacial Freeze (+20 DMG, ice shards & 30% freeze chance!)
    if (gear.frostHammer) {
        damage += 20;
        createIceFreezeParticles(GameState.enemy.x, GameState.enemy.y);
        if (Math.random() < 0.3) {
            GameState.enemy.isFrozen = true;
            addDamagePopup("🧊 GLACIAL FREEZE!", GameState.enemy.x, GameState.enemy.y - 80, "#38bdf8");
        } else {
            addDamagePopup("❄️ ICE SHARD +20 DMG!", GameState.enemy.x, GameState.enemy.y - 70, "#7dd3fc");
        }
    }

    // ⚡ Thunder Blade Upgrade Ability: Lightning Chain Strike (+25 bonus DMG & cyan lightning!)
    if (gear.thunderBlade) {
        damage += 25;
        createLightningParticles(GameState.enemy.x, GameState.enemy.y);
        addDamagePopup("⚡ THUNDER +25 DMG!", GameState.enemy.x, GameState.enemy.y - 70, "#00f2fe");
    }

    // 🗡️ Vorpal Dagger Ability: Triple Blade Burst (+30 DMG & 25% chance for 3-hit combo!)
    if (gear.vorpalDagger) {
        damage += 30;
        createSlashComboParticles(GameState.enemy.x, GameState.enemy.y);
        if (Math.random() < 0.25) {
            damage += 20;
            addDamagePopup("🗡️ TRIPLE VORPAL COMBO!", GameState.enemy.x, GameState.enemy.y - 85, "#ef4444");
        }
    }

    // 👑 Victory Crown Ability: Royal Smite (15% chance for 100 Critical DMG!)
    if (gear.crown && Math.random() < 0.15) {
        damage += 65;
        sound.playLevelUp();
        addDamagePopup("⚡ ROYAL SMITE 100 DMG!", GameState.enemy.x, GameState.enemy.y - 90, "#ffd700");
        createSparkParticles(GameState.enemy.x, GameState.enemy.y, "#ffd700");
    }

    // 🪄 Infinity Titan Scepter Ability: Cosmic Cataclysm (+45 DMG & Meteor Strike!)
    if (gear.titanScepter) {
        damage += 45;
        createMeteorStrikeParticles(GameState.enemy.x, GameState.enemy.y);
        GameState.screenShake = 25;
        addDamagePopup("☄️ COSMIC CATACLYSM!", GameState.enemy.x, GameState.enemy.y - 95, "#c084fc");
    }

    // 🪖 Golden Helmet Ability: Holy Shield Aura (+5 HP Regen on correct answer!)
    if (gear.helmet) {
        GameState.knight.hp = Math.min(GameState.knight.maxHp, GameState.knight.hp + 5);
        addDamagePopup("✨ HOLY +5 HP!", GameState.knight.x, GameState.knight.y - 60, "#2ed573");
        createSparkParticles(GameState.knight.x, GameState.knight.y, "#2ed573");
    }

    // 🪶 Phoenix Amulet Ability: Flame Wings & Heal
    if (gear.phoenixAmulet && GameState.knight.hp < GameState.knight.maxHp) {
        GameState.knight.hp = Math.min(GameState.knight.maxHp, GameState.knight.hp + 15);
        createPhoenixWingParticles(GameState.knight.x, GameState.knight.y);
        addDamagePopup("🪶 PHOENIX HEAL +15 HP!", GameState.knight.x, GameState.knight.y - 75, "#ff793f");
    }

    // 💍 Ring of Fortune Ability (+5 Gold per equation!)
    let goldEarned = gear.crown ? 20 : 10;
    if (gear.ring) goldEarned += 5;
    GameState.knight.gold += goldEarned;

    // 🔮 Astral Ring Ability (+100% XP bonus!)
    let xpAmount = gear.astralRing ? 70 : (gear.ring ? 52 : 35);

    // Apply damage to enemy
    const hpBefore = GameState.enemy.hp;
    GameState.enemy.hp = Math.max(0, GameState.enemy.hp - damage);
    GameState.enemy.isHit = true;
    GameState.enemy.hitProgress = 0;

    console.log(`[ATTACK] Damage: ${damage}, Enemy HP: ${hpBefore} → ${GameState.enemy.hp}/${GameState.enemy.maxHp}`);

    addDamagePopup(`-${damage} HP!`, GameState.enemy.x, GameState.enemy.y - 40, "#ffc107");
    addDamagePopup(`+${goldEarned} 🪙`, GameState.knight.x, GameState.knight.y - 40, "#ffc107");
    createSparkParticles(GameState.enemy.x, GameState.enemy.y, "#ffc107");

    addXP(xpAmount);
    updateHealthBars();

    // Force direct DOM update to guarantee bar changes
    const eHpPct = Math.max(0, (GameState.enemy.hp / GameState.enemy.maxHp) * 100);
    const bar = document.getElementById('enemy-hp-bar');
    if (bar) {
        bar.style.width = eHpPct + '%';
        if (eHpPct < 30) {
            bar.style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
        } else if (eHpPct < 60) {
            bar.style.background = 'linear-gradient(90deg, #ffa502, #eccc68)';
        } else {
            bar.style.background = 'linear-gradient(90deg, #2ed573, #7bed9f)';
        }
    }
    document.getElementById('enemy-hp-text').innerText = `HP: ${GameState.enemy.hp}/${GameState.enemy.maxHp}`;

    setTimeout(() => {
        if (GameState.enemy.hp <= 0) {
            handleLevelVictory();
        } else {
            generateMathProblem();
        }
    }, 800);
}

// Enemy Counter-Attack Execution & Sacred Aegis Ability
function triggerEnemyAttack(msg) {
    // Check if Monster is Frozen solid by Frost Hammer
    if (GameState.enemy.isFrozen) {
        GameState.enemy.isFrozen = false;
        sound.playCorrect();
        addDamagePopup("🧊 MONSTER FROZEN! Turn Skipped!", GameState.enemy.x, GameState.enemy.y - 60, "#38bdf8");
        document.getElementById('equation-hint').innerText = "🧊 Monster is frozen solid in ice! Turn skipped!";
        setTimeout(() => {
            generateMathProblem();
        }, 1000);
        return;
    }

    sound.playEnemyAttack();
    sound.playWrong();

    GameState.enemy.isAttacking = true;
    GameState.enemy.attackProgress = 0;

    GameState.screenShake = 15;
    triggerRedHitFlash();

    let enemyDmg = 20;

    // 🛡️ Paladin's Sacred Aegis Armor (20% chance to completely absorb ALL damage!)
    if (GameState.knight.gear.aegisArmor && Math.random() < 0.2) {
        enemyDmg = 0;
        addDamagePopup("🛡️ DIVINE ABSORB 0 DMG!", GameState.knight.x, GameState.knight.y - 60, "#ffd700");
        createSparkParticles(GameState.knight.x, GameState.knight.y, "#ffd700");
    } else if (GameState.knight.gear.shield) {
        // 🛡️ Dragon Shield Ability: Shield Deflect (Blocks 50% damage & reflects 10 DMG to enemy)
        enemyDmg = 10;
        GameState.enemy.hp = Math.max(0, GameState.enemy.hp - 10);
        addDamagePopup("🛡️ REFLECT -10 HP!", GameState.enemy.x, GameState.enemy.y - 40, "#00f2fe");
        createSparkParticles(GameState.enemy.x, GameState.enemy.y, "#00f2fe");
    }

    GameState.knight.hp = Math.max(0, GameState.knight.hp - enemyDmg);
    GameState.knight.isHit = true;
    GameState.knight.hitProgress = 0;

    if (enemyDmg > 0) {
        addDamagePopup(`-${enemyDmg} HP!`, GameState.knight.x, GameState.knight.y - 40, "#ff4757");
        createSparkParticles(GameState.knight.x, GameState.knight.y, "#ff4757");
    }
    updateHealthBars();

    document.getElementById('equation-hint').innerText = `💥 ${GameState.enemy.name} Attacked! (${msg})`;

    // Check for Phoenix Auto-Revive if Knight HP drops to 0
    if (GameState.knight.hp <= 0) {
        if (GameState.knight.gear.phoenixAmulet && !GameState.knight.gear.phoenixUsedThisLevel) {
            GameState.knight.gear.phoenixUsedThisLevel = true;
            GameState.knight.hp = Math.floor(GameState.knight.maxHp * 0.5);
            sound.playLevelUp();
            addDamagePopup("🪶 PHOENIX REBIRTH!", GameState.knight.x, GameState.knight.y - 60, "#ff793f");
            createPhoenixWingParticles(GameState.knight.x, GameState.knight.y);
            updateHealthBars();
            setTimeout(() => {
                generateMathProblem();
            }, 1200);
            return;
        }

        setTimeout(() => {
            document.getElementById('modal-gameover').classList.add('active');
        }, 800);
    } else {
        setTimeout(() => {
            generateMathProblem();
        }, 1200);
    }
}

function triggerRedHitFlash() {
    const flash = document.getElementById('hit-flash-overlay');
    flash.classList.add('active');
    setTimeout(() => {
        flash.classList.remove('active');
    }, 200);
}

function addXP(amount) {
    GameState.knight.xp += amount;
    if (GameState.knight.xp >= GameState.knight.maxXp) {
        GameState.knight.xp -= GameState.knight.maxXp;
        GameState.knight.levelNum += 1;
        GameState.knight.hp = GameState.knight.maxHp;
        sound.playLevelUp();

        const titles = ["Novice Squire", "Brave Knight", "Grand Champion", "Dragon Slayer"];
        GameState.knight.title = titles[Math.min(GameState.knight.levelNum - 1, titles.length - 1)];

        addDamagePopup("LEVEL UP!", GameState.knight.x, GameState.knight.y - 60, "#00f2fe");
    }
    saveGameData();
}

function handleLevelVictory() {
    sound.playChestUnlock();

    if (GameState.level < 8 && GameState.unlockedLevel < GameState.level + 1) {
        GameState.unlockedLevel = GameState.level + 1;
    }

    const goldBonus = 50 + (GameState.level * 10);
    GameState.knight.gold += goldBonus;

    document.getElementById('reward-title').innerText = `Level ${GameState.level} Cleared!`;
    document.getElementById('reward-desc').innerText = `You earned +${goldBonus} 🪙 Gold Coins! Visit the Armor Shop to unlock items with Active Abilities!`;
    document.getElementById('modal-chest').classList.add('active');

    updateInventoryUI();
    renderWorldMap();
    saveGameData();
}

// Use Stored Potion Function
function usePotion() {
    const knight = GameState.knight;
    if (knight.potions <= 0) {
        sound.playWrong();
        addDamagePopup("No Potions! Buy in Store 🧪", knight.x, knight.y - 40, "#ff4757");
        return;
    }

    if (knight.hp >= knight.maxHp) {
        addDamagePopup("HP Already 100% Full!", knight.x, knight.y - 40, "#00f2fe");
        return;
    }

    knight.potions--;
    knight.hp = knight.maxHp;
    sound.playLevelUp();
    addDamagePopup("✨ 100% FULL HP!", knight.x, knight.y - 40, "#2ed573");
    createSparkParticles(knight.x, knight.y, "#2ed573");

    updateHealthBars();
    updateInventoryUI();
    saveGameData();
}

// --- Armor & Item Store Purchasing Logic ---
window.buyArmor = function(gearKey, price, hpBonus, dmgBonus) {
    const knight = GameState.knight;
    const msgEl = document.getElementById('shop-message');

    if (gearKey === "potion") {
        if (knight.gold < price) {
            sound.playWrong();
            if (msgEl) msgEl.innerText = "❌ Not enough 🪙 Gold Coins!";
            addDamagePopup("Not enough 🪙 Gold!", knight.x, knight.y - 40, "#ff4757");
            return;
        }

        knight.gold -= price;

        if (knight.hp < knight.maxHp) {
            knight.hp = knight.maxHp;
            sound.playLevelUp();
            if (msgEl) msgEl.innerText = "✨ Elixir Drank! HP restored to 100% Full Health!";
            addDamagePopup("✨ 100% FULL HP!", knight.x, knight.y - 40, "#2ed573");
        } else {
            knight.potions = (knight.potions || 0) + 1;
            sound.playChestUnlock();
            if (msgEl) msgEl.innerText = `🧪 Potion Purchased & Added to Inventory! (Owned: ${knight.potions})`;
            addDamagePopup("🧪 POTION BOUGHT!", knight.x, knight.y - 40, "#2ed573");
        }

        updateInventoryUI();
        updateHealthBars();
        saveGameData();
        return;
    }

    if (knight.gear[gearKey]) return;

    if (knight.gold < price) {
        sound.playWrong();
        if (msgEl) msgEl.innerText = "❌ Not enough 🪙 Gold Coins!";
        addDamagePopup("Not enough 🪙 Gold!", knight.x, knight.y - 40, "#ff4757");
        return;
    }

    knight.gold -= price;
    knight.gear[gearKey] = true;

    if (hpBonus > 0) {
        knight.maxHp += hpBonus;
        knight.hp += hpBonus;
    }

    if (gearKey === "boots") {
        knight.speed += 3;
    } else if (gearKey === "cloak") {
        knight.speed += 2;
    }

    sound.playChestUnlock();
    if (msgEl) msgEl.innerText = `🎉 Item Unlocked and Equipped!`;
    addDamagePopup("ITEM UNLOCKED!", knight.x, knight.y - 40, "#2ed573");

    updateInventoryUI();
    updateHealthBars();
    saveGameData();
};

// --- Health & UI Updates ---
function updateHealthBars() {
    document.getElementById('gold-count').innerText = GameState.knight.gold;
    const potEl = document.getElementById('potion-count');
    if (potEl) potEl.innerText = GameState.knight.potions || 0;

    // Knight HP bar
    const kHpPct = Math.max(0, (GameState.knight.hp / GameState.knight.maxHp) * 100);
    const kBar = document.getElementById('knight-hp-bar');
    kBar.style.width = `${kHpPct}%`;
    if (kHpPct < 30) {
        kBar.style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
    } else if (kHpPct < 60) {
        kBar.style.background = 'linear-gradient(90deg, #ffa502, #eccc68)';
    } else {
        kBar.style.background = 'linear-gradient(90deg, #2ed573, #7bed9f)';
    }
    document.getElementById('knight-hp-text').innerText = `HP: ${GameState.knight.hp}/${GameState.knight.maxHp}`;

    const kXp = (GameState.knight.xp / GameState.knight.maxXp) * 100;
    document.getElementById('knight-xp-bar').style.width = `${kXp}%`;
    document.getElementById('knight-xp-text').innerText = `XP: ${GameState.knight.xp}/${GameState.knight.maxXp}`;
    document.getElementById('knight-title').innerText = GameState.knight.title;
    document.getElementById('knight-level-num').innerText = `Lvl ${GameState.knight.levelNum}`;

    // Enemy HP bar
    const eHpPct = Math.max(0, (GameState.enemy.hp / GameState.enemy.maxHp) * 100);
    const eBar = document.getElementById('enemy-hp-bar');
    eBar.style.width = `${eHpPct}%`;
    if (eHpPct < 30) {
        eBar.style.background = 'linear-gradient(90deg, #ff4757, #ff6b81)';
    } else if (eHpPct < 60) {
        eBar.style.background = 'linear-gradient(90deg, #ffa502, #eccc68)';
    } else {
        eBar.style.background = 'linear-gradient(90deg, #2ed573, #7bed9f)';
    }
    document.getElementById('enemy-hp-text').innerText = `HP: ${GameState.enemy.hp}/${GameState.enemy.maxHp}`;
    document.getElementById('enemy-name').innerText = GameState.enemy.name;
}

function updateInventoryUI() {
    document.getElementById('gold-count').innerText = GameState.knight.gold;
    const potEl = document.getElementById('potion-count');
    if (potEl) potEl.innerText = GameState.knight.potions || 0;

    const g = GameState.knight.gear;

    const updateBtn = (id, owned, key, price, hpB, dmgB) => {
        const btn = document.getElementById(id);
        const card = document.getElementById('shop-' + key);
        if (btn && card) {
            if (key === "potion") {
                btn.innerText = `Buy Potion (${price} 🪙)`;
                btn.className = "btn-buy";
            } else if (owned) {
                btn.innerText = "✓ EQUIPPED";
                btn.className = "btn-buy equipped";
                card.classList.add('purchased');
            } else {
                btn.innerText = `Buy for ${price} 🪙`;
                btn.className = "btn-buy";
                card.classList.remove('purchased');
            }
        }
    };

    updateBtn('buy-helmet', g.helmet, 'helmet', 50, 20, 0);
    updateBtn('buy-sword', g.sword, 'sword', 80, 0, 15);
    updateBtn('buy-boots', g.boots, 'boots', 60, 10, 0);
    updateBtn('buy-potion', false, 'potion', 40, 0, 0);
    updateBtn('buy-shield', g.shield, 'shield', 100, 0, 0);
    updateBtn('buy-ring', g.ring, 'ring', 120, 0, 0);
    updateBtn('buy-cloak', g.cloak, 'cloak', 150, 0, 0);
    updateBtn('buy-frostHammer', g.frostHammer, 'frostHammer', 160, 0, 20);
    updateBtn('buy-phoenixAmulet', g.phoenixAmulet, 'phoenixAmulet', 175, 15, 0);
    updateBtn('buy-thunderBlade', g.thunderBlade, 'thunderBlade', 180, 0, 25);
    updateBtn('buy-vorpalDagger', g.vorpalDagger, 'vorpalDagger', 210, 0, 30);
    updateBtn('buy-astralRing', g.astralRing, 'astralRing', 230, 30, 0);
    updateBtn('buy-crown', g.crown, 'crown', 200, 50, 0);
    updateBtn('buy-aegisArmor', g.aegisArmor, 'aegisArmor', 250, 60, 0);
    updateBtn('buy-titanScepter', g.titanScepter, 'titanScepter', 300, 0, 45);
}

function renderWorldMap() {
    const grid = document.getElementById('level-map-grid');
    grid.innerHTML = "";

    LEVEL_CONFIGS.forEach((cfg) => {
        const isUnlocked = cfg.level <= GameState.unlockedLevel;
        const card = document.createElement('div');
        card.className = `map-level-card ${isUnlocked ? 'unlocked' : ''}`;

        card.innerHTML = `
            <div class="map-level-title">${isUnlocked ? '⚔️' : '🔒'} ${cfg.name}</div>
            <div class="map-level-desc">${cfg.enemyName} (${cfg.isTimed ? 'Timed ' + cfg.timeLimit + 's' : 'Untimed'})</div>
        `;

        if (isUnlocked) {
            card.addEventListener('click', () => {
                document.getElementById('modal-map').classList.remove('active');
                startLevel(cfg.level);
            });
        }

        grid.appendChild(card);
    });
}

function updateSettingsUI() {
    document.getElementById('opt-add').checked = GameState.settings.add;
    document.getElementById('opt-sub').checked = GameState.settings.sub;
    document.getElementById('opt-arrays').checked = GameState.settings.arrays;
}

// --- Main Canvas Render Loop ---
let animTimer = 0;
function gameLoop(timestamp) {
    animTimer += 0.03;

    if (GameState.battleCooldownTimer > 0) {
        GameState.battleCooldownTimer--;
    }

    updateKnightWalking();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    if (GameState.screenShake > 0) {
        const shakeX = (Math.random() - 0.5) * GameState.screenShake;
        const shakeY = (Math.random() - 0.5) * GameState.screenShake;
        ctx.translate(shakeX, shakeY);
        GameState.screenShake *= 0.85;
        if (GameState.screenShake < 0.5) GameState.screenShake = 0;
    }

    if (GameState.mode === "EXPLORE") {
        drawExploreWorld();
    } else {
        drawBattleWorld();
    }

    updateAndDrawWeatherParticles();
    updateAndDrawParticles();
    updateAndDrawPopups();

    ctx.restore();

    requestAnimationFrame(gameLoop);
}

// Walking Exploration Physics
function updateKnightWalking() {
    if (GameState.mode !== "EXPLORE") return;

    let moveX = 0, moveY = 0;

    if (GameState.keysPressed['ArrowLeft'] || GameState.keysPressed['a'] || GameState.keysPressed['A']) moveX -= 1;
    if (GameState.keysPressed['ArrowRight'] || GameState.keysPressed['d'] || GameState.keysPressed['D']) moveX += 1;
    if (GameState.keysPressed['ArrowUp'] || GameState.keysPressed['w'] || GameState.keysPressed['W']) moveY -= 1;
    if (GameState.keysPressed['ArrowDown'] || GameState.keysPressed['s'] || GameState.keysPressed['S']) moveY += 1;

    const knight = GameState.knight;
    if (moveX !== 0 || moveY !== 0) {
        knight.isWalking = true;
        knight.worldX = Math.max(40, Math.min(canvas.width - 40, knight.worldX + moveX * knight.speed));
        knight.worldY = Math.max(100, Math.min(canvas.height - 40, knight.worldY + moveY * knight.speed));
        if (moveX < 0) knight.dir = "left";
        if (moveX > 0) knight.dir = "right";
    } else {
        knight.isWalking = false;
    }

    if (GameState.battleCooldownTimer <= 0) {
        GameState.mapEnemies.forEach((e) => {
            e.dirTimer += 0.05;
            if (e.dirTimer > 3) {
                e.vx *= -1;
                e.dirTimer = 0;
            }
            e.x += e.vx * 0.8;
            if (e.x < 200) e.x = 200;
            if (e.x > canvas.width - 60) e.x = canvas.width - 60;

            const dist = Math.hypot(knight.worldX - e.x, knight.worldY - e.y);
            if (dist < 45) {
                sound.playAttack();
                setGameMode("BATTLE");
                generateMathProblem();
            }
        });
    }

    GameState.mapChests.forEach((chest) => {
        if (!chest.opened) {
            const dist = Math.hypot(knight.worldX - chest.x, knight.worldY - chest.y);
            if (dist < 40) {
                chest.opened = true;
                sound.playChestUnlock();
                knight.gold += 30;
                addXP(50);
                knight.hp = Math.min(knight.maxHp, knight.hp + 25);
                updateHealthBars();
                addDamagePopup("🎁 +30 🪙 GOLD!", chest.x, chest.y - 20, "#ffc107");
            }
        }
    });
}

function drawExploreWorld() {
    drawEnvironmentScenery();

    // Draw treasure chests as 3D boxes
    GameState.mapChests.forEach((c) => {
        drawTreasureChest(c.x, c.y, c.opened);
    });

    // Collect all sprites for depth sorting (y-axis)
    const sprites = [];
    GameState.mapEnemies.forEach((e) => {
        sprites.push({ type: 'enemy', data: e, y: e.y });
    });
    sprites.push({ type: 'knight', y: GameState.knight.worldY });
    sprites.sort((a, b) => a.y - b.y);

    sprites.forEach(s => {
        if (s.type === 'enemy') {
            drawMonsterSprite(s.data.type, s.data.x, s.data.y);
        } else {
            const k = GameState.knight;
            drawRealisticKnightSprite(k.worldX, k.worldY, k.dir, k.isWalking);
        }
    });
}

function drawTreasureChest(x, y, opened) {
    ctx.save();
    // Shadow
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.ellipse(x, y + 14, 18, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    if (opened) {
        // Open chest body
        let bodyGrad = ctx.createLinearGradient(x - 14, y - 4, x + 14, y + 12);
        bodyGrad.addColorStop(0, '#92400e');
        bodyGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.roundRect(x - 14, y - 4, 28, 16, 3);
        ctx.fill();
        // Gold inside
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.ellipse(x, y + 2, 10, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Open lid tilted back
        ctx.fillStyle = "#78350f";
        ctx.beginPath();
        ctx.moveTo(x - 14, y - 4);
        ctx.lineTo(x - 16, y - 18);
        ctx.lineTo(x + 12, y - 18);
        ctx.lineTo(x + 14, y - 4);
        ctx.closePath();
        ctx.fill();
        // Band on lid
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 15, y - 11);
        ctx.lineTo(x + 13, y - 11);
        ctx.stroke();
    } else {
        // Closed chest body
        let bodyGrad = ctx.createLinearGradient(x - 14, y - 10, x + 14, y + 12);
        bodyGrad.addColorStop(0, '#b45309');
        bodyGrad.addColorStop(1, '#78350f');
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.roundRect(x - 14, y - 10, 28, 22, 3);
        ctx.fill();
        // Lid dome
        ctx.fillStyle = "#92400e";
        ctx.beginPath();
        ctx.arc(x, y - 10, 14, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill();
        // Metal bands
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 14, y - 10, 28, 22);
        // Lock
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(x, y + 1, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#451a03";
        ctx.beginPath();
        ctx.arc(x, y + 1, 2, 0, Math.PI * 2);
        ctx.fill();
        // Glow
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 12;
        ctx.fillStyle = "rgba(251, 191, 36, 0.3)";
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    ctx.restore();
}

function drawBattleWorld() {
    drawEnvironmentScenery();
    drawUpgradedBattleKnight();
    drawUpgradedBattleEnemy();
}

// ===== CINEMATIC ENVIRONMENT RENDERER =====
// Each of the 8 worlds has: sky gradient, distant background features, mid-ground scenery objects, textured ground, and ground details
function drawEnvironmentScenery() {
    const lvl = GameState.level;
    const W = canvas.width;
    const H = canvas.height;
    const groundY = 255;

    // --- Sky ---
    let skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
    const skyColors = {
        1: [['#020d06',0],['#0a2614',0.5],['#153d22',1]],
        2: [['#08021a',0],['#1a0835',0.5],['#2d104f',1]],
        3: [['#020810',0],['#081830',0.5],['#0e2a50',1]],
        4: [['#06060e',0],['#0e0e1e',0.5],['#181832',1]],
        5: [['#030e1e',0],['#0a2545',0.5],['#154070',1]],
        6: [['#0e0420',0],['#220a44',0.5],['#3a1170',1]],
        7: [['#1a0202',0],['#3a0808',0.5],['#5a1010',1]],
        8: [['#1a1002',0],['#3a2508',0.5],['#5a3a10',1]],
        9: [['#0284c7',0],['#38bdf8',0.5],['#7dd3fc',1]],
        10: [['#090514',0],['#190a38',0.5],['#2e0c5e',1]],
        11: [['#1e1b4b',0],['#312e81',0.5],['#4338ca',1]],
        12: [['#450a0a',0],['#7f1d1d',0.5],['#b91c1c',1]]
    };
    (skyColors[lvl] || skyColors[1]).forEach(([c,s]) => skyGrad.addColorStop(s,c));
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H);

    // --- Stars (levels 1,2,4,6,10,11) ---
    if ([1,2,4,6,10,11].includes(lvl)) {
        ctx.fillStyle = "#fff";
        const starSeed = lvl * 137;
        for (let i = 0; i < 40; i++) {
            const sx = ((starSeed + i * 97) % W);
            const sy = ((starSeed + i * 53) % (groundY - 60));
            const ss = ((i % 3) + 1) * 0.6;
            ctx.globalAlpha = 0.3 + Math.sin(animTimer * 2 + i) * 0.25;
            ctx.beginPath();
            ctx.arc(sx, sy, ss, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    // --- Moon (levels 2, 4) ---
    if (lvl === 2 || lvl === 4) {
        ctx.save();
        const moonX = 820, moonY = 55, moonR = 28;
        ctx.fillStyle = lvl === 4 ? "rgba(192, 132, 252, 0.15)" : "rgba(253, 224, 71, 0.1)";
        ctx.shadowColor = lvl === 4 ? "#a855f7" : "#fde047";
        ctx.shadowBlur = 40;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonR + 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        let moonGrad = ctx.createRadialGradient(moonX - 5, moonY - 5, 2, moonX, moonY, moonR);
        moonGrad.addColorStop(0, lvl === 4 ? '#e9d5ff' : '#fef9c3');
        moonGrad.addColorStop(1, lvl === 4 ? '#a78bfa' : '#fde047');
        ctx.fillStyle = moonGrad;
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
        ctx.fill();
        // Craters
        ctx.fillStyle = lvl === 4 ? "rgba(139,92,246,0.3)" : "rgba(202,138,4,0.3)";
        ctx.beginPath();
        ctx.arc(moonX - 8, moonY - 6, 5, 0, Math.PI * 2);
        ctx.arc(moonX + 10, moonY + 5, 3, 0, Math.PI * 2);
        ctx.arc(moonX + 3, moonY + 10, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    // --- Aurora Borealis (level 5) ---
    if (lvl === 5) {
        ctx.save();
        for (let band = 0; band < 3; band++) {
            const yBase = 30 + band * 25;
            ctx.globalAlpha = 0.12 + Math.sin(animTimer + band) * 0.06;
            let auroraGrad = ctx.createLinearGradient(0, yBase, W, yBase);
            auroraGrad.addColorStop(0, 'rgba(34,211,238,0)');
            auroraGrad.addColorStop(0.3, 'rgba(34,211,238,0.5)');
            auroraGrad.addColorStop(0.5, 'rgba(74,222,128,0.6)');
            auroraGrad.addColorStop(0.7, 'rgba(168,85,247,0.5)');
            auroraGrad.addColorStop(1, 'rgba(168,85,247,0)');
            ctx.fillStyle = auroraGrad;
            ctx.beginPath();
            ctx.moveTo(0, yBase + 20);
            for (let px = 0; px <= W; px += 30) {
                ctx.lineTo(px, yBase + Math.sin(px * 0.008 + animTimer * 0.7 + band * 2) * 18);
            }
            ctx.lineTo(W, yBase + 40);
            ctx.lineTo(0, yBase + 40);
            ctx.closePath();
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    // --- Distant Background Scenery ---
    drawDistantScenery(lvl, W, groundY);

    // --- Ground ---
    let groundGrad = ctx.createLinearGradient(0, groundY, 0, H);
    const groundColors = {
        1: [['#1a4025',0],['#0c1f11',1]],
        2: [['#1e1832',0],['#0e0c1a',1]],
        3: [['#12243a',0],['#0a1520',1]],
        4: [['#18182e',0],['#0c0c18',1]],
        5: [['#bae6fd',0],['#7dd3fc',0.3],['#38bdf8',1]],
        6: [['#2a1050',0],['#150830',1]],
        7: [['#5c1010',0],['#2a0606',1]],
        8: [['#b8860b',0],['#8b6914',0.4],['#6b4f10',1]],
        9: [['#e0f2fe',0],['#bae6fd',0.5],['#7dd3fc',1]],
        10: [['#1e1b4b',0],['#0f172a',1]],
        11: [['#fef08a',0],['#ca8a04',0.5],['#854d0e',1]],
        12: [['#78350f',0],['#451a03',1]]
    };
    (groundColors[lvl] || groundColors[1]).forEach(([c,s]) => groundGrad.addColorStop(s,c));
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, groundY, W, H - groundY);

    // --- Ground edge ---
    ctx.strokeStyle = getGroundEdgeColor(lvl);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(W, groundY);
    ctx.stroke();

    // --- Ground Detail ---
    drawGroundDetail(lvl, W, H, groundY);
}

function getGroundEdgeColor(lvl) {
    if (lvl === 7) return "rgba(239, 68, 68, 0.5)";
    if (lvl === 8) return "rgba(251, 191, 36, 0.5)";
    if (lvl === 5) return "rgba(186, 230, 253, 0.6)";
    if (lvl === 1) return "rgba(74, 222, 128, 0.3)";
    return "rgba(0, 242, 254, 0.25)";
}

function drawDistantScenery(lvl, W, groundY) {
    ctx.save();

    if (lvl === 1) {
        // Whispering Forest: layered trees in silhouette
        // Far trees (dark, small)
        for (let i = 0; i < 10; i++) {
            const tx = i * 105 + 30;
            const th = 70 + Math.sin(i * 2.3) * 20;
            drawTree(tx, groundY, th, 'rgba(8,30,12,0.9)', 'rgba(5,20,8,0.9)');
        }
        // Near trees (brighter, larger)
        for (let i = 0; i < 7; i++) {
            const tx = i * 150 + 60;
            const th = 100 + Math.sin(i * 1.7) * 25;
            drawTree(tx, groundY, th, '#0f3818', '#0a2510');
        }
        // Fog layer at ground
        ctx.fillStyle = "rgba(20, 56, 29, 0.3)";
        ctx.fillRect(0, groundY - 15, W, 20);
    }

    else if (lvl === 2) {
        // Goblin Outpost: wooden palisade wall with torches
        const palisadeY = groundY;
        for (let i = 0; i < 18; i++) {
            const px = i * 58 + 10;
            const ph = 65 + (i % 3) * 10;
            // Log
            let logGrad = ctx.createLinearGradient(px, palisadeY - ph, px + 12, palisadeY);
            logGrad.addColorStop(0, '#5c3a14');
            logGrad.addColorStop(0.5, '#78451a');
            logGrad.addColorStop(1, '#3d2008');
            ctx.fillStyle = logGrad;
            ctx.fillRect(px - 6, palisadeY - ph, 12, ph);
            // Point
            ctx.beginPath();
            ctx.moveTo(px - 7, palisadeY - ph);
            ctx.lineTo(px, palisadeY - ph - 14);
            ctx.lineTo(px + 7, palisadeY - ph);
            ctx.closePath();
            ctx.fill();
        }
        // Torches on some posts
        [2, 6, 10, 14].forEach(i => {
            const tx = i * 58 + 10;
            const ty = groundY - 75 - (i % 3) * 10 - 14;
            drawTorchFlame(tx, ty);
        });
    }

    else if (lvl === 3) {
        // Crystal Mines: stalactites hanging from ceiling, crystal formations
        for (let i = 0; i < 14; i++) {
            const sx = i * 72 + 20 + Math.sin(i * 3.1) * 15;
            const sl = 30 + Math.sin(i * 1.9) * 20;
            drawStalactite(sx, 0, sl);
        }
        // Crystal clusters on ground
        const crystalPositions = [80, 220, 400, 560, 750, 890];
        crystalPositions.forEach((cx, i) => {
            drawCrystalCluster(cx, groundY, i);
        });
    }

    else if (lvl === 4) {
        // Phantom Catacombs: stone arches, pillars, tombstones
        // Gothic arches
        for (let i = 0; i < 4; i++) {
            const ax = i * 260 + 100;
            drawGothicArch(ax, groundY);
        }
        // Tombstones
        const tombX = [50, 180, 350, 520, 700, 850];
        tombX.forEach((tx, i) => {
            drawTombstone(tx, groundY, i);
        });
    }

    else if (lvl === 5) {
        // Frostbite Peak: jagged icy mountains
        // Far mountains
        ctx.fillStyle = "#1e3a5f";
        drawMountainRange(W, groundY - 10, 120, 0.7, 5);
        // Near mountains
        ctx.fillStyle = "#2d5a8a";
        drawMountainRange(W, groundY, 90, 0.85, 7);
        // Snow caps
        ctx.fillStyle = "rgba(224, 242, 254, 0.6)";
        drawMountainRange(W, groundY - 55, 35, 0.4, 5);
    }

    else if (lvl === 6) {
        // Enchanted Citadel: tall towers with glowing windows
        drawCitadelTowers(W, groundY);
        // Magic rune circles on ground
        drawRuneCircles(W, groundY);
    }

    else if (lvl === 7) {
        // Volcanic Crater: rocky crags, lava pools
        // Jagged volcanic rocks
        ctx.fillStyle = "#2a0606";
        drawMountainRange(W, groundY, 80, 0.9, 9);
        ctx.fillStyle = "#3d0a0a";
        drawMountainRange(W, groundY + 5, 50, 0.6, 6);
        // Lava pools glowing on ground
        drawLavaPools(W, groundY);
    }

    else if (lvl === 8) {
        // Dragon's Vault: treasure piles, golden pillars
        drawTreasureVault(W, groundY);
    }

    else if (lvl === 9) {
        // Sky Citadel: floating cloud islands
        drawSkyIslands(W, groundY);
    }

    else if (lvl === 10) {
        // Abyss Dungeon: dark obsidian pillars with void cracks
        drawAbyssPillars(W, groundY);
    }

    else if (lvl === 11) {
        // Celestial Realm: starlight marble pillars and halos
        drawCelestialPillars(W, groundY);
    }

    else if (lvl === 12) {
        // Titan's Lair: colossal titan statues and lava fissures
        drawTitanStatues(W, groundY);
    }

    ctx.restore();
}

// --- Environment Detail Helpers ---

function drawTree(x, groundY, height, trunkColor, leafColor) {
    // Trunk
    ctx.fillStyle = trunkColor;
    ctx.fillRect(x - 4, groundY - height * 0.35, 8, height * 0.35);
    // Canopy layers
    ctx.fillStyle = leafColor;
    ctx.beginPath();
    ctx.moveTo(x, groundY - height);
    ctx.bezierCurveTo(x - 25, groundY - height * 0.7, x - 30, groundY - height * 0.4, x - 18, groundY - height * 0.3);
    ctx.lineTo(x + 18, groundY - height * 0.3);
    ctx.bezierCurveTo(x + 30, groundY - height * 0.4, x + 25, groundY - height * 0.7, x, groundY - height);
    ctx.fill();
    // Second layer
    ctx.beginPath();
    ctx.moveTo(x, groundY - height * 0.85);
    ctx.bezierCurveTo(x - 18, groundY - height * 0.55, x - 22, groundY - height * 0.35, x - 14, groundY - height * 0.25);
    ctx.lineTo(x + 14, groundY - height * 0.25);
    ctx.bezierCurveTo(x + 22, groundY - height * 0.35, x + 18, groundY - height * 0.55, x, groundY - height * 0.85);
    ctx.fill();
}

function drawTorchFlame(x, y) {
    ctx.save();
    const flicker = Math.sin(animTimer * 12 + x) * 3;
    // Glow
    ctx.fillStyle = "rgba(255, 160, 20, 0.2)";
    ctx.shadowColor = "#ff8c00";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(x, y - 5 + flicker, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // Flame core
    let flameGrad = ctx.createRadialGradient(x, y - 4 + flicker, 1, x, y + flicker, 10);
    flameGrad.addColorStop(0, '#fff7cc');
    flameGrad.addColorStop(0.4, '#ffaa00');
    flameGrad.addColorStop(1, 'rgba(255,68,0,0)');
    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(x, y - 14 + flicker);
    ctx.quadraticCurveTo(x + 7, y - 4 + flicker, x + 5, y + 4);
    ctx.quadraticCurveTo(x, y + 2, x - 5, y + 4);
    ctx.quadraticCurveTo(x - 7, y - 4 + flicker, x, y - 14 + flicker);
    ctx.fill();
    ctx.restore();
}

function drawStalactite(x, topY, length) {
    let stalGrad = ctx.createLinearGradient(x, topY, x, topY + length);
    stalGrad.addColorStop(0, '#334155');
    stalGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = stalGrad;
    ctx.beginPath();
    ctx.moveTo(x - 8, topY);
    ctx.lineTo(x + 8, topY);
    ctx.lineTo(x + 2, topY + length);
    ctx.lineTo(x - 2, topY + length);
    ctx.closePath();
    ctx.fill();
    // Drip highlight
    ctx.fillStyle = "rgba(96, 165, 250, 0.4)";
    ctx.beginPath();
    ctx.arc(x, topY + length, 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawCrystalCluster(x, groundY, seed) {
    const crystals = [
        { angle: -0.3, h: 35 + (seed % 3) * 8, color: '#60a5fa' },
        { angle: 0.1, h: 45 + (seed % 2) * 10, color: '#818cf8' },
        { angle: 0.4, h: 28 + (seed % 4) * 5, color: '#a78bfa' },
    ];
    crystals.forEach(cr => {
        ctx.save();
        ctx.translate(x, groundY);
        ctx.rotate(cr.angle);
        let crGrad = ctx.createLinearGradient(-4, -cr.h, 4, 0);
        crGrad.addColorStop(0, cr.color);
        crGrad.addColorStop(0.5, '#e0e7ff');
        crGrad.addColorStop(1, cr.color);
        ctx.fillStyle = crGrad;
        ctx.beginPath();
        ctx.moveTo(0, -cr.h);
        ctx.lineTo(6, -5);
        ctx.lineTo(3, 0);
        ctx.lineTo(-3, 0);
        ctx.lineTo(-6, -5);
        ctx.closePath();
        ctx.fill();
        // Glow
        ctx.shadowColor = cr.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(-2, -cr.h + 5, 4, cr.h * 0.4);
        ctx.shadowBlur = 0;
        ctx.restore();
    });
}

function drawGothicArch(x, groundY) {
    ctx.fillStyle = '#1e1e2e';
    // Left pillar
    ctx.fillRect(x - 30, groundY - 120, 14, 120);
    // Right pillar
    ctx.fillRect(x + 16, groundY - 120, 14, 120);
    // Arch top
    ctx.beginPath();
    ctx.moveTo(x - 30, groundY - 120);
    ctx.quadraticCurveTo(x, groundY - 170, x + 30, groundY - 120);
    ctx.lineTo(x + 16, groundY - 120);
    ctx.quadraticCurveTo(x, groundY - 150, x - 16, groundY - 120);
    ctx.closePath();
    ctx.fill();
    // Stone texture lines
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    for (let row = 0; row < 6; row++) {
        const ry = groundY - 20 * row - 10;
        ctx.beginPath();
        ctx.moveTo(x - 30, ry);
        ctx.lineTo(x - 16, ry);
        ctx.moveTo(x + 16, ry);
        ctx.lineTo(x + 30, ry);
        ctx.stroke();
    }
}

function drawTombstone(x, groundY, seed) {
    ctx.save();
    let stoneGrad = ctx.createLinearGradient(x - 10, groundY - 35, x + 10, groundY);
    stoneGrad.addColorStop(0, '#4a5568');
    stoneGrad.addColorStop(1, '#2d3748');
    ctx.fillStyle = stoneGrad;
    ctx.beginPath();
    ctx.roundRect(x - 10, groundY - 30, 20, 30, [6, 6, 0, 0]);
    ctx.fill();
    // Top curve
    ctx.beginPath();
    ctx.arc(x, groundY - 30, 10, Math.PI, 0, false);
    ctx.fill();
    // Cross
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, groundY - 34);
    ctx.lineTo(x, groundY - 18);
    ctx.moveTo(x - 5, groundY - 28);
    ctx.lineTo(x + 5, groundY - 28);
    ctx.stroke();
    ctx.restore();
}

function drawMountainRange(W, baseY, maxH, alpha, count) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    for (let i = 0; i <= count; i++) {
        const peakX = (i / count) * W;
        const peakY = baseY - maxH * (0.5 + Math.sin(i * 2.1 + 0.5) * 0.5);
        if (i === 0) {
            ctx.lineTo(peakX, peakY);
        } else {
            const midX = ((i - 0.5) / count) * W;
            const valleyY = baseY - maxH * 0.15;
            ctx.quadraticCurveTo(midX, valleyY, peakX, peakY);
        }
    }
    ctx.lineTo(W, baseY);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
}

function drawCitadelTowers(W, groundY) {
    const towerPositions = [80, 280, 500, 700, 880];
    towerPositions.forEach((tx, i) => {
        const th = 100 + (i % 3) * 30;
        const tw = 28 + (i % 2) * 8;
        // Tower body
        let tGrad = ctx.createLinearGradient(tx - tw/2, groundY - th, tx + tw/2, groundY);
        tGrad.addColorStop(0, '#2a1050');
        tGrad.addColorStop(0.5, '#1a0a35');
        tGrad.addColorStop(1, '#120520');
        ctx.fillStyle = tGrad;
        ctx.fillRect(tx - tw/2, groundY - th, tw, th);
        // Battlements
        for (let b = 0; b < 3; b++) {
            ctx.fillRect(tx - tw/2 + b * (tw/3), groundY - th - 8, tw/3 - 2, 8);
        }
        // Pointed roof
        ctx.fillStyle = '#4f168a';
        ctx.beginPath();
        ctx.moveTo(tx, groundY - th - 30);
        ctx.lineTo(tx + tw/2 + 5, groundY - th - 8);
        ctx.lineTo(tx - tw/2 - 5, groundY - th - 8);
        ctx.closePath();
        ctx.fill();
        // Glowing windows
        ctx.fillStyle = "#facc15";
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 8;
        for (let w = 0; w < 3; w++) {
            const wy = groundY - th + 18 + w * 25;
            if (wy < groundY - 8) {
                ctx.fillRect(tx - 4, wy, 8, 10);
            }
        }
        ctx.shadowBlur = 0;
    });
}

function drawRuneCircles(W, groundY) {
    const runePositions = [200, 480, 760];
    runePositions.forEach((rx, i) => {
        ctx.save();
        ctx.globalAlpha = 0.25 + Math.sin(animTimer + i * 2) * 0.1;
        ctx.strokeStyle = "#a855f7";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 10;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(rx, groundY + 20, 35, 10, 0, 0, Math.PI * 2);
        ctx.stroke();
        // Inner ring
        ctx.beginPath();
        ctx.ellipse(rx, groundY + 20, 20, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.restore();
    });
}

function drawLavaPools(W, groundY) {
    const poolPositions = [120, 350, 600, 830];
    poolPositions.forEach((px, i) => {
        ctx.save();
        const pulse = Math.sin(animTimer * 1.5 + i * 1.7) * 0.15 + 0.6;
        let lavaGrad = ctx.createRadialGradient(px, groundY + 15, 3, px, groundY + 15, 30);
        lavaGrad.addColorStop(0, `rgba(255, 200, 50, ${pulse})`);
        lavaGrad.addColorStop(0.5, `rgba(255, 100, 20, ${pulse * 0.7})`);
        lavaGrad.addColorStop(1, 'rgba(180, 20, 0, 0)');
        ctx.fillStyle = lavaGrad;
        ctx.beginPath();
        ctx.ellipse(px, groundY + 15, 28 + i * 3, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
}

function drawTreasureVault(W, groundY) {
    // Golden pillars
    const pillarX = [100, 300, 500, 700, 860];
    pillarX.forEach(px => {
        let pGrad = ctx.createLinearGradient(px - 10, groundY - 110, px + 10, groundY);
        pGrad.addColorStop(0, '#fde047');
        pGrad.addColorStop(0.3, '#ca8a04');
        pGrad.addColorStop(0.7, '#a16207');
        pGrad.addColorStop(1, '#713f12');
        ctx.fillStyle = pGrad;
        ctx.fillRect(px - 10, groundY - 100, 20, 100);
        // Capital
        ctx.fillRect(px - 14, groundY - 105, 28, 8);
        ctx.fillRect(px - 14, groundY - 3, 28, 6);
    });
    // Treasure piles on ground
    [60, 200, 400, 620, 800].forEach((tx, i) => {
        ctx.save();
        // Coin pile
        ctx.fillStyle = "#eab308";
        ctx.beginPath();
        ctx.ellipse(tx, groundY + 12, 25, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ca8a04";
        ctx.beginPath();
        ctx.ellipse(tx, groundY + 10, 22, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // Individual coins
        for (let c = 0; c < 4; c++) {
            ctx.fillStyle = c % 2 ? "#fde047" : "#f59e0b";
            ctx.beginPath();
            ctx.arc(tx - 10 + c * 7, groundY + 8, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        // Gem
        if (i % 2 === 0) {
            ctx.fillStyle = i === 0 ? "#ef4444" : (i === 2 ? "#22d3ee" : "#a855f7");
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.moveTo(tx + 15, groundY + 4);
            ctx.lineTo(tx + 20, groundY + 9);
            ctx.lineTo(tx + 15, groundY + 14);
            ctx.lineTo(tx + 10, groundY + 9);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;
        }
        ctx.restore();
    });
}

function drawSkyIslands(W, groundY) {
    const islands = [120, 360, 620, 840];
    islands.forEach((ix, i) => {
        ctx.save();
        const floatY = Math.sin(animTimer * 1.5 + i * 2) * 8;
        const iy = 110 + (i % 2) * 30 + floatY;
        // Island rocky underside
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(ix - 50, iy);
        ctx.lineTo(ix, iy + 45);
        ctx.lineTo(ix + 50, iy);
        ctx.closePath();
        ctx.fill();
        // Island grassy top
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.ellipse(ix, iy, 55, 14, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#bae6fd';
        ctx.beginPath();
        ctx.ellipse(ix, iy - 3, 48, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
}

function drawAbyssPillars(W, groundY) {
    const pillars = [140, 420, 700, 880];
    pillars.forEach((px, i) => {
        let pGrad = ctx.createLinearGradient(px - 14, groundY - 130, px + 14, groundY);
        pGrad.addColorStop(0, '#311042');
        pGrad.addColorStop(0.5, '#1e082b');
        pGrad.addColorStop(1, '#0b0212');
        ctx.fillStyle = pGrad;
        ctx.fillRect(px - 14, groundY - 130, 28, 130);
        // Purple void cracks
        ctx.strokeStyle = '#c084fc';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px, groundY - 120);
        ctx.lineTo(px - 6, groundY - 80);
        ctx.lineTo(px + 4, groundY - 40);
        ctx.lineTo(px, groundY);
        ctx.stroke();
        ctx.shadowBlur = 0;
    });
}

function drawCelestialPillars(W, groundY) {
    const pillars = [100, 320, 540, 760, 900];
    pillars.forEach((px, i) => {
        let pGrad = ctx.createLinearGradient(px - 12, groundY - 140, px + 12, groundY);
        pGrad.addColorStop(0, '#ffffff');
        pGrad.addColorStop(0.3, '#fef08a');
        pGrad.addColorStop(0.7, '#eab308');
        pGrad.addColorStop(1, '#854d0e');
        ctx.fillStyle = pGrad;
        ctx.fillRect(px - 12, groundY - 140, 24, 140);
        // Halo top ring
        ctx.strokeStyle = '#fde047';
        ctx.shadowColor = '#fde047';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(px, groundY - 145, 18, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
    });
}

function drawTitanStatues(W, groundY) {
    const statues = [160, 800];
    statues.forEach(sx => {
        ctx.save();
        let sGrad = ctx.createLinearGradient(sx - 35, groundY - 160, sx + 35, groundY);
        sGrad.addColorStop(0, '#57534e');
        sGrad.addColorStop(0.5, '#292524');
        sGrad.addColorStop(1, '#0c0a09');
        ctx.fillStyle = sGrad;
        // Titan torso
        ctx.beginPath();
        ctx.moveTo(sx - 25, groundY);
        ctx.lineTo(sx - 35, groundY - 110);
        ctx.lineTo(sx + 35, groundY - 110);
        ctx.lineTo(sx + 25, groundY);
        ctx.closePath();
        ctx.fill();
        // Titan head
        ctx.beginPath();
        ctx.arc(sx, groundY - 135, 22, 0, Math.PI * 2);
        ctx.fill();
        // Glowing magma eyes
        ctx.fillStyle = '#ff4757';
        ctx.shadowColor = '#ff4757';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(sx - 8, groundY - 138, 4, 0, Math.PI * 2);
        ctx.arc(sx + 8, groundY - 138, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
    });
}

function drawGroundDetail(lvl, W, H, groundY) {
    ctx.save();
    if (lvl === 1) {
        // Grass tufts
        ctx.strokeStyle = "rgba(74, 222, 128, 0.35)";
        ctx.lineWidth = 1.5;
        for (let i = 0; i < 30; i++) {
            const gx = (i * 33 + 7) % W;
            const gy = groundY + 5 + (i % 4) * 6;
            ctx.beginPath();
            ctx.moveTo(gx, gy);
            ctx.lineTo(gx - 3, gy - 8);
            ctx.moveTo(gx + 3, gy);
            ctx.lineTo(gx + 6, gy - 10);
            ctx.moveTo(gx + 6, gy);
            ctx.lineTo(gx + 3, gy - 7);
            ctx.stroke();
        }
    } else if (lvl === 5) {
        // Ice cracks
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
            const ix = i * 130 + 40;
            ctx.beginPath();
            ctx.moveTo(ix, groundY + 8);
            ctx.lineTo(ix + 15, groundY + 18);
            ctx.lineTo(ix + 30, groundY + 12);
            ctx.lineTo(ix + 20, groundY + 25);
            ctx.stroke();
        }
    } else if (lvl === 7) {
        // Lava crack lines
        ctx.strokeStyle = "rgba(251, 191, 36, 0.35)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 4;
        for (let i = 0; i < 6; i++) {
            const lx = i * 170 + 30;
            ctx.beginPath();
            ctx.moveTo(lx, groundY + 5);
            ctx.lineTo(lx + 20, groundY + 15);
            ctx.lineTo(lx + 10, groundY + 28);
            ctx.lineTo(lx + 35, groundY + 35);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;
    } else if (lvl === 8) {
        // Coin scatter on ground already handled
    } else if (lvl === 4) {
        // Cobblestone texture
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 16; col++) {
                const cx = col * 65 + (row % 2) * 30;
                const cy = groundY + 8 + row * 22;
                ctx.strokeRect(cx, cy, 60, 18);
            }
        }
    }
    ctx.restore();
}

// ===== WEATHER PARTICLES =====
function updateAndDrawWeatherParticles() {
    const lvl = GameState.level;

    for (let i = 0; i < GameState.weatherParticles.length; i++) {
        const p = GameState.weatherParticles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < -10) p.x = 970;
        if (p.x > 970) p.x = -10;
        if (p.y < -10) p.y = 350;
        if (p.y > 350) p.y = -10;

        ctx.save();

        if (lvl === 1) {
            // Fireflies: pulsing glow
            const pulse = 0.5 + Math.sin(animTimer * 3 + i * 1.7) * 0.5;
            ctx.globalAlpha = p.alpha * pulse;
            ctx.fillStyle = "#86efac";
            ctx.shadowColor = "#4ade80";
            ctx.shadowBlur = 12 * pulse;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 2) {
            // Goblin Outpost: ember sparks from torches
            ctx.globalAlpha = p.alpha * 0.8;
            ctx.fillStyle = Math.random() > 0.5 ? "#ff8c00" : "#ffa502";
            ctx.shadowColor = "#ff6600";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 3) {
            // Crystal Mines: sparkling mine dust
            const sparkle = Math.sin(animTimer * 8 + i * 2.3) > 0.7 ? 1 : 0.3;
            ctx.globalAlpha = p.alpha * sparkle;
            ctx.fillStyle = i % 3 === 0 ? "#818cf8" : (i % 3 === 1 ? "#60a5fa" : "#a78bfa");
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 4) {
            // Spectral embers: wispy purple
            ctx.globalAlpha = p.alpha * 0.7;
            ctx.fillStyle = "#c084fc";
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 5) {
            // Snowflakes: white, gentle drift
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "#e0f2fe";
            ctx.shadowBlur = 4;
            // Draw a tiny snowflake shape for larger ones
            if (p.size > 2) {
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = "rgba(255,255,255," + p.alpha + ")";
                for (let arm = 0; arm < 6; arm++) {
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(arm * Math.PI / 3);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, -p.size * 1.5);
                    ctx.stroke();
                    ctx.restore();
                }
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        } else if (lvl === 6) {
            // Enchanted: arcane sparkles
            const pulse = Math.sin(animTimer * 4 + i * 1.3);
            ctx.globalAlpha = p.alpha * (0.5 + pulse * 0.3);
            ctx.fillStyle = pulse > 0 ? "#e879f9" : "#c084fc";
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 7) {
            // Lava embers: rising, fading orange/red
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = Math.random() > 0.3 ? "#ff4757" : "#ffa502";
            ctx.shadowColor = "#ff6600";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 8) {
            // Dragon's Vault: golden dust motes
            const sparkle = Math.sin(animTimer * 5 + i * 2.7);
            ctx.globalAlpha = p.alpha * (0.5 + sparkle * 0.3);
            ctx.fillStyle = sparkle > 0 ? "#fde047" : "#f59e0b";
            ctx.shadowColor = "#eab308";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 9) {
            // Sky Citadel: swirling wind gusts
            ctx.globalAlpha = p.alpha * 0.6;
            ctx.fillStyle = "#e0f2fe";
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.ellipse(p.x, p.y, p.size * 2.5, p.size * 0.8, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 10) {
            // Abyss Dungeon: void energy motes
            const pulse = Math.sin(animTimer * 6 + i);
            ctx.globalAlpha = p.alpha * (0.6 + pulse * 0.3);
            ctx.fillStyle = "#c084fc";
            ctx.shadowColor = "#a855f7";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 11) {
            // Celestial Realm: celestial stardust
            const sparkle = Math.sin(animTimer * 7 + i * 1.5);
            ctx.globalAlpha = p.alpha * (0.7 + sparkle * 0.3);
            ctx.fillStyle = "#fef08a";
            ctx.shadowColor = "#fde047";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
            ctx.fill();
        } else if (lvl === 12) {
            // Titan's Lair: falling titan ash & fiery embers
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = Math.random() > 0.4 ? "#ff4757" : "#ffa502";
            ctx.shadowColor = "#ff6600";
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 1.1, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

// ===== REALISTIC KNIGHT SPRITE =====
function drawRealisticKnightSprite(x, y, dir, isWalking) {
    ctx.save();

    const scale = dir === "left" ? -1 : 1;

    // Volumetric ground shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.ellipse(x, y + 28, 22, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Breathing / walking bob
    const bob = isWalking ? Math.sin(animTimer * 10) * 3 : Math.sin(animTimer * 2) * 1.5;
    const walkCycle = isWalking ? animTimer * 10 : 0;

    ctx.translate(x, y + bob);
    ctx.scale(scale, 1);

    // --- Cape (behind body) ---
    if (GameState.knight.gear.cloak) {
        const capeWave1 = Math.sin(animTimer * 4) * 6;
        const capeWave2 = Math.sin(animTimer * 4 + 1) * 4;
        let cloakGrad = ctx.createLinearGradient(-15, -15, -25, 35);
        cloakGrad.addColorStop(0, '#9333ea');
        cloakGrad.addColorStop(0.5, '#7e22ce');
        cloakGrad.addColorStop(1, '#3b0764');
        ctx.fillStyle = cloakGrad;
        ctx.beginPath();
        ctx.moveTo(-8, -10);
        ctx.lineTo(-10, -5);
        ctx.bezierCurveTo(-18, 10, -25 + capeWave1, 25, -30 + capeWave2, 32);
        ctx.lineTo(-10, 30);
        ctx.lineTo(-6, 5);
        ctx.closePath();
        ctx.fill();
        // Cape edge highlight
        ctx.strokeStyle = "rgba(168, 85, 247, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-10, -5);
        ctx.bezierCurveTo(-18, 10, -25 + capeWave1, 25, -30 + capeWave2, 32);
        ctx.stroke();
    }

    // --- Legs (animated walk cycle) ---
    const legSwing = Math.sin(walkCycle) * 12;
    const isAegis = GameState.knight.gear.aegisArmor;
    ctx.fillStyle = isAegis ? '#a16207' : '#475569';

    // Left leg
    ctx.save();
    ctx.translate(-6, 22);
    ctx.rotate((-legSwing) * Math.PI / 180);
    ctx.fillRect(-4, 0, 8, 18);
    // Boot
    ctx.fillStyle = GameState.knight.gear.boots ? '#059669' : (isAegis ? '#854d0e' : '#1e293b');
    ctx.beginPath();
    ctx.roundRect(-5, 14, 10, 6, 2);
    ctx.fill();
    ctx.restore();

    // Right leg
    ctx.save();
    ctx.fillStyle = isAegis ? '#a16207' : '#475569';
    ctx.translate(6, 22);
    ctx.rotate((legSwing) * Math.PI / 180);
    ctx.fillRect(-4, 0, 8, 18);
    ctx.fillStyle = GameState.knight.gear.boots ? '#059669' : (isAegis ? '#854d0e' : '#1e293b');
    ctx.beginPath();
    ctx.roundRect(-5, 14, 10, 6, 2);
    ctx.fill();
    ctx.restore();

    // --- Body / Torso Armor ---
    let armorGrad = ctx.createLinearGradient(-16, -15, 16, 28);
    if (isAegis) {
        armorGrad.addColorStop(0, '#fef08a');
        armorGrad.addColorStop(0.3, '#eab308');
        armorGrad.addColorStop(0.6, '#ca8a04');
        armorGrad.addColorStop(1, '#854d0e');
    } else {
        armorGrad.addColorStop(0, '#e2e8f0');
        armorGrad.addColorStop(0.25, '#94a3b8');
        armorGrad.addColorStop(0.55, '#64748b');
        armorGrad.addColorStop(0.8, '#334155');
        armorGrad.addColorStop(1, '#1e293b');
    }
    ctx.fillStyle = armorGrad;
    ctx.beginPath();
    ctx.roundRect(-14, -12, 28, 36, 5);
    ctx.fill();

    // Chest plate detail lines
    ctx.strokeStyle = isAegis ? "rgba(253, 224, 71, 0.3)" : "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(0, 18);
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.stroke();

    // Belt
    ctx.fillStyle = isAegis ? '#713f12' : '#78350f';
    ctx.fillRect(-14, 16, 28, 5);
    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(0, 18, 3, 0, Math.PI * 2);
    ctx.fill();

    // --- Shoulder Pauldrons ---
    const pauldronColor = isAegis ? '#ca8a04' : '#94a3b8';
    [-16, 16].forEach(sx => {
        let pGrad = ctx.createRadialGradient(sx, -8, 2, sx, -8, 10);
        pGrad.addColorStop(0, isAegis ? '#fef08a' : '#e2e8f0');
        pGrad.addColorStop(1, pauldronColor);
        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.ellipse(sx, -8, 9, 7, 0, 0, Math.PI * 2);
        ctx.fill();
        // Rivet
        ctx.fillStyle = isAegis ? '#fef08a' : '#cbd5e1';
        ctx.beginPath();
        ctx.arc(sx, -8, 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // --- Shield (left arm) ---
    if (GameState.knight.gear.shield) {
        ctx.save();
        ctx.translate(-18, 6);
        let shieldGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 16);
        shieldGrad.addColorStop(0, '#93c5fd');
        shieldGrad.addColorStop(0.5, '#3b82f6');
        shieldGrad.addColorStop(1, '#1e3a8a');
        ctx.fillStyle = shieldGrad;
        ctx.beginPath();
        // Kite shield shape
        ctx.moveTo(0, -14);
        ctx.quadraticCurveTo(15, -10, 14, 4);
        ctx.lineTo(0, 18);
        ctx.lineTo(-14, 4);
        ctx.quadraticCurveTo(-15, -10, 0, -14);
        ctx.fill();
        // Shield border
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2;
        ctx.stroke();
        // Cross emblem
        ctx.strokeStyle = "rgba(251, 191, 36, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(0, 12);
        ctx.moveTo(-7, 0);
        ctx.lineTo(7, 0);
        ctx.stroke();
        ctx.restore();
    }

    // --- Helmet ---
    let helmetGrad = ctx.createLinearGradient(-16, -48, 16, -24);
    if (GameState.knight.gear.helmet) {
        helmetGrad.addColorStop(0, '#fef08a');
        helmetGrad.addColorStop(0.4, '#f59e0b');
        helmetGrad.addColorStop(1, '#b45309');
    } else {
        helmetGrad.addColorStop(0, '#e2e8f0');
        helmetGrad.addColorStop(0.4, '#94a3b8');
        helmetGrad.addColorStop(1, '#475569');
    }
    ctx.fillStyle = helmetGrad;
    // Helmet dome
    ctx.beginPath();
    ctx.arc(0, -34, 16, Math.PI, 0, false);
    ctx.lineTo(16, -22);
    ctx.lineTo(-16, -22);
    ctx.closePath();
    ctx.fill();
    // Face guard
    ctx.fillRect(-14, -26, 28, 12);

    // Visor slit (glowing)
    ctx.fillStyle = "#00f2fe";
    ctx.shadowColor = "#00f2fe";
    ctx.shadowBlur = 12;
    ctx.fillRect(-11, -24, 22, 4);
    ctx.shadowBlur = 0;

    // Helmet crest/plume
    if (GameState.knight.gear.helmet) {
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.bezierCurveTo(8, -46, 12, -40, 10, -34);
        ctx.lineTo(4, -34);
        ctx.bezierCurveTo(6, -40, 4, -44, 0, -46);
        ctx.closePath();
        ctx.fill();
    }

    // --- Sword arm (right side) ---
    ctx.save();
    const swordSwing = GameState.knight.isAttacking ? Math.sin(GameState.knight.attackProgress * Math.PI * 2) * 30 : 0;
    ctx.translate(16, -2);
    ctx.rotate((swordSwing - 10) * Math.PI / 180);

    // Arm
    ctx.fillStyle = isAegis ? '#ca8a04' : '#64748b';
    ctx.fillRect(-3, 0, 6, 14);

    // Sword
    const hasTB = GameState.knight.gear.thunderBlade;
    const hasFS = GameState.knight.gear.sword;
    const swordColor = hasTB ? "#00f2fe" : (hasFS ? "#ff4757" : "#fbbf24");
    const swordGlow = hasTB ? "#00f2fe" : (hasFS ? "#ff4757" : "#fbbf24");

    // Blade
    ctx.fillStyle = swordColor;
    ctx.shadowColor = swordGlow;
    ctx.shadowBlur = hasTB ? 16 : (hasFS ? 12 : 8);
    ctx.beginPath();
    ctx.moveTo(0, -30);
    ctx.lineTo(3, -4);
    ctx.lineTo(-3, -4);
    ctx.closePath();
    ctx.fill();
    // Blade highlight
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath();
    ctx.moveTo(0, -28);
    ctx.lineTo(1, -6);
    ctx.lineTo(-1, -6);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
    // Cross guard
    ctx.fillStyle = isAegis ? '#fef08a' : '#78350f';
    ctx.fillRect(-7, -4, 14, 4);
    // Pommel
    ctx.fillStyle = swordColor;
    ctx.beginPath();
    ctx.arc(0, 16, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // sword arm

    // --- Ring of Fortune glow ---
    if (GameState.knight.gear.ring) {
        ctx.save();
        ctx.globalAlpha = 0.15 + Math.sin(animTimer * 3) * 0.1;
        ctx.strokeStyle = "#fbbf24";
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 15;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        ctx.restore();
    }

    // --- Crown ---
    if (GameState.knight.gear.crown) {
        ctx.fillStyle = "#fbbf24";
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(-10, -50);
        ctx.lineTo(-8, -58);
        ctx.lineTo(-4, -52);
        ctx.lineTo(0, -60);
        ctx.lineTo(4, -52);
        ctx.lineTo(8, -58);
        ctx.lineTo(10, -50);
        ctx.closePath();
        ctx.fill();
        // Jewels
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(0, -54, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#22d3ee";
        ctx.beginPath();
        ctx.arc(-6, -53, 1.5, 0, Math.PI * 2);
        ctx.arc(6, -53, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    ctx.restore(); // main transform
}

function drawUpgradedBattleKnight() {
    let x = GameState.knight.x;
    let y = GameState.knight.y;

    if (GameState.knight.isAttacking) {
        GameState.knight.attackProgress += 0.08;
        x += Math.sin(GameState.knight.attackProgress * Math.PI) * 150;
        if (GameState.knight.attackProgress >= 1) {
            GameState.knight.isAttacking = false;
        }
    }

    if (GameState.knight.isHit) {
        GameState.knight.hitProgress += 0.1;
        x -= Math.sin(GameState.knight.hitProgress * Math.PI) * 20;
        if (GameState.knight.hitProgress >= 1) {
            GameState.knight.isHit = false;
        }
    }

    drawRealisticKnightSprite(x, y, "right", false);
}

function drawUpgradedBattleEnemy() {
    let x = GameState.enemy.x;
    let y = GameState.enemy.y;

    if (GameState.enemy.isAttacking) {
        GameState.enemy.attackProgress += 0.08;
        x -= Math.sin(GameState.enemy.attackProgress * Math.PI) * 170;
        if (GameState.enemy.attackProgress >= 1) {
            GameState.enemy.isAttacking = false;
        }
    }

    if (GameState.enemy.isHit) {
        GameState.enemy.hitProgress += 0.1;
        x += (Math.random() - 0.5) * 14;
        if (GameState.enemy.hitProgress >= 1) {
            GameState.enemy.isHit = false;
        }
    }

    drawMonsterSprite(GameState.enemy.type, x, y);
}

// ===== DETAILED MONSTER SPRITES =====
function drawMonsterSprite(type, x, y) {
    ctx.save();

    // Ground shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.beginPath();
    ctx.ellipse(x, y + 28, 28, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    const bob = Math.sin(animTimer * 2.5) * 3;
    y += bob;

    if (type === 'slime') {
        // Jelly dome with pulsing squish animation
        const squish = 1 + Math.sin(animTimer * 3) * 0.06;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(1 / squish, squish);

        // Body
        let slimeGrad = ctx.createRadialGradient(-8, -12, 4, 0, 8, 42);
        slimeGrad.addColorStop(0, '#bbf7d0');
        slimeGrad.addColorStop(0.3, '#4ade80');
        slimeGrad.addColorStop(0.7, '#16a34a');
        slimeGrad.addColorStop(1, '#14532d');
        ctx.fillStyle = slimeGrad;
        ctx.beginPath();
        ctx.arc(0, -4, 38, Math.PI, 0, false);
        ctx.bezierCurveTo(42, 20, 30, 28, 15, 25);
        ctx.bezierCurveTo(8, 30, -8, 30, -15, 25);
        ctx.bezierCurveTo(-30, 28, -42, 20, -38, -4);
        ctx.fill();

        // Specular highlight dome
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.ellipse(-10, -18, 14, 7, -Math.PI / 5, 0, Math.PI * 2);
        ctx.fill();

        // Second specular
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.ellipse(8, -12, 6, 4, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        // Crown spikes
        ctx.fillStyle = "#fbbf24";
        const spikes = [[-12, -38, -15, -52, -6, -44], [0, -42, 0, -58, 6, -48], [12, -38, 18, -54, 10, -44]];
        spikes.forEach(([x1, y1, x2, y2, x3, y3]) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();
            ctx.fill();
        });
        // Crown jewels
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(0, -48, 3, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.ellipse(-12, -4, 8, 9, 0, 0, Math.PI * 2);
        ctx.ellipse(12, -4, 8, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        // Pupils (animated look)
        const lookX = Math.sin(animTimer) * 2;
        ctx.fillStyle = "#1a1a2e";
        ctx.beginPath();
        ctx.arc(-10 + lookX, -3, 4, 0, Math.PI * 2);
        ctx.arc(14 + lookX, -3, 4, 0, Math.PI * 2);
        ctx.fill();
        // Pupil glint
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(-8 + lookX, -5, 1.5, 0, Math.PI * 2);
        ctx.arc(16 + lookX, -5, 1.5, 0, Math.PI * 2);
        ctx.fill();
        // Smile
        ctx.strokeStyle = "#14532d";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 4, 10, 0.1, Math.PI - 0.1);
        ctx.stroke();

        ctx.restore();

    } else if (type === 'goblin') {
        // Head
        let skinGrad = ctx.createRadialGradient(x - 2, y - 28, 4, x, y - 22, 28);
        skinGrad.addColorStop(0, '#86efac');
        skinGrad.addColorStop(0.6, '#22c55e');
        skinGrad.addColorStop(1, '#166534');
        ctx.fillStyle = skinGrad;
        ctx.beginPath();
        ctx.ellipse(x, y - 24, 20, 22, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pointed ears
        ctx.beginPath();
        ctx.moveTo(x - 20, y - 26);
        ctx.quadraticCurveTo(x - 38, y - 40, x - 28, y - 18);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 20, y - 26);
        ctx.quadraticCurveTo(x + 38, y - 40, x + 28, y - 18);
        ctx.fill();

        // Body (leather armor)
        let armorGrad = ctx.createLinearGradient(x - 18, y - 5, x + 18, y + 30);
        armorGrad.addColorStop(0, '#78350f');
        armorGrad.addColorStop(0.5, '#92400e');
        armorGrad.addColorStop(1, '#451a03');
        ctx.fillStyle = armorGrad;
        ctx.beginPath();
        ctx.roundRect(x - 16, y - 5, 32, 32, 4);
        ctx.fill();
        // Belt
        ctx.fillStyle = "#44403c";
        ctx.fillRect(x - 16, y + 16, 32, 5);
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(x, y + 18, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        ctx.fillStyle = "#166534";
        ctx.fillRect(x - 10, y + 24, 8, 14);
        ctx.fillRect(x + 2, y + 24, 8, 14);
        // Feet
        ctx.fillStyle = "#78350f";
        ctx.beginPath();
        ctx.roundRect(x - 12, y + 35, 12, 5, 2);
        ctx.roundRect(x, y + 35, 12, 5, 2);
        ctx.fill();

        // Eyes (angry slant)
        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.ellipse(x - 7, y - 26, 5, 6, 0, 0, Math.PI * 2);
        ctx.ellipse(x + 7, y - 26, 5, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(x - 7, y - 25, 3, 0, Math.PI * 2);
        ctx.arc(x + 7, y - 25, 3, 0, Math.PI * 2);
        ctx.fill();
        // Brow ridge
        ctx.strokeStyle = "#166534";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(x - 13, y - 34);
        ctx.lineTo(x - 3, y - 31);
        ctx.moveTo(x + 13, y - 34);
        ctx.lineTo(x + 3, y - 31);
        ctx.stroke();

        // Teeth
        ctx.fillStyle = "#fef9c3";
        ctx.beginPath();
        ctx.moveTo(x - 4, y - 14);
        ctx.lineTo(x - 2, y - 10);
        ctx.lineTo(x, y - 14);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 2, y - 14);
        ctx.lineTo(x + 4, y - 10);
        ctx.lineTo(x + 6, y - 14);
        ctx.fill();

        // Battle axe (right side)
        ctx.save();
        ctx.translate(x + 22, y + 5);
        const axeSwing = Math.sin(animTimer * 2) * 8;
        ctx.rotate((axeSwing - 15) * Math.PI / 180);
        // Shaft
        ctx.fillStyle = "#78350f";
        ctx.fillRect(-2, -32, 4, 50);
        // Axe head
        ctx.fillStyle = "#6b7280";
        ctx.beginPath();
        ctx.moveTo(0, -30);
        ctx.quadraticCurveTo(18, -24, 16, -14);
        ctx.lineTo(0, -18);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#9ca3af";
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.quadraticCurveTo(12, -24, 10, -16);
        ctx.lineTo(0, -20);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

    } else if (type === 'gargoyle') {
        // Stone body
        let stoneGrad = ctx.createRadialGradient(x, y - 15, 5, x, y, 45);
        stoneGrad.addColorStop(0, '#94a3b8');
        stoneGrad.addColorStop(0.5, '#64748b');
        stoneGrad.addColorStop(1, '#1e293b');
        ctx.fillStyle = stoneGrad;

        // Wings
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 20);
        ctx.quadraticCurveTo(x - 65, y - 55, x - 50, y + 10);
        ctx.lineTo(x - 15, y + 5);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 10, y - 20);
        ctx.quadraticCurveTo(x + 65, y - 55, x + 50, y + 10);
        ctx.lineTo(x + 15, y + 5);
        ctx.fill();
        // Wing membrane lines
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.lineWidth = 1;
        for (let w = 0; w < 3; w++) {
            ctx.beginPath();
            ctx.moveTo(x - 12 - w * 3, y - 18 + w * 5);
            ctx.quadraticCurveTo(x - 40 - w * 5, y - 30 + w * 10, x - 45 + w * 5, y + 5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + 12 + w * 3, y - 18 + w * 5);
            ctx.quadraticCurveTo(x + 40 + w * 5, y - 30 + w * 10, x + 45 - w * 5, y + 5);
            ctx.stroke();
        }

        // Body
        ctx.fillStyle = stoneGrad;
        ctx.beginPath();
        ctx.ellipse(x, y + 5, 22, 24, 0, 0, Math.PI * 2);
        ctx.fill();
        // Head
        ctx.beginPath();
        ctx.arc(x, y - 22, 18, 0, Math.PI * 2);
        ctx.fill();
        // Horns
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(x - 14, y - 32);
        ctx.quadraticCurveTo(x - 25, y - 55, x - 10, y - 45);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 14, y - 32);
        ctx.quadraticCurveTo(x + 25, y - 55, x + 10, y - 45);
        ctx.fill();

        // Stone crack texture
        ctx.strokeStyle = "rgba(0,0,0,0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 5, y - 10);
        ctx.lineTo(x - 8, y + 5);
        ctx.lineTo(x - 3, y + 15);
        ctx.stroke();

        // Glowing eyes
        ctx.fillStyle = "#a855f7";
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(x - 8, y - 22, 4, 0, Math.PI * 2);
        ctx.arc(x + 8, y - 22, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

    } else if (type === 'phantom') {
        // Ghostly ethereal body
        const drift = Math.sin(animTimer * 1.5) * 5;
        let ghostGrad = ctx.createRadialGradient(x, y - 15 + drift, 5, x, y + drift, 50);
        ghostGrad.addColorStop(0, 'rgba(216, 180, 254, 0.9)');
        ghostGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.7)');
        ghostGrad.addColorStop(0.7, 'rgba(126, 34, 206, 0.4)');
        ghostGrad.addColorStop(1, 'rgba(58, 12, 100, 0)');

        ctx.fillStyle = ghostGrad;
        ctx.beginPath();
        ctx.arc(x, y - 18 + drift, 32, Math.PI, 0, false);
        // Wavy bottom edge
        const points = 8;
        for (let i = points; i >= 0; i--) {
            const px = x + 32 - (i / points) * 64;
            const py = y + 25 + drift + Math.sin(i * 1.2 + animTimer * 4) * 6;
            ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Inner glow layer
        ctx.fillStyle = "rgba(192, 132, 252, 0.2)";
        ctx.beginPath();
        ctx.arc(x, y - 10 + drift, 20, 0, Math.PI * 2);
        ctx.fill();

        // Haunting eyes
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.ellipse(x - 10, y - 18 + drift, 5, 9, 0, 0, Math.PI * 2);
        ctx.ellipse(x + 10, y - 18 + drift, 5, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Dark pupils
        ctx.fillStyle = "#2e1065";
        ctx.beginPath();
        ctx.arc(x - 10, y - 16 + drift, 2.5, 0, Math.PI * 2);
        ctx.arc(x + 10, y - 16 + drift, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Mouth
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y - 6 + drift, 6, 0, Math.PI);
        ctx.stroke();

    } else if (type === 'golem') {
        // Massive ice crystal body
        let iceGrad = ctx.createLinearGradient(x - 35, y - 50, x + 35, y + 30);
        iceGrad.addColorStop(0, '#bae6fd');
        iceGrad.addColorStop(0.3, '#38bdf8');
        iceGrad.addColorStop(0.6, '#0284c7');
        iceGrad.addColorStop(1, '#0c4a6e');

        // Main crystal body (hexagonal-ish)
        ctx.fillStyle = iceGrad;
        ctx.beginPath();
        ctx.moveTo(x, y - 52);
        ctx.lineTo(x + 28, y - 35);
        ctx.lineTo(x + 32, y - 5);
        ctx.lineTo(x + 26, y + 25);
        ctx.lineTo(x - 26, y + 25);
        ctx.lineTo(x - 32, y - 5);
        ctx.lineTo(x - 28, y - 35);
        ctx.closePath();
        ctx.fill();

        // Facet lines
        ctx.strokeStyle = "rgba(186, 230, 253, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y - 52);
        ctx.lineTo(x - 10, y + 25);
        ctx.moveTo(x, y - 52);
        ctx.lineTo(x + 15, y + 20);
        ctx.moveTo(x - 28, y - 35);
        ctx.lineTo(x + 26, y + 25);
        ctx.stroke();

        // Ice crystal protrusions
        ctx.fillStyle = "#7dd3fc";
        ctx.beginPath();
        ctx.moveTo(x - 28, y - 20);
        ctx.lineTo(x - 45, y - 35);
        ctx.lineTo(x - 30, y - 10);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 28, y - 20);
        ctx.lineTo(x + 45, y - 35);
        ctx.lineTo(x + 30, y - 10);
        ctx.closePath();
        ctx.fill();

        // Glowing core
        ctx.fillStyle = "#e0f2fe";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(x, y - 12, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Inner pupil
        ctx.fillStyle = "#0369a1";
        ctx.beginPath();
        ctx.arc(x, y - 12, 5, 0, Math.PI * 2);
        ctx.fill();

        // Frost aura
        ctx.save();
        ctx.globalAlpha = 0.1 + Math.sin(animTimer * 2) * 0.05;
        ctx.strokeStyle = "#bae6fd";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y - 10, 45, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();

    } else if (type === 'wizard') {
        // Robe body
        let robeGrad = ctx.createLinearGradient(x - 25, y - 60, x + 25, y + 35);
        robeGrad.addColorStop(0, '#6b21a8');
        robeGrad.addColorStop(0.5, '#4c1d95');
        robeGrad.addColorStop(1, '#2e1065');
        ctx.fillStyle = robeGrad;
        // Robe shape
        ctx.beginPath();
        ctx.moveTo(x - 15, y - 10);
        ctx.lineTo(x + 15, y - 10);
        ctx.lineTo(x + 28, y + 30);
        ctx.lineTo(x - 28, y + 30);
        ctx.closePath();
        ctx.fill();

        // Hood/head
        ctx.beginPath();
        ctx.arc(x, y - 25, 18, 0, Math.PI * 2);
        ctx.fill();

        // Wizard hat
        ctx.beginPath();
        ctx.moveTo(x, y - 65);
        ctx.bezierCurveTo(x + 5, y - 55, x + 22, y - 40, x + 24, y - 25);
        ctx.lineTo(x - 24, y - 25);
        ctx.bezierCurveTo(x - 22, y - 40, x - 5, y - 55, x, y - 65);
        ctx.fill();
        // Hat brim
        ctx.fillStyle = '#581c87';
        ctx.beginPath();
        ctx.ellipse(x, y - 25, 26, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        // Star on hat
        ctx.fillStyle = "#fbbf24";
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 6;
        ctx.font = "12px sans-serif";
        ctx.fillText("★", x - 5, y - 42);
        ctx.shadowBlur = 0;

        // Glowing eyes
        ctx.fillStyle = "#facc15";
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x - 7, y - 26, 3, 0, Math.PI * 2);
        ctx.arc(x + 7, y - 26, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Staff
        ctx.fillStyle = "#78350f";
        ctx.fillRect(x + 25, y - 50, 5, 80);
        // Orb on top
        let orbGrad = ctx.createRadialGradient(x + 27, y - 55, 2, x + 27, y - 55, 10);
        orbGrad.addColorStop(0, '#67e8f9');
        orbGrad.addColorStop(0.5, '#06b6d4');
        orbGrad.addColorStop(1, '#0e7490');
        ctx.fillStyle = orbGrad;
        ctx.shadowColor = "#22d3ee";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x + 27.5, y - 55, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Orb highlight
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.beginPath();
        ctx.arc(x + 25, y - 58, 3, 0, Math.PI * 2);
        ctx.fill();

        // Magical rune particles orbiting
        for (let r = 0; r < 3; r++) {
            const angle = animTimer * 2 + r * (Math.PI * 2 / 3);
            const rx = x + 27.5 + Math.cos(angle) * 16;
            const ry = y - 55 + Math.sin(angle) * 16;
            ctx.fillStyle = "#e879f9";
            ctx.shadowColor = "#e879f9";
            ctx.shadowBlur = 6;
            ctx.beginPath();
            ctx.arc(rx, ry, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

    } else if (type === 'serpent') {
        // Coiled serpent body
        ctx.save();
        let bodyGrad = ctx.createRadialGradient(x, y - 8, 5, x, y, 40);
        bodyGrad.addColorStop(0, '#fb923c');
        bodyGrad.addColorStop(0.5, '#ea580c');
        bodyGrad.addColorStop(1, '#9a3412');

        // Body coils
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.arc(x, y + 8, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x - 10, y - 5, 22, 0, Math.PI * 2);
        ctx.fill();

        // Head
        ctx.beginPath();
        ctx.ellipse(x + 5, y - 25, 18, 14, 0.2, 0, Math.PI * 2);
        ctx.fill();

        // Scale pattern
        ctx.strokeStyle = "rgba(124, 45, 18, 0.3)";
        ctx.lineWidth = 1;
        for (let s = 0; s < 6; s++) {
            ctx.beginPath();
            ctx.arc(x - 15 + s * 8, y + 5, 5, 0, Math.PI);
            ctx.stroke();
        }

        // Fire breath
        const breathSize = 12 + Math.sin(animTimer * 6) * 5;
        let fireGrad = ctx.createRadialGradient(x + 22, y - 28, 2, x + 22, y - 28, breathSize);
        fireGrad.addColorStop(0, 'rgba(255, 255, 200, 0.8)');
        fireGrad.addColorStop(0.4, 'rgba(255, 150, 0, 0.6)');
        fireGrad.addColorStop(1, 'rgba(255, 50, 0, 0)');
        ctx.fillStyle = fireGrad;
        ctx.beginPath();
        ctx.arc(x + 22, y - 28, breathSize, 0, Math.PI * 2);
        ctx.fill();

        // Eyes
        ctx.fillStyle = "#fef08a";
        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(x, y - 28, 4, 5, 0, 0, Math.PI * 2);
        ctx.ellipse(x + 12, y - 27, 4, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.ellipse(x + 1, y - 27, 2, 4, 0, 0, Math.PI * 2);
        ctx.ellipse(x + 13, y - 26, 2, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Forked tongue
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + 20, y - 23);
        ctx.lineTo(x + 28, y - 22);
        ctx.lineTo(x + 32, y - 25);
        ctx.moveTo(x + 28, y - 22);
        ctx.lineTo(x + 32, y - 19);
        ctx.stroke();

        ctx.restore();

    } else if (type === 'dragon') {
        // Wings (behind body)
        ctx.fillStyle = "#991b1b";
        // Left wing
        ctx.beginPath();
        ctx.moveTo(x - 15, y - 20);
        ctx.quadraticCurveTo(x - 75, y - 80, x - 60, y + 5);
        ctx.lineTo(x - 15, y);
        ctx.fill();
        // Right wing
        ctx.beginPath();
        ctx.moveTo(x + 15, y - 20);
        ctx.quadraticCurveTo(x + 85, y - 85, x + 65, y + 5);
        ctx.lineTo(x + 15, y);
        ctx.fill();
        // Wing membrane
        ctx.strokeStyle = "rgba(239, 68, 68, 0.3)";
        ctx.lineWidth = 1;
        for (let w = 0; w < 4; w++) {
            ctx.beginPath();
            ctx.moveTo(x - 14 - w * 2, y - 18 + w * 4);
            ctx.quadraticCurveTo(x - 50 - w * 5, y - 50 + w * 15, x - 55 + w * 5, y + 3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x + 14 + w * 2, y - 18 + w * 4);
            ctx.quadraticCurveTo(x + 55 + w * 5, y - 50 + w * 15, x + 60 - w * 5, y + 3);
            ctx.stroke();
        }

        // Body
        let dragonGrad = ctx.createRadialGradient(x - 5, y - 15, 5, x, y, 50);
        dragonGrad.addColorStop(0, '#fca5a5');
        dragonGrad.addColorStop(0.3, '#ef4444');
        dragonGrad.addColorStop(0.6, '#b91c1c');
        dragonGrad.addColorStop(1, '#7f1d1d');
        ctx.fillStyle = dragonGrad;
        ctx.beginPath();
        ctx.ellipse(x, y, 35, 30, 0, 0, Math.PI * 2);
        ctx.fill();

        // Belly scales
        ctx.fillStyle = "rgba(253, 224, 71, 0.25)";
        ctx.beginPath();
        ctx.ellipse(x, y + 5, 18, 20, 0, 0, Math.PI * 2);
        ctx.fill();

        // Neck and head
        ctx.fillStyle = dragonGrad;
        ctx.beginPath();
        ctx.ellipse(x - 5, y - 30, 16, 12, -0.3, 0, Math.PI * 2);
        ctx.fill();
        // Head
        ctx.beginPath();
        ctx.ellipse(x - 10, y - 42, 20, 16, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Horns
        ctx.fillStyle = "#713f12";
        ctx.beginPath();
        ctx.moveTo(x - 20, y - 50);
        ctx.quadraticCurveTo(x - 35, y - 75, x - 15, y - 60);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x, y - 52);
        ctx.quadraticCurveTo(x + 10, y - 78, x + 5, y - 58);
        ctx.fill();

        // Eyes (glowing)
        ctx.fillStyle = "rgba(253, 224, 71, 0.9)";
        ctx.shadowColor = "#eab308";
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.ellipse(x - 18, y - 44, 6, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Slit pupil
        ctx.fillStyle = "#1a1a1a";
        ctx.beginPath();
        ctx.ellipse(x - 18, y - 44, 2, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();

        // Nostril smoke
        ctx.fillStyle = "rgba(100, 100, 100, 0.3)";
        const smokeOff = Math.sin(animTimer * 3) * 3;
        ctx.beginPath();
        ctx.arc(x - 25, y - 38 + smokeOff, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x - 28, y - 42 + smokeOff, 3, 0, Math.PI * 2);
        ctx.fill();

        // Tail
        ctx.strokeStyle = "#991b1b";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(x + 30, y + 10);
        ctx.bezierCurveTo(x + 50, y + 25, x + 60, y + 15, x + 55, y + 5);
        ctx.stroke();
        // Tail spike
        ctx.fillStyle = "#713f12";
        ctx.beginPath();
        ctx.moveTo(x + 55, y + 5);
        ctx.lineTo(x + 65, y - 2);
        ctx.lineTo(x + 58, y + 10);
        ctx.closePath();
        ctx.fill();

    } else if (type === 'griffin') {
        // Storm Griffin: Feathery wings & Lion body with Eagle head
        ctx.fillStyle = "#d97706";
        ctx.beginPath();
        ctx.ellipse(x, y + 5, 30, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        // Wings
        ctx.fillStyle = "#fef08a";
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 15);
        ctx.quadraticCurveTo(x - 65, y - 75, x - 50, y + 5);
        ctx.lineTo(x - 10, y);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 10, y - 15);
        ctx.quadraticCurveTo(x + 75, y - 75, x + 50, y + 5);
        ctx.lineTo(x + 10, y);
        ctx.fill();
        // Head
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x - 12, y - 28, 16, 0, Math.PI * 2);
        ctx.fill();
        // Beak
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.moveTo(x - 24, y - 30);
        ctx.lineTo(x - 38, y - 22);
        ctx.lineTo(x - 24, y - 18);
        ctx.closePath();
        ctx.fill();
        // Eye
        ctx.fillStyle = "#0284c7";
        ctx.beginPath();
        ctx.arc(x - 18, y - 30, 3.5, 0, Math.PI * 2);
        ctx.fill();

    } else if (type === 'leviathan') {
        // Abyssal Leviathan: Deep sea serpent with tentacles & angler lure
        ctx.fillStyle = "#311042";
        ctx.beginPath();
        ctx.ellipse(x, y + 10, 36, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        // Tentacles
        ctx.strokeStyle = "#7e22ce";
        ctx.lineWidth = 6;
        for (let t = 0; t < 4; t++) {
            const txOff = (t - 1.5) * 16;
            ctx.beginPath();
            ctx.moveTo(x + txOff, y + 25);
            ctx.quadraticCurveTo(x + txOff + Math.sin(animTimer * 4 + t) * 12, y + 50, x + txOff, y + 65);
            ctx.stroke();
        }
        // Glowing Angler Lure
        ctx.strokeStyle = "#c084fc";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 25);
        ctx.quadraticCurveTo(x - 25, y - 55, x - 35, y - 45);
        ctx.stroke();
        ctx.fillStyle = "#e879f9";
        ctx.shadowColor = "#e879f9";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(x - 35, y - 45, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Eyes
        ctx.fillStyle = "#ff4757";
        ctx.beginPath();
        ctx.arc(x - 12, y - 15, 4, 0, Math.PI * 2);
        ctx.arc(x + 8, y - 15, 4, 0, Math.PI * 2);
        ctx.fill();

    } else if (type === 'archangel') {
        // Archangel Sentinel: Radiant winged celestial guardian with halo
        // Wings
        ctx.fillStyle = "rgba(254, 240, 138, 0.9)";
        ctx.shadowColor = "#fde047";
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(x - 10, y - 20);
        ctx.quadraticCurveTo(x - 80, y - 80, x - 55, y + 15);
        ctx.lineTo(x - 10, y);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 10, y - 20);
        ctx.quadraticCurveTo(x + 80, y - 80, x + 55, y + 15);
        ctx.lineTo(x + 10, y);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Body armor
        let aGrad = ctx.createLinearGradient(x - 18, y - 20, x + 18, y + 25);
        aGrad.addColorStop(0, '#ffffff');
        aGrad.addColorStop(0.5, '#fde047');
        aGrad.addColorStop(1, '#ca8a04');
        ctx.fillStyle = aGrad;
        ctx.beginPath();
        ctx.roundRect(x - 18, y - 20, 36, 45, 6);
        ctx.fill();
        // Halo Ring
        ctx.strokeStyle = "#fde047";
        ctx.shadowColor = "#fde047";
        ctx.shadowBlur = 15;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(x, y - 45, 20, 7, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
        // Visor light
        ctx.fillStyle = "#38bdf8";
        ctx.fillRect(x - 10, y - 28, 20, 4);

    } else if (type === 'titan') {
        // Omega Chaos Titan: Colossal stone titan with magma core
        let tGrad = ctx.createRadialGradient(x, y - 10, 5, x, y, 60);
        tGrad.addColorStop(0, '#78350f');
        tGrad.addColorStop(0.5, '#451a03');
        tGrad.addColorStop(1, '#1c1917');
        ctx.fillStyle = tGrad;
        ctx.beginPath();
        ctx.ellipse(x, y - 5, 45, 40, 0, 0, Math.PI * 2);
        ctx.fill();
        // Magma core
        ctx.fillStyle = "#ff4757";
        ctx.shadowColor = "#ff4757";
        ctx.shadowBlur = 25;
        ctx.beginPath();
        ctx.arc(x, y - 5, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffa502";
        ctx.beginPath();
        ctx.arc(x, y - 5, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        // Magma crown
        ctx.fillStyle = "#ff4757";
        ctx.beginPath();
        ctx.moveTo(x - 25, y - 40);
        ctx.lineTo(x - 30, y - 65);
        ctx.lineTo(x - 12, y - 52);
        ctx.lineTo(x, y - 72);
        ctx.lineTo(x + 12, y - 52);
        ctx.lineTo(x + 30, y - 65);
        ctx.lineTo(x + 25, y - 40);
        ctx.closePath();
        ctx.fill();
    }

    // Ice Casing Overlay when Monster is Frozen
    if (type === GameState.enemy.type && GameState.enemy.isFrozen) {
        ctx.save();
        ctx.fillStyle = "rgba(125, 211, 252, 0.45)";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.roundRect(x - 45, y - 65, 90, 105, 12);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
}

function createFireballParticles(x, y) {
    for (let i = 0; i < 25; i++) {
        GameState.particles.push({
            x: x,
            y: y,
            vx: 8 + Math.random() * 6,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            color: Math.random() > 0.4 ? "#ff4757" : "#ffa502"
        });
    }
}

function createLightningParticles(x, y) {
    for (let i = 0; i < 30; i++) {
        GameState.particles.push({
            x: x + (Math.random() - 0.5) * 40,
            y: y + (Math.random() - 0.5) * 40,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12,
            life: 1,
            color: "#00f2fe"
        });
    }
}

function createSparkParticles(x, y, color) {
    for (let i = 0; i < 18; i++) {
        GameState.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 9,
            vy: (Math.random() - 0.5) * 9,
            life: 1,
            color: color || "#ffc107"
        });
    }
}

function createIceFreezeParticles(x, y) {
    for (let i = 0; i < 30; i++) {
        GameState.particles.push({
            x: x + (Math.random() - 0.5) * 35,
            y: y + (Math.random() - 0.5) * 35,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1,
            color: Math.random() > 0.5 ? "#7dd3fc" : "#38bdf8"
        });
    }
}

function createSlashComboParticles(x, y) {
    for (let i = 0; i < 24; i++) {
        GameState.particles.push({
            x: x + (Math.random() - 0.5) * 25,
            y: y + (Math.random() - 0.5) * 25,
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() - 0.5) * 6,
            life: 1,
            color: Math.random() > 0.3 ? "#ef4444" : "#f87171"
        });
    }
}

function createMeteorStrikeParticles(x, y) {
    for (let i = 0; i < 40; i++) {
        GameState.particles.push({
            x: x + (Math.random() - 0.5) * 50,
            y: y + (Math.random() - 0.5) * 50,
            vx: (Math.random() - 0.5) * 16,
            vy: (Math.random() - 0.5) * 16,
            life: 1.2,
            color: Math.random() > 0.5 ? "#c084fc" : (Math.random() > 0.5 ? "#f59e0b" : "#e879f9")
        });
    }
}

function createPhoenixWingParticles(x, y) {
    for (let i = 0; i < 35; i++) {
        const angle = (i / 35) * Math.PI * 2;
        GameState.particles.push({
            x: x + Math.cos(angle) * 15,
            y: y + Math.sin(angle) * 15,
            vx: Math.cos(angle) * 6,
            vy: Math.sin(angle) * 6 - 2,
            life: 1,
            color: Math.random() > 0.4 ? "#ff793f" : "#ffb142"
        });
    }
}

function updateAndDrawParticles() {
    for (let i = GameState.particles.length - 1; i >= 0; i--) {
        const p = GameState.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;

        if (p.life <= 0) {
            GameState.particles.splice(i, 1);
        } else {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
}

function addDamagePopup(text, x, y, color) {
    GameState.damageFloatingTexts.push({
        text: text,
        x: x,
        y: y,
        life: 1,
        color: color
    });
}

function updateAndDrawPopups() {
    for (let i = GameState.damageFloatingTexts.length - 1; i >= 0; i--) {
        const pop = GameState.damageFloatingTexts[i];
        pop.y -= 1;
        pop.life -= 0.02;

        if (pop.life <= 0) {
            GameState.damageFloatingTexts.splice(i, 1);
        } else {
            ctx.font = "900 24px Fredoka, sans-serif";
            ctx.fillStyle = pop.color;
            ctx.globalAlpha = pop.life;
            ctx.fillText(pop.text, pop.x - 25, pop.y);
            ctx.globalAlpha = 1;
        }
    }
}

// --- Event Listeners ---
function setupEventListeners() {
    document.getElementById('btn-toggle-mode').addEventListener('click', () => {
        setGameMode(GameState.mode === "EXPLORE" ? "BATTLE" : "EXPLORE");
    });

    const potBtn = document.getElementById('btn-use-potion');
    if (potBtn) {
        potBtn.addEventListener('click', () => {
            usePotion();
        });
    }

    document.querySelectorAll('.btn-key').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const key = e.target.getAttribute('data-key');
            handleInput(key);
        });
    });

    window.addEventListener('keydown', (e) => {
        GameState.keysPressed[e.key] = true;

        if (e.key >= '0' && e.key <= '9') {
            handleInput(e.key);
        } else if (e.key === 'Backspace') {
            handleInput('del');
        } else if (e.key === 'Enter') {
            submitAnswer();
        }
    });

    window.addEventListener('keyup', (e) => {
        GameState.keysPressed[e.key] = false;
    });

    const bindDpad = (id, keyName) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        btn.addEventListener('touchstart', (e) => { e.preventDefault(); GameState.keysPressed[keyName] = true; btn.classList.add('active'); });
        btn.addEventListener('touchend', (e) => { e.preventDefault(); GameState.keysPressed[keyName] = false; btn.classList.remove('active'); });
        btn.addEventListener('mousedown', () => { GameState.keysPressed[keyName] = true; btn.classList.add('active'); });
        btn.addEventListener('mouseup', () => { GameState.keysPressed[keyName] = false; btn.classList.remove('active'); });
    };

    bindDpad('dpad-u', 'ArrowUp');
    bindDpad('dpad-d', 'ArrowDown');
    bindDpad('dpad-l', 'ArrowLeft');
    bindDpad('dpad-r', 'ArrowRight');

    document.getElementById('btn-submit').addEventListener('click', () => {
        submitAnswer();
    });

    document.getElementById('btn-audio').addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        document.getElementById('btn-audio').innerText = isMuted ? "🔇 Muted" : "🔊 Sound";
    });

    document.getElementById('btn-world-map').addEventListener('click', () => {
        renderWorldMap();
        document.getElementById('modal-map').classList.add('active');
    });

    document.getElementById('btn-inventory').addEventListener('click', () => {
        const msgEl = document.getElementById('shop-message');
        if (msgEl) msgEl.innerText = "";
        updateInventoryUI();
        document.getElementById('modal-inventory').classList.add('active');
    });

    document.getElementById('btn-settings').addEventListener('click', () => {
        document.getElementById('modal-settings').classList.add('active');
    });

    document.querySelectorAll('.btn-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.getAttribute('data-close');
            document.getElementById(target).classList.remove('active');
        });
    });

    document.getElementById('opt-add').addEventListener('change', (e) => {
        GameState.settings.add = e.target.checked;
        saveGameData();
    });
    document.getElementById('opt-sub').addEventListener('change', (e) => {
        GameState.settings.sub = e.target.checked;
        saveGameData();
    });
    document.getElementById('opt-arrays').addEventListener('change', (e) => {
        GameState.settings.arrays = e.target.checked;
        saveGameData();
    });

    document.getElementById('btn-reset-game').addEventListener('click', () => {
        if (confirm("Reset all Knight progress and start from Level 1?")) {
            localStorage.removeItem('math_knight_save');
            location.reload();
        }
    });

    document.getElementById('btn-next-level').addEventListener('click', () => {
        document.getElementById('modal-chest').classList.remove('active');
        if (GameState.level < 12) {
            startLevel(GameState.level + 1);
        } else {
            alert("👑 CONGRATULATIONS CHAMPION! You completed all 12 levels!");
            startLevel(1);
        }
    });

    document.getElementById('btn-retry').addEventListener('click', () => {
        document.getElementById('modal-gameover').classList.remove('active');
        GameState.knight.hp = GameState.knight.maxHp;
        startLevel(GameState.level);
    });

    document.getElementById('btn-scratchpad-toggle').addEventListener('click', () => {
        const sec = document.getElementById('scratchpad-section');
        sec.classList.toggle('active');
    });
}

function setupScratchpad() {
    const scratchCanvas = document.getElementById('scratch-canvas');
    const sctx = scratchCanvas.getContext('2d');
    let drawing = false;

    sctx.strokeStyle = "#ffc107";
    sctx.lineWidth = 3;
    sctx.lineCap = "round";

    function getPos(e) {
        const rect = scratchCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function startDraw(e) {
        drawing = true;
        const pos = getPos(e);
        sctx.beginPath();
        sctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
        if (!drawing) return;
        const pos = getPos(e);
        sctx.lineTo(pos.x, pos.y);
        sctx.stroke();
    }

    function stopDraw() {
        drawing = false;
    }

    scratchCanvas.addEventListener('mousedown', startDraw);
    scratchCanvas.addEventListener('mousemove', draw);
    scratchCanvas.addEventListener('mouseup', stopDraw);

    scratchCanvas.addEventListener('touchstart', startDraw);
    scratchCanvas.addEventListener('touchmove', draw);
    scratchCanvas.addEventListener('touchend', stopDraw);

    document.getElementById('btn-scratch-clear').addEventListener('click', () => {
        sctx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    });
}
