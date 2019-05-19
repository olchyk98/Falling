// WARNING: No static player speed

const spreadID = a => {
    let i = 0;

    for(let ma of Object.keys(a)) a[ma].id = i++;

    return a;
}

// ABLOCK - ACTION BLOCK
const gameAssets = window.gameAssets = spreadID({
    "GRASS_BLOCK": {
        type: "LOADABLE_MODEL",
        murl: './assets/blocks/grass.png',
        output: null
    },
    "SPIKES_ABLOCK": {
        type: "LOADABLE_NOKEYS_MODELS_PACK",
        murl: [
            './assets/other/spikes/1.png',
            './assets/other/spikes/2.png',
            './assets/other/spikes/3.png',
            './assets/other/spikes/4.png'
        ],
        output: null
    }
});

/*
	v - void
	g - grass block
	s - spikes
*/
const map = [ // goes from down to up of the screen
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const gameInfo = window.gameInfo = {
    canvas: {
        height: innerHeight,
        width: innerWidth
    },
    blockSize: innerWidth / map[0].length
}

function preload() {
    // Check if map has a valid structure
    if(map.length > 1 && map.slice(1).filter(io => io.length === map[0].length).length !== map.length - 1) {
        alert("MAP ERROR. CHECK THE CONSOLE");
        throw new Error("Given map is invalid. Please, check if all layers have the same number of blocks");
    }

    // func@: Get assets by type
    const gt = a => Object.values(gameAssets).filter(io => io.type === a);

    // Load single models
    for(let ma of gt("LOADABLE_MODEL")) {
        ma.output = loadImage(ma.murl);
    }

    // Load images pack without keys
    for(let ma of gt("LOADABLE_NOKEYS_MODELS_PACK")) {
        ma.output = [];
        for(let mk of ma.murl) ma.output.push(loadImage(mk));
    }
}

function setup() {
    createCanvas(gameInfo.canvas.width, gameInfo.canvas.height);
    frameRate(60);
}

function draw() {
    background(0);

    // Draw map // TODO: Use classes
    map.slice().reverse().forEach((ma, iy) => {
        ma.forEach((mk, ix) => {
            const s = gameInfo.blockSize;

            if(mk === 1) {
                image(
                    Object.values(gameAssets)[0].output,
                    ix * s,
                    innerHeight - (iy + 1) * s,
                    s,
                    s
                );
            }
        });
    });
}