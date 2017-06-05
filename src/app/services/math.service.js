"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathService = (function () {
    function MathService() {
    }
    MathService.getRad = function (deg) {
        return deg * Math.PI / 180;
    };
    MathService.getDeg = function (rad) {
        return rad * 180 / Math.PI;
    };
    MathService.getTangensByDegree = function (angle) {
        return Math.tan(MathService.getRad(angle));
    };
    MathService.getSinByDegree = function (angle) {
        return Math.sin(MathService.getRad(angle));
    };
    MathService.getCosByDegree = function (angle) {
        return Math.cos(MathService.getRad(angle));
    };
    MathService.rotatePointAroundCenter = function (x, y, angle) {
        var rotatedPoint = { x: x, y: y };
        rotatedPoint.x = MathService.getCosByDegree(angle) * x - MathService.getSinByDegree(angle) * y;
        rotatedPoint.y = MathService.getSinByDegree(angle) * x + MathService.getCosByDegree(angle) * y;
        return rotatedPoint;
    };
    return MathService;
}());
exports.MathService = MathService;
//# sourceMappingURL=math.service.js.map