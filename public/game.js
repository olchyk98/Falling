const spreadID = a => {
    let i = 0;

    for (let ma of Object.keys(a)) a[ma].id = i++;

    return a;
}

// ABLOCK - ACTION BLOCK
/*
    LOADABLE_MODEL: '1'
    LOADABLE_NOKEYS_MODELS_PACK: ['1', '2', '3']
    LOADABLE_KEYS_MODEL_PACK & LOADABLE_KEYS_FONT_PACK & LOADABLE_KEYS_SOUND_PACK: {'arsdasd': '1', 'ssdkjsnad': '2'}
    LOADABLE_KEYS_MODELS_PACK: {'arsdasd': ['1', '2', '3'], 'ssdkjsnad': ['4', '5', '6']}
    LOADABLE_XKEYS_MODELS_PACK: {'arsdasd': {'afds': '1', 'adgdsf': '3rd', 'asdsa': '5rsd'}}
*/
const gameAssets = window.gameAssets = spreadID({
    "GRASS_BLOCK": {
        type: "LOADABLE_MODEL",
        murl: './assets/blocks/grass.png',
        output: null,
        markupID: 1
    },
    "DOWNGRASS_BLOCK": {
        type: "LOADABLE_MODEL",
        murl: './assets/blocks/downgrass.png',
        output: null,
        markupID: 2
    },
    "SPIKES_ABLOCK": {
        type: "LOADABLE_MODEL",
        murl: './assets/other/spikes.png',
        output: null,
        markupID: 3,
        touchAction: target => target.damage(Infinity) // instant kill
    },
    "PLAYER": {
        type: "LOADABLE_KEYS_MODELS_PACK",
        murl: {
            "ATTACK_SKILL": [
                './assets/player/attack1.png',
                './assets/player/attack2.png',
                './assets/player/attack3.png',
                './assets/player/attack4.png',
                './assets/player/attack5.png',
                './assets/player/attack6.png',
                './assets/player/attack7.png',
                './assets/player/attack8.png',
                './assets/player/attack9.png',
                './assets/player/attack10.png',
                './assets/player/attack11.png',
                './assets/player/attack12.png',
                './assets/player/attack13.png',
                './assets/player/attack14.png',
                './assets/player/attack15.png',
                './assets/player/attack16.png',
                './assets/player/attack17.png',
                './assets/player/attack18.png',
                './assets/player/attack19.png',
                './assets/player/attack20.png',
                './assets/player/attack21.png',
                './assets/player/attack22.png',
                './assets/player/attack23.png',
                './assets/player/attack24.png',
                './assets/player/attack25.png',
                './assets/player/attack26.png',
                './assets/player/attack27.png',
                './assets/player/attack28.png',
            ],
            "DIE": [
                './assets/player/die1.png',
                './assets/player/die2.png',
                './assets/player/die3.png',
                './assets/player/die4.png',
                './assets/player/die5.png',
                './assets/player/die6.png',
                './assets/player/die7.png'
            ],
            "IDLE": [
                './assets/player/idle1.png',
                './assets/player/idle2.png',
                './assets/player/idle3.png',
                './assets/player/idle4.png'
            ],
            "JUMP": [
                './assets/player/jump1.png',
                './assets/player/jump2.png',
                './assets/player/jump3.png',
                './assets/player/jump4.png'
            ],
            "RUN": [
                './assets/player/run1.png',
                './assets/player/run2.png',
                './assets/player/run3.png',
                './assets/player/run4.png',
                './assets/player/run5.png',
                './assets/player/run6.png'
            ],
            "SLIDE_SKILL": [
                './assets/player/slide1.png',
                './assets/player/slide2.png'
            ]
        },
        output: null
    },
    "BACKGROUNDS": {
        type: "LOADABLE_KEYS_MODEL_PACK",
        murl: {
            "SUNSET": './assets/backgrounds/bg2.png',
            "MOUNTAINS": './assets/backgrounds/bg3.png',
            "MOUNTAINS_LOW": './assets/backgrounds/bg4.png',
            "NIGHT_FOREST": './assets/backgrounds/bg5.png',
            "PHONTANO": './assets/backgrounds/bg6.png'
        },
        output: null
    },
    "FOOD": {
        type: "LOADABLE_KEYS_MODEL_PACK",
        murl: {
            "BANANAS": './assets/items/bananas.png',
            "COCONUT": './assets/items/coconut.png',
            "HEALING_POTION": './assets/items/healingPotion.png',
        },
        output: null
    },
    "FALLING_ITEMS": {
        type: "LOADABLE_KEYS_MODEL_PACK",
        murl: {
            "BRICKS": './assets/fallingblocks/bricks.png',
            "WANDS": './assets/fallingblocks/wands.png',
            "SNOWBALL": './assets/fallingblocks/snowball.png',
            "ICE": './assets/fallingblocks/ice.png'
        },
        output: null
    },
    "ANIMATED_EFFECTS": {
        type: "LOADABLE_KEYS_MODELS_PACK",
        murl: {
            "SHIELD": [
                './assets/items/shield/shield1.png',
                './assets/items/shield/shield2.png',
                './assets/items/shield/shield3.png',
                './assets/items/shield/shield4.png',
                './assets/items/shield/shield5.png',
                './assets/items/shield/shield6.png'
            ],
            "METEOR": [
                './assets/items/asteroid/asteroid1.png',
                './assets/items/asteroid/asteroid2.png',
                './assets/items/asteroid/asteroid3.png',
                './assets/items/asteroid/asteroid4.png',
                './assets/items/asteroid/asteroid5.png',
                './assets/items/asteroid/asteroid6.png',
                './assets/items/asteroid/asteroid7.png',
                './assets/items/asteroid/asteroid8.png',
                './assets/items/asteroid/asteroid9.png',
                './assets/items/asteroid/asteroid10.png',
                './assets/items/asteroid/asteroid11.png',
                './assets/items/asteroid/asteroid12.png',
                './assets/items/asteroid/asteroid13.png',
                './assets/items/asteroid/asteroid14.png',
                './assets/items/asteroid/asteroid15.png',
                './assets/items/asteroid/asteroid16.png',
                './assets/items/asteroid/asteroid17.png',
                './assets/items/asteroid/asteroid18.png',
                './assets/items/asteroid/asteroid19.png',
                './assets/items/asteroid/asteroid20.png',
                './assets/items/asteroid/asteroid21.png',
                './assets/items/asteroid/asteroid22.png',
                './assets/items/asteroid/asteroid23.png',
                './assets/items/asteroid/asteroid24.png',
                './assets/items/asteroid/asteroid25.png',
                './assets/items/asteroid/asteroid26.png',
                './assets/items/asteroid/asteroid27.png',
                './assets/items/asteroid/asteroid28.png',
                './assets/items/asteroid/asteroid29.png',
                './assets/items/asteroid/asteroid30.png',
                './assets/items/asteroid/asteroid31.png',
                './assets/items/asteroid/asteroid32.png',
                './assets/items/asteroid/asteroid33.png',
                './assets/items/asteroid/asteroid34.png',
                './assets/items/asteroid/asteroid35.png',
                './assets/items/asteroid/asteroid36.png',
                './assets/items/asteroid/asteroid37.png',
                './assets/items/asteroid/asteroid38.png',
                './assets/items/asteroid/asteroid39.png',
                './assets/items/asteroid/asteroid40.png',
                './assets/items/asteroid/asteroid41.png',
                './assets/items/asteroid/asteroid42.png',
                './assets/items/asteroid/asteroid43.png',
                './assets/items/asteroid/asteroid44.png',
                './assets/items/asteroid/asteroid45.png',
                './assets/items/asteroid/asteroid46.png',
                './assets/items/asteroid/asteroid47.png',
                './assets/items/asteroid/asteroid48.png',
                './assets/items/asteroid/asteroid49.png',
                './assets/items/asteroid/asteroid50.png',
                './assets/items/asteroid/asteroid51.png',
                './assets/items/asteroid/asteroid52.png',
                './assets/items/asteroid/asteroid53.png',
                './assets/items/asteroid/asteroid54.png',
                './assets/items/asteroid/asteroid55.png',
                './assets/items/asteroid/asteroid56.png',
                './assets/items/asteroid/asteroid57.png',
                './assets/items/asteroid/asteroid58.png',
                './assets/items/asteroid/asteroid59.png',
                './assets/items/asteroid/asteroid60.png',
                './assets/items/asteroid/asteroid61.png',
                './assets/items/asteroid/asteroid62.png',
                './assets/items/asteroid/asteroid63.png',
                './assets/items/asteroid/asteroid64.png',
                './assets/items/asteroid/asteroid65.png',
                './assets/items/asteroid/asteroid66.png',
                './assets/items/asteroid/asteroid67.png',
                './assets/items/asteroid/asteroid68.png',
                './assets/items/asteroid/asteroid69.png',
                './assets/items/asteroid/asteroid70.png',
                './assets/items/asteroid/asteroid71.png',
                './assets/items/asteroid/asteroid72.png',
                './assets/items/asteroid/asteroid73.png',
                './assets/items/asteroid/asteroid74.png',
                './assets/items/asteroid/asteroid75.png',
                './assets/items/asteroid/asteroid76.png',
                './assets/items/asteroid/asteroid77.png',
                './assets/items/asteroid/asteroid78.png',
                './assets/items/asteroid/asteroid79.png',
                './assets/items/asteroid/asteroid80.png',
                './assets/items/asteroid/asteroid81.png',
                './assets/items/asteroid/asteroid82.png',
                './assets/items/asteroid/asteroid83.png',
                './assets/items/asteroid/asteroid84.png',
                './assets/items/asteroid/asteroid85.png',
                './assets/items/asteroid/asteroid86.png',
                './assets/items/asteroid/asteroid87.png',
                './assets/items/asteroid/asteroid88.png',
                './assets/items/asteroid/asteroid89.png',
                './assets/items/asteroid/asteroid90.png',
                './assets/items/asteroid/asteroid91.png',
                './assets/items/asteroid/asteroid92.png',
                './assets/items/asteroid/asteroid93.png',
                './assets/items/asteroid/asteroid94.png',
                './assets/items/asteroid/asteroid95.png',
                './assets/items/asteroid/asteroid96.png',
                './assets/items/asteroid/asteroid97.png',
                './assets/items/asteroid/asteroid98.png',
                './assets/items/asteroid/asteroid99.png',
                './assets/items/asteroid/asteroid100.png',
                './assets/items/asteroid/asteroid101.png',
                './assets/items/asteroid/asteroid102.png',
                './assets/items/asteroid/asteroid103.png',
                './assets/items/asteroid/asteroid104.png',
                './assets/items/asteroid/asteroid105.png',
                './assets/items/asteroid/asteroid106.png',
                './assets/items/asteroid/asteroid107.png',
                './assets/items/asteroid/asteroid108.png',
                './assets/items/asteroid/asteroid109.png',
                './assets/items/asteroid/asteroid110.png',
                './assets/items/asteroid/asteroid111.png',
                './assets/items/asteroid/asteroid112.png',
                './assets/items/asteroid/asteroid113.png',
                './assets/items/asteroid/asteroid114.png',
                './assets/items/asteroid/asteroid115.png',
                './assets/items/asteroid/asteroid116.png',
                './assets/items/asteroid/asteroid117.png',
                './assets/items/asteroid/asteroid118.png',
                './assets/items/asteroid/asteroid119.png',
                './assets/items/asteroid/asteroid120.png'
            ]
        },
        output: null
    },
    "SKILLS": {
        type: "LOADABLE_KEYS_MODELS_PACK",
        murl: {
            "REGENERATION": [ // #0#-1-2-3-4
                './assets/skills/main/regeneration1.png',
                './assets/skills/main/regeneration2.png',
                './assets/skills/main/regeneration3.png',
                './assets/skills/main/regeneration4.png'
            ],
            "ATTACK": [
                './assets/skills/main/attack.png'
            ],
            "SLIDE": [
                './assets/skills/main/slide1.png',
                './assets/skills/main/slide2.png',
                './assets/skills/main/slide3.png'
            ],
            "METEOR": [
                './assets/skills/main/meteor1.png',
                './assets/skills/main/meteor2.png',
                './assets/skills/main/meteor3.png'
            ],
            "RAGE": [
                './assets/skills/main/rage1.png',
                './assets/skills/main/rage2.png',
                './assets/skills/main/rage3.png'
            ],
            "SHIELD": [
                './assets/skills/main/shield1.png',
                './assets/skills/main/shield2.png',
                './assets/skills/main/shield3.png'
            ],
            "FREEZE_TIME": [
                './assets/skills/main/slowtime1.png',
                './assets/skills/main/slowtime2.png',
                './assets/skills/main/slowtime3.png'
            ],
            "NO_LIMITS": [
                './assets/skills/main/nolimit1.png',
                './assets/skills/main/nolimit2.png',
                './assets/skills/main/nolimit3.png'
            ],
        },
        output: null
    },
    "SKILL_FRAMES": { // borders
        type: "LOADABLE_KEYS_MODEL_PACK",
        murl: {
            "DAMAGE": './assets/skills/frames/attack.png',
            "DEFAULT": './assets/skills/frames/default.png',
            "SAVE": './assets/skills/frames/save.png'
        },
        output: null
    },
    "HUD_ITEMS": {
        type: "LOADABLE_XKEYS_MODELS_PACK",
        murl: {
            "BUTTONS": {
                "BLUE_BORDERED": './assets/hud/buttons/1.png', 
                "ROUNDED_SAPHIRE": './assets/hud/buttons/2.png', 
                "GRAY_BOX": './assets/hud/buttons/3.png', 
                "BUBLES_ORANGE": './assets/hud/buttons/4.png', 
                "WOOD": './assets/hud/buttons/5.png', 
                "STONE": './assets/hud/buttons/6.png', 
                "SPACE_BLUE": './assets/hud/buttons/7.png',
                "GREEN_SLIME": './assets/hud/buttons/8.png',
                "SKY_SIMPLE": './assets/hud/buttons/9.png',
                "BLUE_RUBY": './assets/hud/buttons/10.png',
                "GREEN_SIMPLE": './assets/hud/buttons/11.png',
                "ROUNDED_MARK": './assets/hud/buttons/12.png',
                "ROUNDED_ORANGE": './assets/hud/buttons/13.png',
                "SPACE_PINK": './assets/hud/buttons/14.png',
                "WAFLE": './assets/hud/buttons/15.png',
                "RUBY_IN_RED": './assets/hud/buttons/16.png',
                "OUT_GROUND_MARK": './assets/hud/buttons/17.png',
                "ICE_BLUE": './assets/hud/buttons/18.png',
                "ROUNDED_LOW_RAINBOW": './assets/hud/buttons/19.png',
                "GOLD_GROUND_ROUND": './assets/hud/buttons/20.png',
            },
            "POINTS": {
                "POINT": './assets/hud/points/point.png',
                "FLASH_POINT": './assets/hud/points/flash.png'
            }
        },
        output: null
    },
    "FONTS": {
        type: "LOADABLE_KEYS_FONT_PACK",
        murl: {
            "MATCHUP": './assets/fonts/MatchupPro.otf'
        },
        output: null
    },
    "STUFF": {
        type: "LOADABLE_KEYS_MODEL_PACK",
        murl: {
            "PROGRESSION_BACKGROUND": './assets/other/levelupbg.png'
        },
        output: null
    },
    // "SOUNDS": {
    //     type: "LOADABLE_KEYS_SOUND_PACK",
    //     murl: {
    //         "HERO_ATTACK_SKILL": './assets/sounds/attack_skill.wav',
    //         "HERO_EARNS_FALLING_POINT": './assets/sounds/earn_fallling_point.wav',
    //         "LEVEL_EASY_CHOOSE": './assets/sounds/easy_level.wav',
    //         "HERO_TIME_FREEZE_SKILL": './assets/sounds/freeze_time_skill.wav',
    //         "LEVEL_HELL_CHOOSE": './assets/sounds/hell_level.wav',
    //         "HERO_DAMAGE": './assets/sounds/hero_damage.wav',
    //         "HERO_DEATH": './assets/sounds/hero_death.wav',
    //         "LEVEL_HIGH_CHOOSE": './assets/sounds/high_level.wav',
    //         "LEVEL_IMPOSSIBLE_CHOOSE": './assets/sounds/impossible_level.wav',
    //         "MENU_CLICK_SOUND": './assets/sounds/menu_click_sound.wav',
    //         "HERO_NO_LIMITS_SKILL": './assets/sounds/no_limits_skill.wav',
    //         "HERO_RAGE_SKILL": './assets/sounds/rage_skill.wav',
    //         "HERO_REGENERATE_SKILL": './assets/sounds/regenerate_skill.wav',
    //         "HERO_SLIDE_SKILL": './assets/sounds/slide_skill.wav',
    //         "HERO_SHIELD_SKILL": './assets/sounds/shield_skill.wav',
    //         "LEVEL_STANDARD_CHOOSE": './assets/sounds/standard_level.wav',
    //         "HERO_SUMMON_METEOR_SKILL": './assets/sounds/summon_meteor_skill.wav'
    //     },
    //     output: null
    // }
});

