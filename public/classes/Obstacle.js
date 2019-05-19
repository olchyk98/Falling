class Obstacle { // Something that can be touched
    constructor(w, h, x, y) {
        this.dims = {
            width: w,
            height: h
        }
        
        this.pos = {
            x,
            y
        }
    }

    checkTouch(tX, tY, tW, tH) {
        // https://en.wikipedia.org/wiki/Hit-testing //

        if(
            (tX + tW >= this.pos.x && tX <= this.pos.x + this.dims.width) &&
            (tY + tH >= this.pos.y && tY <= this.pos.y + this.dims.height)
        ) {
            return this;
        }

        return false;
    }
}