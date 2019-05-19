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
            width: .9 * bs,
            height: 1.2 * bs
        }

        // View
        this.models = window.gameAssets["PLAYER"].output;
        this.currentModels = "IDLE";
        this.currentFrame = 0;
        this.framesToUpdate = this.framesToUpdateD = 10; // time to frame update & default

        // Blocks and Player have different values of gravity
        this.velocity = 0;
        this.gravity = .2;
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
        if(--this.framesToUpdate <= 0) {
            this.framesToUpdate = this.framesToUpdateD;
            this.nextFrame();
        }

        const nextVelocity = this.velocity + this.gravity,
              nextY = this.pos.y + this.velocity + this.gravity,
              nextX = null;
        let   yAllowed = true,
              xAllowed = true;

        [
            ...window.liveMap.flat().filter(io => io)
        ].forEach(io => {
            // Y
            if(io.checkTouch(
                this.pos.x,
                nextY,
                this.dims.width,
                this.dims.height
            )) {
                if(yAllowed) yAllowed = false;
            }
            // // X
        });

        if(yAllowed) {
            this.velocity += this.gravity;
            this.pos.y += this.velocity;
        } else {
            this.velocity = 0;
        }

        this.updateModel();
        return this;
    }

    updateModel() {
        let a = this.currentModels;

        if(this.velocity) {
            this.currentModels = "JUMP";
        } else {
            this.currentModels = "IDLE";   
        }

        if(this.currentModels !== a) {
            this.currentFrame = 0;
            this.framesToUpdate = this.framesToUpdateD;
        }

        return a;
    }

    nextFrame() {
        if(++this.currentFrame > this.models[this.currentModels].length - 1) {
            this.currentFrame = 0;
        }

        return this;
    }
}