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
const gameInfo = window.gameInfo = {}

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
]

function preload() {
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

    // ...
}