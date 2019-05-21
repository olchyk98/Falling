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

        this.dirX = -1;
        this.movementX = false;

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
        const m = this.models[this.currentModels][this.currentFrame];

        if(this.dirX === -1) {
            image(
                m,
                this.pos.x,
                this.pos.y,
                this.dims.width,
                this.dims.height
            );
        } else if(this.dirX === 1) {
            push();
                translate(
                    m.width + this.pos.x + this.dims.width / 2,
                    this.pos.y
                );
                scale(-1, 1);
                image(
                    m,
                    0,
                    0,
                    this.dims.width,
                    this.dims.height
                );
            pop();
        } else {
            console.error("Invalid dirX value");
        }

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
            nextX = this.pos.x - (this.movementX ? this.dirX * this.movspeed : 0);

        [
            ...window.liveMap.flat().filter(io => io),
            ...window.gameInfo.activeObjects.fallingItems.filter(io => io instanceof Obstacle)
        ].forEach(io => {
            // Y
            if (io.checkTouch(
                    this.pos.x,
                    nextY,
                    this.dims.width,
                    this.dims.height
                )) {
                if(io instanceof Block) {
                    if(yAllowed) yAllowed = false;
                } else if(io instanceof FallingItem) {
                    if(io.type === "OBSTACLE") { // dead
                        this.damage(io.damage);
                    } else if(io.type === "FOOD") { // more food
                        console.log("MORE FOOD");
                    }
                }
            }

            // X
            if (xAllowed && io instanceof Block && io.checkTouch(
                    nextX,
                    this.pos.y,
                    this.dims.width,
                    this.dims.height
                )) {
                xAllowed = false;
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

    setDir(d, a) {
        this.movementX = a;
        this.dirX = {
            "LEFT": -1,
            "RIGHT": 1
        }[d] || 0;
    }

    damage() {
        console.log("DAMAGE");
    }

    updateModel() {
        let a = this.currentModels;

        if (this.velocity) {
            this.currentModels = "JUMP";
        } else if(this.movementX) {
            this.currentModels = "RUN";
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