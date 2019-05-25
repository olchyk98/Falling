class FallingItem extends Obstacle { // Food, Obstacle
    constructor(w, h, x, y, s, t, m, id) {
        super(w, h, x, y);

        this.id = id; // id in c-array

        this.speed = this.speedD = s;
        this.gravity = this.gravityD = .2; // LEVELING
        this.velocity = 0;

        this.type = t; // "OBSTACLE", "POINTS"
        this.model = m;

        this.slowMotion = false;
        this.potential = true;

        if(this.type === "OBSTACLE") {
            this.damage = 40; // LEVELING
        }
    }

    render() {
        image(
            this.model,
            this.pos.x,
            this.pos.y,
            this.dims.width,
            this.dims.height
        );

        return this;
    }

    update() {
        if(window.gameInfo.slowFallingObjects) {
            if(!this.slowMotion) {
                this.slowMotion = true;
                this.speed = this.speed - this.speed / 100 * window.gameInfo.slowFallingObjects;
            }
            this.gravity = this.velocity = 0;
        } else if(this.speed !== this.speedD) {
            this.slowMotion = false;
            this.speed = this.speedD;
            this.gravity = this.gravityD;
        }

        if(this.type === "OBSTACLE") {
            this.velocity += this.gravity;
            this.pos.y += this.speed + this.velocity;

            if(this.pos.y > innerHeight) {
                const a = window.gameInfo.activeObjects.fallingItems;
                a.splice(a.findIndex(io => io.id === this.id), 1);
            }
        } else if(this.type === "POINTS") {
            const nextVelocity = this.velocity + this.gravity,
                  nextY = this.pos.y + this.speed + nextVelocity;
            let nextYAllowed = true;

            window.liveMap.flat().filter(io => io).forEach(io => {
                // Test for Y
                if(nextYAllowed && io.checkTouch(
                    this.pos.x,
                    nextY,
                    this.dims.width,
                    this.dims.height
                )) {
                    nextYAllowed = false;
                }
            });

            if(nextYAllowed) {
                this.velocity = nextVelocity;
                this.pos.y = nextY;
            }
        } else {
            console.error("Invalid fallingItem type value!");
        }

        return this;
    }

    setPotential(s, fd) { // @s - new potential, @fd - force remove
        this.potential = s;

        if((!s && this.type === "POINTS") || fd) { // Destroy food without potential
            const _a = window.gameInfo.activeObjects.fallingItems;
            _a.splice(_a.findIndex(io => io.id === this.id), 1);
        }
    }
}