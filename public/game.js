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
	0 - void
	1 - grass block
	2 - spikes
*/
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const gameInfo = window.gameInfo = {
    blockSize: window.innerWidth / map[0].length
}

function preload() {
    // Check if map is valid
    {
        let a = map[0].length;
        if( map.filter(io => io.length === a).length !== map.length ) {
            alert("MAP ERROR. CHECK THE CONSOLE");
            throw new Error("Given map is invalid. Please, check if all layers have the same number of blocks");
        }
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
    createCanvas(innerWidth - .5, innerHeight - .5);
    frameRate(60);
}

function draw() {
    background(0);

    // Draw map // TODO: Use classes
    map.forEach((ma, iy) => {
        ma.forEach((mk, ix) => {
            const s = gameInfo.blockSize;

            if(mk === 1) {
                image(
                    Object.values(gameAssets)[0].output,
                    ix * s,
                    iy * s,
                    s,
                    s
                );
            }
        });
    });
}