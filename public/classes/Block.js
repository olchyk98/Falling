window.Block = class Block extends Obstacle {
    constructor(m, x, y, w, h = null) {
        let hAuto = h === "AUTO";

        if (hAuto) {
            h = m.height / m.width * w
        }

        super( // > this.dims, this.pos
            w,
            h || w,
            x,
            (!hAuto) ? y : y + (window.gameInfo.blockSize - h)
        );

        this.hAuto = hAuto;
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