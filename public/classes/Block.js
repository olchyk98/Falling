window.Block = class Block extends Obstacle {
    constructor(m, x, y, w, h = null, ta) {
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

        if(ta) this.touchAction = ta;
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