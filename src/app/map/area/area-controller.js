"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var area_1 = require("./area");
var area_view_1 = require("./area-view");
var rock_controller_1 = require("./rock/rock-controller");
var AreaController = (function () {
    function AreaController(width, length, canvasContext, maxHeight, layersCount) {
        this.width = width;
        this.length = length;
        this.canvasContext = canvasContext;
        this.maxHeight = maxHeight;
        this.layersCount = layersCount;
        this.rocks = [];
        this.area = new area_1.Area(width, length);
        this.areaView = new area_view_1.AreaView(this.area, this.canvasContext, this.maxHeight / this.layersCount, this.layersCount);
    }
    ;
    AreaController.prototype.setCanvasContext = function (canvasContext) {
        this.canvasContext = canvasContext;
        this.areaView.setCanvasContext(canvasContext);
    };
    AreaController.prototype.setBlock = function (row, col, block) {
        this.area.setBlock(row, col, block);
    };
    AreaController.prototype.updateView = function (coordinates) {
        this.areaView.update(coordinates);
    };
    AreaController.prototype.redraw = function () {
        this.areaView.redraw();
    };
    AreaController.prototype.popRock = function () {
        this.deleteRock(this.rocks.pop());
    };
    AreaController.prototype.deleteRock = function (rockController) {
        if (rockController) {
            var rock = rockController.rock;
            var coordinates = [];
            for (var i = rock.y; i < rock.size + rock.y; i++)
                for (var j = rock.x; j < rock.size + rock.x; j++) {
                    coordinates.push({ row: i, col: j });
                    this.setBlock(i, j, {
                        height: 0,
                        resistance: 0
                    });
                }
            this.updateView(coordinates);
        }
    };
    AreaController.prototype.addRock = function (rock) {
        var rockController = new rock_controller_1.RockController(rock);
        this.rocks.push(rockController);
        var rockHeightMap = rockController.getRockMap();
        var newBlocksCoordinates = [];
        for (var i = rock.y; i < rock.size + rock.y; i++)
            for (var j = rock.x; j < rock.size + rock.x; j++) {
                newBlocksCoordinates.push({ row: i, col: j });
                this.setBlock(i, j, {
                    height: rockHeightMap[i - rock.y][j - rock.x],
                    resistance: rock.resistance
                });
            }
        this.updateView(newBlocksCoordinates);
    };
    return AreaController;
}());
exports.AreaController = AreaController;
//# sourceMappingURL=area-controller.js.map