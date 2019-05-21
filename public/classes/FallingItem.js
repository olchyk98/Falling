class FallingItem extends Obstacle { // Food, Obstacle
    constructor(w, h, x, y, s, t, m, id) {
        super(w, h, x, y);

        this.id = id; // id in c-array

        this.speed = s;
        this.gravity = .2; // LEVELING
        this.velocity = 0;

        this.type = t; // "OBSTACLE", "FOOD"
        this.model = m;

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
        if(this.type === "OBSTACLE") {
            this.velocity += this.gravity;
            this.pos.y += this.speed + this.velocity;

            if(this.pos.y > innerHeight) {
                const a = window.gameInfo.activeObjects.fallingItems;
                a.splice(a.findIndex(io => io.id === this.id), 1);
            }
        } else if(this.type === "FOOD") {
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

    setPotential(s) {
        this.potential = s;

        if(!s && this.type === "FOOD") { // Destroy food without potential
            const _a = window.gameInfo.activeObjects.fallingItems;
            _a.splice(_a.findIndex(io => io.id === this.id), 1);
        }
    }
}