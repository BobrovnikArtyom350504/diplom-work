"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var area_controller_1 = require("./area/area-controller");
var map_object_controller_1 = require("./map-object/map-object-controller");
var Map = (function () {
    function Map(width, length, maxHeight, layerNumber, canvasContext) {
        this.width = width;
        this.length = length;
        this.maxHeight = maxHeight;
        this.layerNumber = layerNumber;
        this.canvasContext = canvasContext;
        this.objects = [];
        this.areaController = new area_controller_1.AreaController(this.width, this.length, this.canvasContext, this.maxHeight, layerNumber);
    }
    Map.prototype.setCanvasContext = function (canvasContext) {
        this.canvasContext = canvasContext;
        this.areaController.setCanvasContext(canvasContext);
        this.objects.forEach(function (object) { return object.setCanvasContext(canvasContext); });
    };
    Map.prototype.addRock = function (rock) {
        this.areaController.addRock(rock);
    };
    Map.prototype.popRock = function () {
        this.areaController.popRock();
    };
    Map.prototype.addObject = function (object) {
        var controller = new map_object_controller_1.MapObjectController(object, this.canvasContext);
        this.objects.push(controller);
        return (this.objects.length - 1);
    };
    Map.prototype.popObject = function () {
        this.objects.pop();
    };
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=map.js.map