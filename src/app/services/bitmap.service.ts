import {Color} from "./color";

export  class BitmapService {
    private bitmap: Uint8ClampedArray;
    constructor(
        private width: number = 100,
        private height: number = 100,
    )  {
        this.bitmap = new Uint8ClampedArray(this.width * this.height * 4);
    }

    setColor(row: number, col: number, color: Color) {
        let index = (row * this.width + col) * 4;
        this.bitmap[index]   = color.red    ;
        this.bitmap[++index] = color.green;
        this.bitmap[++index] = color.blue;
        this.bitmap[++index] = 255;
    }

    getBitmap() {
        return this.bitmap;
    }
}