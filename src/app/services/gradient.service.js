"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GradientService = (function () {
    function GradientService(maxColorsCount) {
        this.maxColorsCount = maxColorsCount;
        this.specterWidth = 924;
        this.greenSpecterWidth = 206;
        this.yellowSpecterWidth = 256;
        this.orangeSpecterWidth = 256;
        this.redSpecterWidth = 206;
    }
    GradientService.prototype.getColor = function (colorNumber) {
        var specterNumber = this.specterWidth / this.maxColorsCount * colorNumber;
        if (specterNumber <= this.greenSpecterWidth) {
            return {
                alpha: 0,
                blue: 0,
                red: 0,
                green: specterNumber + 256 - this.greenSpecterWidth
            };
        }
        else if (specterNumber <= this.greenSpecterWidth + this.yellowSpecterWidth) {
            return {
                alpha: 0,
                blue: 0,
                red: specterNumber - this.greenSpecterWidth + 256 - this.yellowSpecterWidth,
                green: 255
            };
        }
        else if (specterNumber <= this.greenSpecterWidth + this.yellowSpecterWidth + this.orangeSpecterWidth) {
            return {
                alpha: 0,
                blue: 0,
                red: 255,
                green: 255 + this.greenSpecterWidth + this.yellowSpecterWidth - specterNumber + 256 - this.orangeSpecterWidth
            };
        }
        else {
            return {
                alpha: 0,
                blue: 0,
                red: 255 + this.greenSpecterWidth + this.yellowSpecterWidth + this.orangeSpecterWidth - specterNumber + 1,
                green: 0
            };
        }
    };
    return GradientService;
}());
exports.GradientService = GradientService;
//# sourceMappingURL=gradient.service.js.map