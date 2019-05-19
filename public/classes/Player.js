class Player {
    constructor(x, y) {
        const bs = window.gameInfo.blockSize;

        this.jumpHeight = 20;
        this.movspeed = 10;

        this.health = 100;

        // Pos
        this.pos = {
            x,
            y
        }

        // Dims
        this.dims = {
            width: .9 * bs,
            height: 1.3 * bs
        }

        // View
        this.models = window.gameAssets["PLAYER"].output;
        this.currentModels = "IDLE";
        this.currentFrame = 0;
        this.framesToUpdate = this.framesToUpdateD = 10; // time to frame update & default

        // Blocks and Player have different values of gravity
        this.velocity = 0;
        this.gravity = .75;
    }

    render() {
        image(
            this.models[this.currentModels][this.currentFrame],
            this.pos.x,
            this.pos.y,
            this.dims.width,
            this.dims.height
        );

        return this;
    }

    update() {
        if (--this.framesToUpdate <= 0) {
            this.framesToUpdate = this.framesToUpdateD;
            this.nextFrame();
        }

        const nextVelocity = this.velocity + this.gravity,
            nextY = this.pos.y + this.velocity + this.gravity;
        let yAllowed = true,
            xAllowed = true,
            nextX = this.pos.x;

        if (window.pressedKeys[65]) {
            nextX -= this.movspeed
        } else if (window.pressedKeys[68]) {
            nextX += this.movspeed
        }

        [
            ...window.liveMap.flat().filter(io => io)
        ].forEach(io => {
            // Y
            if (io.checkTouch(
                    this.pos.x,
                    nextY,
                    this.dims.width,
                    this.dims.height
                )) {
                if (yAllowed) yAllowed = false;
            }

            // X
            if (io.checkTouch(
                    nextX,
                    this.pos.y,
                    this.dims.width,
                    this.dims.height
                )) {
                if (xAllowed) xAllowed = false;
            }
        });

        if (yAllowed) {
            this.velocity = nextVelocity;
            this.pos.y = nextY;
        } else {
            this.velocity = 0;
        }

        if (xAllowed && nextX + this.dims.width < innerWidth && nextX > 0) {
            this.pos.x = nextX;
        }

        this.updateModel();
        return this;
    }

    jump() {
        if (this.velocity) return;

        this.velocity = -this.jumpHeight;
    }

    updateModel() {
        let a = this.currentModels;

        if (this.velocity) {
            this.currentModels = "JUMP";
        } else {
            this.currentModels = "IDLE";
        }

        if (this.currentModels !== a) {
            this.currentFrame = 0;
            this.framesToUpdate = this.framesToUpdateD;
        }

        return a;
    }

    nextFrame() {
        if (++this.currentFrame > this.models[this.currentModels].length - 1) {
            this.currentFrame = 0;
        }

        return this;
    }
}