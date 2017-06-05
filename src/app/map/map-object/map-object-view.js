"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math_service_1 = require("../../services/math.service");
var MapObjectView = (function () {
    function MapObjectView(canvasContext, object) {
        this.canvasContext = canvasContext;
        this.object = object;
        this.frontMarkSize = 2;
    }
    MapObjectView.prototype.initObjectPaint = function () {
        this.canvasContext.strokeStyle = '#ffffff';
        this.canvasContext.fillStyle = '#f4f4f4';
    };
    MapObjectView.prototype.initFrontMarkPaint = function () {
        this.canvasContext.fillStyle = 'black';
    };
    MapObjectView.prototype.drawObject = function () {
        this.initObjectPaint();
        var margin = -this.object.size / 2;
        this.canvasContext.strokeRect(margin, margin, this.object.size, this.object.size);
        this.canvasContext.fillRect(margin + 1, margin + 1, this.object.size - 2, this.object.size - 2);
    };
    MapObjectView.prototype.drawFrontMark = function () {
        this.initFrontMarkPaint();
        var margin = -this.object.size / 2;
        var x = margin + this.object.size / 2 - this.frontMarkSize / 2;
        var y = margin + 1;
        this.canvasContext.fillRect(x, y, this.frontMarkSize, this.frontMarkSize);
    };
    MapObjectView.prototype.render = function () {
        this.canvasContext.save();
        this.canvasContext.translate(this.object.geolocation.x, this.object.geolocation.y);
        this.canvasContext.rotate(math_service_1.MathService.getRad(this.object.geolocation.angle));
        this.drawObject();
        this.drawFrontMark();
        this.canvasContext.restore();
    };
    return MapObjectView;
}());
exports.MapObjectView = MapObjectView;
//# sourceMappingURL=map-object-view.js.map