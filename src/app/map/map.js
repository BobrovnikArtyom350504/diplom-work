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
    Map.prototype.getSettings = function () {
        var map = this;
        var settings = {
            width: map.width,
            length: map.length,
            maxHeight: map.maxHeight,
            layersCount: map.layerNumber
        };
        return settings;
    };
    Map.prototype.getRocks = function () {
        var rocks = this.areaController.getRocks();
        return rocks;
    };
    Map.prototype.getObjects = function () {
        var objects = this.objects.map(function (objectController) { return objectController.object; });
        return objects;
    };
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=map.js.map