"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_object_view_1 = require("./map-object-view");
var direction_1 = require("../direction");
var math_service_1 = require("../../services/math.service");
var MapObjectController = (function () {
    function MapObjectController(object, canvasContext) {
        this.object = object;
        this.view = new map_object_view_1.MapObjectView(canvasContext, this.object);
        this.view.render();
    }
    MapObjectController.prototype.move = function (x, y) {
        this.object.geolocation.x = x;
        this.object.geolocation.y = y;
        this.view.render();
    };
    MapObjectController.prototype.setCanvasContext = function (canvasContext) {
        this.view.canvasContext = canvasContext;
    };
    MapObjectController.prototype.rotate = function (angle) {
        this.object.geolocation.angle = angle;
        this.view.render();
    };
    MapObjectController.prototype.getWheelPosition = function (verticalDirection, horizontalDirection, angle) {
        var geolocation = this.object.geolocation;
        var size = this.object.size;
        var x = -size / 2;
        var y = -size / 2;
        angle = angle || geolocation.angle;
        if (verticalDirection === direction_1.Direction.back)
            y *= -1;
        if (horizontalDirection === direction_1.Direction.right)
            x *= -1;
        var rotatedPoint = math_service_1.MathService.rotatePointAroundCenter(x, y, angle);
        rotatedPoint.x += geolocation.x;
        rotatedPoint.y += geolocation.y;
        rotatedPoint.x = Math.round(rotatedPoint.x * 1000) / 1000;
        rotatedPoint.y = Math.round(rotatedPoint.y * 1000) / 1000;
        return rotatedPoint;
    };
    MapObjectController.prototype.getWheelsPosition = function (angle) {
        var wheelsPosition = [];
        angle = angle || this.object.geolocation.angle;
        wheelsPosition.push({
            position: this.getWheelPosition(direction_1.Direction.forward, direction_1.Direction.left, angle),
            horizontalDirection: direction_1.Direction.left,
            verticalDirection: direction_1.Direction.forward
        });
        wheelsPosition.push({
            position: this.getWheelPosition(direction_1.Direction.forward, direction_1.Direction.right, angle),
            horizontalDirection: direction_1.Direction.right,
            verticalDirection: direction_1.Direction.forward
        });
        wheelsPosition.push({
            position: this.getWheelPosition(direction_1.Direction.back, direction_1.Direction.left, angle),
            horizontalDirection: direction_1.Direction.left,
            verticalDirection: direction_1.Direction.back
        });
        wheelsPosition.push({
            position: this.getWheelPosition(direction_1.Direction.back, direction_1.Direction.right, angle),
            horizontalDirection: direction_1.Direction.right,
            verticalDirection: direction_1.Direction.back
        });
        return wheelsPosition;
    };
    return MapObjectController;
}());
exports.MapObjectController = MapObjectController;
//# sourceMappingURL=map-object-controller.js.map