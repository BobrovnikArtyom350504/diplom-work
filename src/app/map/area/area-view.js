"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitmap_service_1 = require("../../services/bitmap.service");
var gradient_service_1 = require("../../services/gradient.service");
var AreaView = (function () {
    function AreaView(area, canvasContext, layerHeight, layersCount) {
        this.area = area;
        this.canvasContext = canvasContext;
        this.layerHeight = layerHeight;
        this.layersCount = layersCount;
        this.bitmapService = new bitmap_service_1.BitmapService(this.area.getLength(), this.area.getWidth());
        this.gradientService = new gradient_service_1.GradientService(layersCount);
        this.initBitmap();
        this.render();
    }
    AreaView.prototype.setCanvasContext = function (canvasContext) {
        this.canvasContext = canvasContext;
    };
    AreaView.prototype.render = function () {
        var imageData = new ImageData(this.bitmapService.getBitmap(), this.area.getLength(), this.area.getWidth());
        this.imageData = imageData;
        var canvas = this.canvasContext.canvas;
        this.canvasContext.putImageData(imageData, 0, 0);
        this.canvasContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    };
    AreaView.prototype.redraw = function () {
        this.canvasContext.putImageData(this.imageData, 0, 0);
        var canvas = this.canvasContext.canvas;
        this.canvasContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    };
    AreaView.prototype.update = function (coordinates) {
        var _this = this;
        coordinates.forEach(function (coordinate) { return _this.bitmapService.setColor(coordinate.row, coordinate.col, _this.gradientService.getColor(Math.floor(_this.area.getBlock(coordinate.row, coordinate.col).height / _this.layerHeight))); });
        this.render();
    };
    AreaView.prototype.initBitmap = function () {
        for (var i = 0; i < this.area.getWidth(); i++)
            for (var j = 0; j < this.area.getLength(); j++) {
                this.bitmapService.setColor(i, j, this.gradientService.getColor(Math.floor(this.area.getBlock(i, j).height / this.layerHeight)));
            }
    };
    return AreaView;
}());
exports.AreaView = AreaView;
//# sourceMappingURL=area-view.js.map