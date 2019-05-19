// WARNING: No static player speed

window.importJS('./classes/Obstacle.js');
window.importJS('./classes/Block.js');
window.importJS('./classes/Player.js');

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
        markupID: 3
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
            "DEAD": [
                './assets/player/dead1.png',
                './assets/player/dead2.png',
                './assets/player/dead3.png',
                './assets/player/dead4.png',
                './assets/player/dead5.png',
                './assets/player/dead6.png'
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
    canvas: {
        height: innerHeight + 1,
        width: innerWidth
    },
    blockSize: innerWidth / map[0].length,
    activeObjects: {
        player: null
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
    frameRate(60);

    gameInfo.activeObjects.player = new Player(400, 20);
}

function draw() {
    {
        const i = gameAssets["BACKGROUNDS"].output["GREEN_TREES"],
            p = innerHeight * (i.width / i.height);

        image(
            i,
            0,
            innerHeight - p,
            innerWidth,
            p
        )
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
                        if (!liveMap[iy]) liveMap[iy] = [];
                        liveMap[iy][ix] = (new Block(
                            gameAssets[Object.keys(gameAssets).find(io => gameAssets[io].markupID === mk)].output,
                            ix * s,
                            innerHeight - (iy + 1) * s,
                            s,
                            ([
                                gameAssets["SPIKES_ABLOCK"].markupID
                            ].includes(mk)) ? "AUTO" : null
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
            cfg = 17.5; // custom food c-items gap

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
            '320',
            innerWidth / 2 - fis / 2 + cfg,
            mt + fis / 2 + 5
        );

        // Health
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
            rect(
                innerWidth / 2 - cw / 2,
                mt + fis + gbe,
                cw,
                hh
            );
            textSize(12.5);
            fill('white');
            textAlign(CENTER)
            text(
                '144 health (43%)',
                innerWidth / 2,
                mt + fis + gbe + hh / 2 + 4.5
            );
        pop();

        // Skills
        
    }

    // Draw & Update Player
    gameInfo.activeObjects.player.render().update();

    // TODO: Draw falling blocks
    // ...
}

function keyPressed() {
    switch (keyCode) {
        case 32:
            gameInfo.activeObjects.player.jump();
        break;
    }

    pressedKeys[keyCode] = true;
}

function keyReleased() {
    pressedKeys[keyCode] = false;
}