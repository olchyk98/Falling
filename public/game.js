// WARNING: No static player speed

/* PARENTS */
window.importJS('./classes/Obstacle.js');

/* CHILDREN */
window.importJS('./classes/Block.js');
window.importJS('./classes/Player.js');
window.importJS('./classes/FallingItem.js');

const spreadID = a => {
    let i = 0;

    for (let ma of Object.keys(a)) a[ma].id = i++;

    return a;
}

// ABLOCK - ACTION BLOCK
/*
    LOADABLE_MODEL: '1'
    LOADABLE_NOKEYS_MODELS_PACK: ['1', '2', '3']
    LOADABLE_KEYS_MODEL_PACK: {'arsdasd': '1', 'ssdkjsnad': '2'}
    LOADABLE_KEYS_MODELS_PACK: {'arsdasd': ['1', '2', '3'], 'ssdkjsnad': ['4', '5', '6']}
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
            "SNOW": './assets/backgrounds/background1.png',
            "GREEN_TREES": './assets/backgrounds/background2.png',
            "CANDY_CASTLE": './assets/backgrounds/background3.png'
        },
        output: null
    },
    "ITEMS": {
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
    "SKILLS": {
        type: "LOADABLE_KEYS_MODELS_PACK",
        murl: {
            "REGENERATION": [
                './assets/skills/regeneration1.png',
                './assets/skills/regeneration2.png',
                './assets/skills/regeneration3.png',
                './assets/skills/regeneration4.png'
            ]
        },
        output: null
    }
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
    active: true,
    canvas: {
        height: innerHeight + 1,
        width: innerWidth,
        frameRate:  60
    },
    blockSize: innerWidth / map[0].length,
    activeObjects: {
        player: null,
        fallingItems: []
    },
    nextBlock: Infinity, // time to next falling block
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
                food: 0,
                flashPoints: 0
            }
            localStorage.setItem(sn, JSON.stringify(stats));
        }

        return stats;
    })()
}

this.nextblockID = 0;

const secondsToFrames = (s = 1) => 60 / gameInfo.canvas.frameRate * 60 * s;

function handleNextBlock() {
    if(!window.gameInfo.active) return;

    const a = gameInfo.nextBlock;

    if(a === Infinity || a <= 0) {
        gameInfo.nextBlock = random(
            secondsToFrames(.25),
            secondsToFrames()
        );

        if(a <= 0) {
            const o = o => o[floor(random(o.length))];

            if(random(false, true) <= .95) { // obstacle // LEVELING
                const size = random(150, 200), // LEVELING
                      mod = o(Object.values(gameAssets["FALLING_ITEMS"].output));

                gameInfo.activeObjects.fallingItems.push(
                    new FallingItem(
                        size, size,
                        random(0, innerWidth - size),
                        -size,
                        random(10, 15), // speed // LEVELING
                        "OBSTACLE",
                        mod,
                        this.nextblockID++
                    )
                );
            } else { // food
                const mod = o(Object.values(gameAssets["ITEMS"].output)),
                      size = 50;

                gameInfo.activeObjects.fallingItems.push(
                    new FallingItem(
                        size, size,
                        random(0, innerWidth - size),
                        -size,
                        random(10, 12.5), // speed // LEVELING
                        "FOOD",
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

    // Load images pack with keys @[single]
    for (let ma of gt("LOADABLE_KEYS_MODEL_PACK")) {
        ma.output = {}
        for (let mk of Object.keys(ma.murl)) {
            ma.output[mk] = loadImage(ma.murl[mk]);
        }
    }
}

function setup() {
    createCanvas(gameInfo.canvas.width, gameInfo.canvas.height);
    frameRate(gameInfo.canvas.frameRate);

    gameInfo.activeObjects.player = new Player(400, 20);
}

function draw() {
    backTasker();

    {
        const i = gameAssets["BACKGROUNDS"].output["GREEN_TREES"],
            p = innerHeight * (i.width / i.height);

        image(
            i,
            0,
            innerHeight - p,
            innerWidth,
            p
        );
    }

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
                            innerHeight - (iy + 1) * s,
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
            hh = 20, // health bar height 
            mt = 20, // margin top
            fis = 25, // food icon size
            gbe = 12.5, // gap between elements
            cfg = 17.5, // custom food c-items gap
            sis = 35, // skill icon size
            sims = sis * .75, // skill icon mat size
            smr = 25; // skills margin

        // Food
        image(
            gameAssets["ITEMS"].output["BANANAS"],
            innerWidth / 2 - fis / 2 - cfg,
            mt,
            fis,
            fis
        );
        textSize(20);
        fill('white');
        text(
            window.gameInfo.gameSession.food,
            innerWidth / 2 - fis / 2 + cfg,
            mt + fis / 2 + 5
        );

        // Health
        const playerHealth = window.gameInfo.activeObjects.player.getHealth();

        push();
            noStroke();
            fill('rgba(0, 0, 0, .2)');
            rect(
                innerWidth / 2 - cw / 2,
                mt + fis + gbe,
                cw,
                hh
            );
            fill('rgba(255, 0, 0, .85)');
            {
                const _mh = 1 - playerHealth.current / playerHealth.max;
                rect(
                    innerWidth / 2 - cw / 2,
                    mt + fis + gbe,
                    cw - cw * ((_mh > 0) ? _mh : 0),
                    hh
                );
            }
            textSize(12.5);
            fill('white');
            textAlign(CENTER);
            text(
                `${ floor(playerHealth.current) }hp (${ floor(playerHealth.current / playerHealth.max * 100) }%)`,
                innerWidth / 2,
                mt + fis + gbe + hh / 2 + 4.5
            );
        pop();

        // Skills
        const skills = [ // action[func]: We need to use arrow function here, because if we dont func context becomes undefined
            {
                name: "REGENERATION",
                action: (...a) => window.gameInfo.activeObjects.player.useSkill(...a),
                icon: gameAssets["SKILLS"].output["REGENERATION"][0],
                restoreFrames: secondsToFrames(10),  // static
                fireKeyCode: 104,
                runTime: secondsToFrames(4)
            },
            {
                name: "SLIDE",
                action: (...a) => window.gameInfo.activeObjects.player.useSkill(...a),
                icon: gameAssets["SKILLS"].output["REGENERATION"][0],
                restoreFrames: secondsToFrames(2),  // static
                fireKeyCode: 106,
                runTime: secondsToFrames(1)
            },
        ];

        const skillsW = a => ( Number.isInteger(a) ? a : skills.length - 1 ) * (sis + smr);
        
        skills.map(({ fireKeyCode, name, action, icon, restoreFrames, runTime }, index) => {
            const x = innerWidth / 2 - cw / 2 + skillsW(index) + cw / 2 - skillsW() / 2 - sis / 2,
                  y = mt + fis + hh + gbe * 2;

            push();
                // cover
                fill('#2C0C0C');
                strokeWeight(3);
                stroke('white');
                rect(
                    x,
                    y,
                    sis,
                    sis
                );
                // icon
                image(
                    icon,
                    x + sis / 7,
                    y + sis / 7,
                    sims,
                    sims
                );
                // fire button
                textSize(15);
                textAlign(CENTER);
                fill('black');
                text(
                    String.fromCharCode(fireKeyCode),
                    x + sis / 2 + .5,
                    y + sis / 2 + 5
                );
                // restored
                const skilld = window.gameInfo.activeObjects.player.getUsedSkills()[name];
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
                ) action(name, runTime);
            pop();
        });
    }

    // Draw & Update Player
    gameInfo.activeObjects.player.update().render();

    // Draw falling blocks
    for(let ma of gameInfo.activeObjects.fallingItems) ma.update().render();
}

function keyPressed() {
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

function keyReleased() {
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

function backTasker() {
    handleNextBlock();
}