"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_service_1 = require("../services/math.service");
var MapApi = (function () {
    function MapApi(map) {
        this.map = map;
    }
    MapApi.prototype.move = function (id, speed) {
        debugger;
        var position = this.getMaxPosition(id, speed);
        this.map.areaController.redraw();
        this.map.objects[id].move(position.x, position.y);
    };
    MapApi.prototype.getMaxPosition = function (id, speed) {
        var object = this.map.objects[id].object;
        var angle = object.geolocation.angle;
        var maxInclineAngle = object.maxInclineAngle;
        var position = {
            x: object.geolocation.x,
            y: object.geolocation.y
        };
        var offsetX = Math.round(math_service_1.MathService.getSinByDegree(angle) * 1000) / 1000;
        var offsetY = Math.round(-math_service_1.MathService.getCosByDegree(angle) * 1000) / 1000;
        var pixels = 1;
        var smth = speed;
        while (smth > 0) {
            if (this.isInMap(id, angle, offsetX * pixels, offsetY * pixels)) {
                // console.log(Math.floor(position.y))
                var resistance = this.getBlock(Math.floor(position.y), Math.floor(position.x)).resistance;
                if (resistance === 0)
                    smth -= 1;
                else
                    smth -= 1 / resistance;
                if (smth >= 0) {
                    if (this.getInclineAngle(id, angle, offsetX * pixels, offsetY * pixels) < maxInclineAngle) {
                        position.y += offsetY;
                        position.x += offsetX;
                        pixels++;
                    }
                    else {
                        return position;
                    }
                }
            }
            else {
                return position;
            }
        }
        return position;
    };
    MapApi.prototype.isInMap = function (id, angle, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        angle = angle || this.map.objects[id].object.geolocation.angle;
        var wheels = this.map.objects[id].getWheelsPosition(angle);
        wheels.forEach(function (wheel) {
            wheel.position.x += offsetX;
            wheel.position.y += offsetY;
        });
        for (var _i = 0, wheels_1 = wheels; _i < wheels_1.length; _i++) {
            var wheel = wheels_1[_i];
            if (wheel.position.x < 0 ||
                wheel.position.x >= this.map.areaController.area.getLength() ||
                wheel.position.y < 0 ||
                wheel.position.y >= this.map.areaController.area.getWidth()) {
                return false;
            }
        }
        return true;
    };
    MapApi.prototype.rotate = function (id, angle) {
        var wheels = this.map.objects[id].getWheelsPosition(angle);
        var isValidRotate = true;
        if (!this.isInMap(id, angle))
            isValidRotate = false;
        if (this.getInclineAngle(id, angle) > this.map.objects[id].object.maxInclineAngle)
            isValidRotate = false;
        if (isValidRotate) {
            this.map.areaController.redraw();
            this.map.objects[id].rotate(angle);
        }
    };
    MapApi.prototype.getBlock = function (row, col) {
        return this.map.areaController.area.getBlock(row, col);
    };
    MapApi.prototype.getInclineAngle = function (id, angle, offsetX, offsetY) {
        var _this = this;
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        angle = angle || this.map.objects[id].object.geolocation.angle;
        var wheels = this.map.objects[id].getWheelsPosition(angle);
        wheels.forEach(function (wheel) {
            wheel.position.x += offsetX;
            wheel.position.y += offsetY;
        });
        var bottomWheel = wheels[0];
        var topWheel = wheels[0];
        var bottom = this.getBlock(Math.floor(bottomWheel.position.y), Math.floor(bottomWheel.position.x)).height;
        var top = bottom;
        wheels.forEach(function (wheel) {
            var row = Math.floor(wheel.position.y);
            var col = Math.floor(wheel.position.x);
            var height = _this.getBlock(row, col).height;
            if (height < bottom) {
                bottom = height;
                bottomWheel = wheel;
            }
            if (height > top) {
                top = height;
                topWheel = wheel;
            }
        });
        var inclineAngle = 0;
        if (bottomWheel.verticalDirection === topWheel.verticalDirection ||
            bottomWheel.horizontalDirection === topWheel.horizontalDirection)
            inclineAngle = math_service_1.MathService.getDeg(Math.asin((top - bottom) / this.map.objects[id].object.size));
        else
            inclineAngle = math_service_1.MathService.getDeg(Math.asin((top - bottom) / Math.sqrt(2) * this.map.objects[id].object.size));
        return inclineAngle;
    };
    return MapApi;
}());
exports.MapApi = MapApi;
//# sourceMappingURL=map-api.js.map