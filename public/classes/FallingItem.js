class FallingItem extends Obstacle { // Food, Obstacle
    constructor(w, h, x, y, s, t, m) {
        super(w, h, x, y);

        this.speed = s;
        this.gravity = .2; /* LEVEL */
        this.velocity = 0;

        this.type = t; // "OBSTACLE", "FOOD"
        this.model = m;
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
        this.velocity += this.gravity;
        this.pos.y += this.speed + this.velocity;

        return this;
    }
}