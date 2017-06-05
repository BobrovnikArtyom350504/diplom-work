"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Area = (function () {
    function Area(width, length, blocks) {
        if (width === void 0) { width = 100; }
        if (length === void 0) { length = 100; }
        this.width = width;
        this.length = length;
        this.blocks = [];
        if (blocks)
            this.blocks = blocks;
        else
            this.initBlocks();
    }
    Area.prototype.setBlock = function (row, col, block) {
        this.blocks[row][col] = block;
    };
    Area.prototype.getWidth = function () {
        return this.width;
    };
    Area.prototype.getLength = function () {
        return this.length;
    };
    Area.prototype.getBlock = function (row, col) {
        return this.blocks[row][col];
    };
    Area.prototype.initBlocks = function () {
        for (var i = 0; i < this.width; i++) {
            this.blocks[i] = [];
            for (var j = 0; j < this.length; j++)
                this.setBlock(i, j, {
                    resistance: 0.5,
                    height: 0
                });
        }
    };
    return Area;
}());
exports.Area = Area;
//# sourceMappingURL=area.js.map