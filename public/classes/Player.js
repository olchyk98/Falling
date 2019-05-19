class Player {
    constructor(x, y) {
        const bs = window.gameInfo.blockSize;

        this.jumpHeight = bs,
        this.health = 100;

        // Pos
        this.pos = {
            x, y
        }

        // Dims
        this.dims = {
            width: .95 * bs,
            height: 1.3 * bs
        }

        // View
        this.models = window.gameAssets["PLAYER"].output;
        this.currentModels = this.models["IDLE"];
        this.currentFrame = 0;

        // Blocks and Player have different values of gravity
        this.velocity = 0;
        this.gravity = 5;
    }

    render() {
        image(
            this.currentModels[this.currentFrame],
            this.pos.x,
            this.pos.y,
            this.dims.width,
            this.dims.height
        );

        return this;
    }

    update() {
        // this.nextFrame();

        return this;
    }

    nextFrame() {
        if(++this.currentFrame > this.currentModels.length) {
            this.currentFrame = 0;
        }

        return this;
    }
}