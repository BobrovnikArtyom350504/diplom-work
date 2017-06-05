"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BitmapService = (function () {
    function BitmapService(width, height) {
        if (width === void 0) { width = 100; }
        if (height === void 0) { height = 100; }
        this.width = width;
        this.height = height;
        this.bitmap = new Uint8ClampedArray(this.width * this.height * 4);
    }
    BitmapService.prototype.setColor = function (row, col, color) {
        var index = (row * this.width + col) * 4;
        this.bitmap[index] = color.red;
        this.bitmap[++index] = color.green;
        this.bitmap[++index] = color.blue;
        this.bitmap[++index] = 255;
    };
    BitmapService.prototype.getBitmap = function () {
        return this.bitmap;
    };
    return BitmapService;
}());
exports.BitmapService = BitmapService;
//# sourceMappingURL=bitmap.service.js.map