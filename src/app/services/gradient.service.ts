import {Color} from "./color";

export class GradientService {
    private readonly specterWidth = 924;
    private readonly greenSpecterWidth = 206;
    private readonly yellowSpecterWidth = 256;
    private readonly orangeSpecterWidth = 256;
    private readonly redSpecterWidth = 206;
    constructor(private maxColorsCount: number) {

    }

    getColor (colorNumber: number) {
        let specterNumber = this.specterWidth / this.maxColorsCount * colorNumber;
        if(specterNumber <= this.greenSpecterWidth) {
            return {
                alpha: 0,
                blue: 0,
                red: 0,
                green: specterNumber + 256 - this.greenSpecterWidth
            }
        } else if (specterNumber <= this.greenSpecterWidth + this.yellowSpecterWidth) {
            return {
                alpha: 0,
                blue: 0,
                red: specterNumber - this.greenSpecterWidth + 256 - this.yellowSpecterWidth,
                green: 255
            }
        } else if (specterNumber <=this.greenSpecterWidth + this.yellowSpecterWidth + this.orangeSpecterWidth) {
            return {
                alpha: 0,
                blue: 0,
                red: 255,
                green: 255 + this.greenSpecterWidth + this.yellowSpecterWidth - specterNumber +256 - this.orangeSpecterWidth
            }
        } else {
            return {
                alpha: 0,
                blue: 0,
                red: 255 + this.greenSpecterWidth + this.yellowSpecterWidth + this.orangeSpecterWidth - specterNumber + 1,
                green: 0
            }
        }
    }
}