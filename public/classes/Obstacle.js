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

    checkTouch(tX, tY, tH, tW) {
        // ...
    }
}