"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_service_1 = require("./math.service");
var direction_1 = require("../map/direction");
var SquareMathService = (function () {
    function SquareMathService() {
    }
    SquareMathService.getVertex = function (square, verticalDirection, horizontalDirection) {
        var center = square.cenrer;
        var size = square.size;
        var x = horizontalDirection === direction_1.Direction.right ? (size / 2) : (-(size / 2));
        var y = verticalDirection === direction_1.Direction.back ? (size / 2) : (-(size / 2));
        var angle = square.angle;
        var rotatedPoint = math_service_1.MathService.rotatePointAroundCenter(x, y, angle);
        rotatedPoint.x += center.x;
        rotatedPoint.y += center.y;
        rotatedPoint.x = Math.round(rotatedPoint.x * 1000) / 1000;
        rotatedPoint.y = Math.round(rotatedPoint.y * 1000) / 1000;
        return rotatedPoint;
    };
    SquareMathService.getVertices = function (square) {
        var vertices = [];
        var squareMathService = this;
        vertices.push({
            position: squareMathService.getVertex(square, direction_1.Direction.forward, direction_1.Direction.left),
            horizontalDirection: direction_1.Direction.left,
            verticalDirection: direction_1.Direction.forward
        });
        vertices.push({
            position: squareMathService.getVertex(square, direction_1.Direction.forward, direction_1.Direction.right),
            horizontalDirection: direction_1.Direction.right,
            verticalDirection: direction_1.Direction.forward
        });
        vertices.push({
            position: squareMathService.getVertex(square, direction_1.Direction.back, direction_1.Direction.left),
            horizontalDirection: direction_1.Direction.left,
            verticalDirection: direction_1.Direction.back
        });
        vertices.push({
            position: squareMathService.getVertex(square, direction_1.Direction.back, direction_1.Direction.right),
            horizontalDirection: direction_1.Direction.right,
            verticalDirection: direction_1.Direction.back
        });
        return vertices;
    };
    SquareMathService.isIntersect = function (square1, square2) {
        var vertices1 = this.getVertices(square1).map(function (vertex) { return [vertex.position.x, vertex.position.y]; });
        var vertices2 = this.getVertices(square2).map(function (vertex) { return [vertex.position.x, vertex.position.y]; });
        var isIntersect = window['rectanglesIntersect'](vertices1, vertices2);
        return isIntersect;
    };
    return SquareMathService;
}());
exports.default = SquareMathService;
//# sourceMappingURL=square-math.service.js.map