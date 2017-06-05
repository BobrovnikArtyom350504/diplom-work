"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_service_1 = require("../../../services/math.service");
var RockController = (function () {
    function RockController(rock) {
        this.rock = rock;
        this.initRockHeightMap();
        this.calcRockMap();
    }
    RockController.prototype.setRock = function (rock) {
        this.rock = rock;
        this.initRockHeightMap();
        this.calcRockMap();
    };
    RockController.prototype.getRockMap = function () {
        return this.rockHeightMap;
    };
    RockController.prototype.initRockHeightMap = function () {
        this.rockHeightMap = [];
        for (var i = 0; i < this.rock.size; i++)
            this.rockHeightMap[i] = [];
    };
    RockController.prototype.setRectBorder = function (size, height) {
        var startPosition = (this.rock.size - size) / 2;
        var endPosition = startPosition + size - 1;
        for (var i = startPosition; i <= endPosition; i++) {
            this.rockHeightMap[startPosition][i] = height;
            this.rockHeightMap[endPosition][i] = height;
            this.rockHeightMap[i][startPosition] = height;
            this.rockHeightMap[i][endPosition] = height;
        }
    };
    RockController.prototype.setRect = function (size, height) {
        var startPosition = (this.rock.size - size) / 2;
        var endPosition = startPosition + size - 1;
        for (var i = startPosition; i <= endPosition; i++)
            for (var j = startPosition; j <= endPosition; j++)
                this.rockHeightMap[i][j] = height;
    };
    RockController.prototype.calcRockMap = function () {
        var offset = 0;
        for (var i = Math.round(this.rock.size / 2); i > 0; i--) {
            var height = (offset / 2) * math_service_1.MathService.getTangensByDegree(this.rock.angel);
            if (offset === 0 && this.rock.angel === 90)
                height = this.rock.height;
            if (height < this.rock.height)
                this.setRectBorder(this.rock.size - offset, height);
            else {
                this.setRect(this.rock.size - offset, this.rock.height);
                break;
            }
            offset += 2;
        }
    };
    return RockController;
}());
exports.RockController = RockController;
//# sourceMappingURL=rock-controller.js.map