const pressedKeys = window.pressedKeys = {}

/*
    0 - void
    1 - grass block
    2 - down grass block
    3 - spikes
*/
const map = [ // goes from down to up of the screen
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

let liveMap = window.liveMap = [];

const gameInfo = window.gameInfo = {
    appStage: "MENU_EVOLUTION", // MAIN_MENU, MENU_LEVELS, MENU_EVOLUTION, MENU_CONVERTOR, GAME_ACTION
    appStageInfo: {},
    active: false,
    lastBtnClick: +new Date,
    canvas: {
        height: innerHeight + 1,
        width: innerWidth,
        frameRate: 60
    },
    gameLevel: 2, // 0 - EASY, 1 - STANDARD, 2 - HARD, 3 - IMPOSSIBLE, 4 - HELL
    blockSize: innerWidth / map[0].length,
    activeObjects: {
        player: null,
        fallingItems: [],
        meteors: []
    },
    gameBackground: (() => {
        const a = Object.keys(gameAssets["BACKGROUNDS"].murl);
        return a[Math.floor(Math.random() * a.length)]
    })(),
    slowFallingObjects: false, // false || %
    nextBlock: Infinity, // time to next falling block
    nextPlayFood: Infinity,
    pushSession: function(state) { // @state: Object!
        localStorage.setItem("gameStats", JSON.stringify(state));
    },
    gameSession: (() => {
        const sn = "gameStats";
        let stats;

        try {
            stats = JSON.parse(localStorage.getItem(sn) || "");
        } catch {
            stats = {
                points: 0,
                flashPoints: 0
            }
            localStorage.setItem(sn, JSON.stringify(stats));
        }

        return stats;
    })()
}

window.nextblockID = window.nextMeteorID = 0;

const secondsToFrames = window.secondsToFrames = (s = 1) => 60 / gameInfo.canvas.frameRate * 60 * s;

window.playSound = s => {
    s.play();
}

function fitTImage(i, w = null, h = null) {
    if(!w) w = width;
    if(!h) h = height;

    const p = h * (i.width / i.height);

    return [
        i,
        0,
        h - p,
        w,
        p
    ];
}

const pointsToFlash = a => a / 5;

function askForClick(gonnaClick = false) {
    const a = abs(gameInfo.lastBtnClick / 1000 - +new Date / 1000) > .5;

    if(gonnaClick && a) gameInfo.lastBtnClick = +new Date;

    return a;
}

function handleNextBlock() {
    if(!gameInfo.active) return;

    const a = gameInfo.nextBlock;

    if((a === Infinity || a <= 0) && !gameInfo.slowFallingObjects) {
        let nbs = [
            [
                secondsToFrames(.2),
                secondsToFrames(.5)
            ],
            [
                secondsToFrames(.085),
                secondsToFrames(.15)
            ],
            [
                secondsToFrames(.05),
                secondsToFrames(.1)
            ],
            [
                secondsToFrames(.05),
                secondsToFrames(.1)
            ],
            [
                secondsToFrames(0),
                secondsToFrames(.05)
            ],
        ][gameInfo.gameLevel];

        gameInfo.nextBlock = random(nbs[0], nbs[1]);

        if(a <= 0) {
            const o = o => o[floor(random(o.length))];

            if(random(false, true) <= .95) { // obstacle
                const size = 75,
                      mod = o(Object.values(gameAssets["FALLING_ITEMS"].output)),
                      speed = [[1, 2], [1, 7], [7, 20], [25, 30], [30, 40]][gameInfo.gameLevel];

                gameInfo.activeObjects.fallingItems.push(
                    new FallingItem(
                        size, size,
                        random(0, width - size),
                        -size,
                        random(speed[0], speed[1]), // speed // LEVELING
                        "OBSTACLE",
                        mod,
                        this.nextblockID++
                    )
                );
            } else { // points
                const mod = o(Object.values(gameAssets["FOOD"].output)),
                      size = 50;

                gameInfo.activeObjects.fallingItems.push(
                    new FallingItem(
                        size, size,
                        random(0, width - size),
                        -size,
                        random(10, 12.5), // speed // LEVELING
                        "POINTS",
                        mod,
                        this.nextblockID++
                    )
                );
            }
        }
    } else {
        gameInfo.nextBlock--;
    }
}

function handlePlayFood() {
    if(gameInfo.activeObjects.player.isDead) return;

    const a = gameInfo;

    if(a.nextPlayFood === Infinity || --a.nextPlayFood <= 0) {
        const quota = [ // frames per food // lvls
            window.secondsToFrames(4),
            window.secondsToFrames(3),
            window.secondsToFrames(2),
            window.secondsToFrames(1),
            window.secondsToFrames(.85)
        ][a.gameLevel];

        // Reset timer
        a.nextPlayFood = quota;

        // Add food
        const b = a.gameSession;
        b.points++;
        a.pushSession(b);
    }
}

function changeAppStage(s) {
    gameInfo.appStage = s;
    gameInfo.appStageInfo = {}
}

function inititalizeGame(lvl) {
    gameInfo.gameLevel = lvl;
    gameInfo.active = true;
    changeAppStage("GAME_ACTION");

    gameInfo.activeObjects.player = new Player(400, 20);

    return true;
}

function preload() {
    // Check if map has a valid structure
    if (map.length > 1 && map.slice(1).filter(io => io.length === map[0].length).length !== map.length - 1) {
        alert("MAP ERROR. CHECK THE CONSOLE");
        throw new Error("Given map is invalid. Please, check if all layers have the same number of blocks");
    }

    // func@: Get assets by type
    const gt = a => Object.values(gameAssets).filter(io => io.type === a);

    // Load single models
    for (let ma of gt("LOADABLE_MODEL")) {
        ma.output = loadImage(ma.murl);
    }

    // Load images pack without keys
    for (let ma of gt("LOADABLE_NOKEYS_MODELS_PACK")) {
        ma.output = [];
        for (let mk of ma.murl) ma.output.push(loadImage(mk));
    }

    // Load images pack with keys @[mult]
    for (let ma of gt("LOADABLE_KEYS_MODELS_PACK")) {
        ma.output = {}
        for (let mk of Object.keys(ma.murl)) {
            ma.output[mk] = [];
            for (let ml of ma.murl[mk]) ma.output[mk].push(loadImage(ml));
        }
    }

    // Load images pack with 2d ar keys @[mult]
    for (let ma of gt("LOADABLE_XKEYS_MODELS_PACK")) {
        ma.output = {}
        for (let mk of Object.keys(ma.murl)) {
            ma.output[mk] = {};
            for (let ml of Object.keys(ma.murl[mk])) {
                ma.output[mk][ml] = loadImage(ma.murl[mk][ml]);
            }
        }
    }

    // Load images pack with keys @[single]
    for (let ma of gt("LOADABLE_KEYS_MODEL_PACK")) {
        ma.output = {}
        for (let mk of Object.keys(ma.murl)) {
            ma.output[mk] = loadImage(ma.murl[mk]);
        }
    }

    // Load fonts pack with keys
    for (let ma of gt("LOADABLE_KEYS_FONT_PACK")) {
        ma.output = {}
        for (let mk of Object.keys(ma.murl)) {
            ma.output[mk] = loadFont(ma.murl[mk]);
        }
    }

    // Load sounds pack with keys
    for (let ma of gt("LOADABLE_KEYS_SOUND_PACK")) {
        ma.output = {}
        for (let mk of Object.keys(ma.murl)) {
            ma.output[mk] = loadSound(ma.murl[mk]);
        }
    }
}

function setup() {
    createCanvas(gameInfo.canvas.width, gameInfo.canvas.height);
    frameRate(gameInfo.canvas.frameRate);    
}

function draw() {
    // Display points
    function drawPoints() {
        let im = 7.5, // icon margin
            sg = 15, // stat gap (top, right)
            is = 30, // icon size
            sm = 10; // stat margin

        [
            {
                icon: gameAssets["HUD_ITEMS"].output["POINTS"]["POINT"],
                value: gameInfo.gameSession.points
            },
            {
                icon: gameAssets["HUD_ITEMS"].output["POINTS"]["FLASH_POINT"],
                value: gameInfo.gameSession.flashPoints
            }
        ].forEach(({ icon, value }, ik) => {
            const iy = sg + ( (is + sm) * ik );

            image(
                icon,
                width - is - sg,
                iy,
                is, is
            );

            textAlign(RIGHT, CENTER);
            fill('white');
            textSize(25);
            text(
                value,
                width - is - sg - im,
                iy + is / 2 + 1
            );
        });
    }

    switch(gameInfo.appStage) {
        case 'MAIN_MENU':
        case 'MENU_LEVELS': {
            push();
                // Background
                image(...fitTImage(gameAssets["BACKGROUNDS"].output["NIGHT_FOREST"]));

                // Buttons
                {
                    let bh = 80, // menu button height
                        bw = 220, // menu button width
                        bm = 20; // menu button margin

                    let buttons = [];

                    if(gameInfo.appStage === "MAIN_MENU") {
                        buttons = [
                            {
                                title: "Play",
                                toStage: "MENU_LEVELS"
                            },
                            {
                                title: "Evolution",
                                toStage: "MENU_EVOLUTION"
                            },
                            {
                                title: "Convert",
                                toStage: "MENU_CONVERTOR"
                            },
                            {
                                title: "Github",
                                onClick: () => window.open("https://github.com/olchyk98/Falling")
                            }
                        ];
                    } else if(gameInfo.appStage === "MENU_LEVELS") {
                        buttons = [
                            {
                                title: "HELL",
                                onClick: () => inititalizeGame(4)
                            },
                            {
                                title: "IMPOSSIBLE",
                                onClick: () => inititalizeGame(3)
                            },
                            {
                                title: "HARD",
                                onClick: () => inititalizeGame(2)
                            },
                            {
                                title: "STANDARD",
                                onClick: () => inititalizeGame(1)
                            },
                            {
                                title: "EASY",
                                onClick: () => inititalizeGame(0)
                            }
                        ];
                    }

                    const buttonsH = buttons.length * (bm + bh); // menu buttons container height

                    let mouseHover = false;

                    buttons.forEach(({ title, toStage, onClick }, ik) => {
                        const x = width / 2 - bw / 2,
                              y = height / 2 - buttonsH / 2 + ik * (bm + bh);

                        fill('white');
                        image(
                            gameAssets["HUD_ITEMS"].output["BUTTONS"]["SPACE_BLUE"],
                            x,
                            y,
                            bw,
                            bh
                        );
                        textAlign(CENTER, CENTER);
                        textSize(30);
                        fill('rgba(255, 255, 255, .85)');
                        text(
                            title,
                            x + bw / 2,
                            y + bh / 2,    
                        );

                        // ::hover::
                        const ih = (
                            (mouseX > x && mouseX < x + bw) &&
                            (mouseY > y && mouseY < y + bh)
                        );

                        if(ih && !mouseHover) mouseHover = true;

                        // ::active::
                        if(mouseIsPressed && ih && askForClick(true)) {
                            mouseIsPressed = false;

                            if(onClick) onClick();
                            else if(toStage) changeAppStage(toStage);
                            else console.error(`Stage ${ toStage } is not available yet.`);
                        }
                    });

                    if(mouseHover) {
                        document.getElementsByTagName("canvas")[0].style.cursor = "pointer";
                    } else {
                        document.getElementsByTagName("canvas")[0].style.cursor = "inherit";
                    }
                }

                drawPoints();
            pop();
        }
        break;
        case 'MENU_EVOLUTION': {
            // global variables (container I, container II)
            const siw = 350; // skill info width

            // Skill info container
            const si_ctm = 20, // skill info -> content top margin
                  si_sis = 100, // skill info -> skill icon size
                  si_ing = 20, // skill info -> icon, name gap
                  si_nts = 30, // skill info -> name text size
                  si_sdt = 20; // skill info -> skill description text

            image(
                gameAssets["SKILLS"].output["ATTACK"][0],
                siw / 2 - si_sis / 2,
                si_ctm,
                si_sis,
                si_sis
            );

            push();
                textAlign(CENTER, TOP);
                noStroke();
                textFont('Arial');

                textSize(si_nts);
                text(
                    "BLOODY REVENGE",
                    siw / 2,
                    si_ctm + si_sis + si_ing  
                );

                [
                    {
                        txt: "Damage: 100/*200*/300"
                    },
                    {
                        txt: "Restore: 100/*200*/300"
                    },
                    {
                        txt: "Radius: 100/*200*/300"
                    },
                    {
                        txt: "Update price: 100/*200*/300"
                    }
                ].forEach(({ txt }, il) => {
                    textSize(si_sdt);
                    text(
                        txt,
                        siw / 2,
                        si_ctm + si_sis + si_ing * 2 + ((il !== 0) ? si_nts + si_sdt * (il + 1) : si_nts) / 2
                    );
                });
            pop();

            // Skills / Points container
            image(
                gameAssets["STUFF"].output["PROGRESSION_BACKGROUND"],
                siw,
                0,
                width - siw,
                height
            );

        }
        break;
        case 'MENU_CONVERTOR': {
            image(...fitTImage(gameAssets["BACKGROUNDS"].output["MOUNTAINS_LOW"]));

            const em = 40, // ess margin
                  eis = 30, // ess icon size
                  etm = 100, // ess text margin
                  elim = 5, // ess low text margin
                  sw = 300, // slider width
                  sh = 10, // slider height
                  scs = 20, // slider cursor siz
                  dbw = 120, // default button width
                  dbh = 55, // default button height
                  dbm = 20; // default button margin

            const toCenter = height / 2 - (eis + 20 + sh + scs / 2 + (dbh + dbm) * 2) / 2
            const pointsToConvert = round(gameInfo.gameSession.points / 100 * (gameInfo.appStageInfo.sliderProcent || 0));

            // Points
            image(
                gameAssets["HUD_ITEMS"].output["POINTS"]["POINT"],
                width / 2 - eis / 2 - etm,
                toCenter,
                eis, eis
            );
            push();
                textAlign(CENTER, TOP);
                text(
                    pointsToConvert,
                    width / 2 - etm,
                    eis + elim + toCenter
                );
            pop();

            push();
                textAlign(CENTER, TOP);
                stroke('rgba(0, 0, 0, .15)');
                strokeWeight(2);
                text(
                    ">",
                    width / 2,
                    eis / 2 + toCenter
                );
            pop();

            // Flash Points
            image(
                gameAssets["HUD_ITEMS"].output["POINTS"]["FLASH_POINT"],
                width / 2 - eis / 2 + etm,
                toCenter,
                eis, eis
            );
            push();
                textAlign(CENTER, TOP);
                text(
                    pointsToFlash(pointsToConvert),
                    width / 2 + etm,
                    eis + elim + toCenter
                );
            pop();

            drawPoints();

            // Progress bar
            {
                const x = width / 2 - sw / 2,
                      y = eis + elim + 30 + toCenter;

                push();
                    fill('rgba(255, 255, 255, .5)');
                    noStroke();
                    rect(
                        x,
                        y,
                        sw,
                        sh
                    );
                    fill('black');
                    stroke('white');
                    strokeWeight(5);
                    ellipse(
                        x + sw / 100 * (gameInfo.appStageInfo.sliderProcent || 0),
                        y + sh / 2,
                        scs,
                        scs    
                    );
                pop();

                if(
                    mouseIsPressed &&
                    mouseX >= x && mouseX <= x + sw &&
                    mouseY >= y && mouseY <= y + sh
                ) {
                    gameInfo.appStageInfo.sliderProcent = (mouseX - x) / sw * 100;
                }
            }

            // Buttons
            [
                {
                    title: "Convert",
                    onClick: () => {
                        if(!pointsToConvert) return;

                        gameInfo.appStageInfo.sliderProcent = 0;

                        const a = window.gameInfo.gameSession;
                        a.points -= pointsToConvert;
                        a.flashPoints += pointsToFlash(pointsToConvert);
                        window.gameInfo.pushSession(a);
                    }
                },
                {
                    title: "Menu",
                    onClick: () => changeAppStage("MAIN_MENU")
                }
            ].forEach(({ title, onClick }, index) => {
                const x = width / 2 - dbw / 2,
                      y = eis + elim + 30 + sh / 2 + dbm * (index + 1) + dbh * index + toCenter;

                image(
                    gameAssets["HUD_ITEMS"].output["BUTTONS"]["GREEN_SIMPLE"],
                    x,
                    y,
                    dbw,
                    dbh
                );
                textAlign(CENTER);
                text(
                    title,
                    x + 2.5,
                    y,
                    dbw,
                    dbh
                );

                if(
                    onClick && mouseIsPressed &&
                    mouseX >= x && mouseX <= x + dbw &&
                    mouseY >= y && mouseY <= y + dbh &&
                    askForClick(true)
                ) onClick();
            });
        }
        break;
        case 'GAME_ACTION': {
            handleNextBlock();
            handlePlayFood();

            // Background
            image(...fitTImage(gameAssets["BACKGROUNDS"].output[gameInfo.gameBackground]));

            // Draw blocks // TODO: Use classes
            map.slice().reverse().forEach((ma, iy) => {
                ma.forEach((mk, ix) => {
                    if (mk === 0) return;
                    const s = gameInfo.blockSize,
                        b = liveMap[iy] && liveMap[iy][ix];

                    switch (mk) {
                        case gameAssets["GRASS_BLOCK"].markupID:
                        case gameAssets["DOWNGRASS_BLOCK"].markupID:
                        case gameAssets["SPIKES_ABLOCK"].markupID:
                            if (b && b instanceof Block) {
                                b.render();
                            } else {
                                const mo = gameAssets[Object.keys(gameAssets).find(io => gameAssets[io].markupID === mk)];
                                if(!mo) console.error("Invalid object mark!", markupID);

                                if (!liveMap[iy]) liveMap[iy] = [];
                                liveMap[iy][ix] = (new Block(
                                    mo.output,
                                    ix * s,
                                    height - (iy + 1) * s,
                                    s,
                                    ([
                                        gameAssets["SPIKES_ABLOCK"].markupID
                                    ].includes(mk)) ? "AUTO" : null,
                                    mo.touchAction
                                )).render();
                            }
                            break;
                        default:
                            break;
                    }
                });
            });

            // Draw status bar
            {
                let cw = 400, // Container width
                    hh = 15, // info bar height 
                    ibm = 5, // info bars margin
                    mt = 20, // margin top
                    fis = 25, // points icon size
                    gbe = 12.5, // gap between elements
                    cfg = 10, // custom points c-items gap
                    sis = 42.5, // skill icon size
                    sims = sis * .75, // skill icon mat size
                    smr = 25; // skills margin

                // Points
                image(
                    gameAssets["HUD_ITEMS"].output["POINTS"]["POINT"],
                    width / 2 - fis / 2 - cfg,
                    mt,
                    fis,
                    fis
                );
                push();
                    textAlign(LEFT, CENTER);
                    textSize(20);
                    fill('white');
                    text(
                        gameInfo.gameSession.points,
                        width / 2 - fis / 2 + cfg + 15,
                        mt + fis / 2
                    );
                pop();

                // Health & Mana
                const playerStats = gameInfo.activeObjects.player.getStats();

                const infoBars = [
                    {
                        ccName: "HEALTH",
                        name: "hp",
                        infoContainer: playerStats.health,
                        colorBar: "rgba(255, 0, 0, .85)",
                        colorText: "white"
                    },
                    {
                        ccName: "MANA",
                        name: "mana",
                        infoContainer: playerStats.mana,
                        colorBar: "rgba(0, 0, 255, .85)",
                        colorText: "white"
                    }
                ];

                infoBars.forEach(({ ccName, name, infoContainer, colorBar, colorText }, index) => {
                    const _y = mt + fis + gbe + (hh + ibm) * index;

                    push();
                        noStroke();
                        fill('rgba(0, 0, 0, .2)');
                        rect(
                            width / 2 - cw / 2,
                            _y,
                            cw,
                            hh
                        );
                        fill(colorBar);
                        {
                            const _mh = 1 - infoContainer.current / infoContainer.max;
                            rect(
                                width / 2 - cw / 2,
                                _y,
                                cw - cw * ((_mh > 0) ? _mh : 0),
                                hh
                            );
                        }
                        textSize(12.5);
                        fill(colorText);
                        textAlign(CENTER, CENTER);

                        let _text = `${ floor(infoContainer.current) }${ name } (${ floor(infoContainer.current / infoContainer.max * 100) }%)`;

                        if(infoContainer.real === Infinity) _text = `∞ ${ name }`;

                        text(
                            _text,
                            width / 2,
                            _y + hh / 2
                        );
                    pop();
                });

                // Skills
                const skills = gameInfo.activeObjects.player.skills.filter(io => io.level);

                const skillsW = a => ( Number.isInteger(a) ? a : skills.length - 1 ) * (sis + smr);
                
                skills.map(({ level, fireKeyCode, name, icons, restorePack, durationPack, usePrice, borderType, displayName }, index) => {
                    const x = width / 2 - cw / 2 + skillsW(index) + cw / 2 - skillsW() / 2 - sis / 2,
                          y = mt + fis + (hh + ibm * infoBars.length) + mt / 4 + gbe * 2;

                    push();
                        // cover
                        fill('#2C0C0C');
                        // strokeWeight(4);
                        // stroke('white');
                        rect(
                            x,
                            y,
                            sis,
                            sis
                        );
                        // border
                        image(
                            gameAssets["SKILL_FRAMES"].output[borderType],
                            x,
                            y,
                            sis,
                            sis
                        );
                        // icon
                        image(
                            icons[level - 1] || icons[0],
                            x + sis / 7,
                            y + sis / 7,
                            sims,
                            sims
                        );
                        // fire button
                        strokeWeight(4);
                        stroke('white');
                        textSize(17.5);
                        textAlign(CENTER, CENTER);
                        fill('black');
                        text(
                            String.fromCharCode(fireKeyCode),
                            x + sis / 2 + .5,
                            y + sis / 2
                        );
                        // restored
                        const skilld = gameInfo.activeObjects.player.getUsedSkills[name];
                        const restoreFrames = secondsToFrames((Array.isArray(restorePack)) ? restorePack[level] || restorePack[0] : restorePack);
                        const restored = (skilld) ? (skilld.startFrame + restoreFrames - frameCount ) / restoreFrames : 0;
                        const rpx = sis * ( restored < 0 ? 0 : restored ) // restored upx
                        noStroke();
                        fill('rgba(255, 255, 255, .65)');
                        rect(
                            x,
                            y + (sis - rpx),
                            sis,
                            rpx
                        );
                        // info
                        textSize(12.5);
                        textAlign(CENTER);
                        fill('white');
                        text(
                            displayName,
                            x + sis / 2,
                            y + sis + 12.5 + 5
                        );
                        if(playerStats.mana.real !== Infinity) {
                            fill( (playerStats.mana.real - usePrice >= 0) ? 'white' : 'rgba(255, 255, 255, .25)' )
                            text(
                                `${ usePrice } 🧵`,
                                x + sis / 2,
                                y + sis + 12.5 + 25
                            );
                        }

                        // listen for action
                        if(
                            (!restored || restored <= 0) &&
                            (
                                ( // keyboard
                                    keyIsPressed &&
                                    keyCode === fireKeyCode
                                ) ||
                                ( // mouse
                                    mouseIsPressed &&
                                    (mouseX > x && mouseX < x + sis) &&
                                    (mouseY > y && mouseY < y + sis)
                                )
                            )
                        ) gameInfo.activeObjects.player.useSkill(
                            name,
                            secondsToFrames(
                                (Array.isArray(durationPack)) ? durationPack[level - 1] || durationPack[0] : durationPack
                            ),
                            usePrice
                        );
                    pop();
                });
            }

            // Draw & Update Player
            gameInfo.activeObjects.player.update().render();

            // Draw falling blocks
            for(let ma of gameInfo.activeObjects.fallingItems) ma.update().render();

            // Draw meteors
            for(let ma of gameInfo.activeObjects.meteors) ma.update().render();
        }
        break;
        default:
            alert("Invalid app stage.");
            console.error("Invalid app stage.");
            noLoop();
        break;
    }
}

function keyPressed() {
    if(gameInfo.appStage === "GAME_ACTION") {
        switch (keyCode) {
            case 32: // space
                gameInfo.activeObjects.player.jump();
            break;
            case 39:
            case 68: // left
                gameInfo.activeObjects.player.setDir("LEFT", true);
            break;
            case 37:
            case 65: // right
                gameInfo.activeObjects.player.setDir("RIGHT", true);
            break;
            default:break;
        }

        pressedKeys[keyCode] = true;
    }
}

function keyReleased() {
    if(gameInfo.appStage === "GAME_ACTION") {
        pressedKeys[keyCode] = false;

        switch (keyCode) {
            case 39:
            case 68: // left
                gameInfo.activeObjects.player.setDir("LEFT", null);
            break;
            case 37:
            case 65: // right
                gameInfo.activeObjects.player.setDir("RIGHT", null);
            break;
            default:break;
        }
    }
}