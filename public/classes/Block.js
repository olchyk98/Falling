window.Block = window.Spikes = class Block extends Obstacle {
    constructor(m, x, y, s) {
        super(s, s, x, y); // > this.dims, this.pos

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
}