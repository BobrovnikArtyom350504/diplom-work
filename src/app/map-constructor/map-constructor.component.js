"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var map_1 = require("../map/map");
var map_object_1 = require("../map/map-object/map-object");
var app_state_1 = require("../app-state/app-state");
var MapConstructorComponent = (function () {
    function MapConstructorComponent() {
        this.mapSettingsVisible = true;
        this.mapSettingsEdited = true;
        this.rockConstructorVisible = true;
        this.robotsConstructorVisible = true;
    }
    MapConstructorComponent.prototype.ngAfterViewInit = function () {
        var canvas = this.canvas.nativeElement;
        this.canvasContext = canvas.getContext('2d');
    };
    MapConstructorComponent.prototype.addRobot = function (maxInclineAngle, robotSize, geolocation) {
        maxInclineAngle = +(maxInclineAngle);
        robotSize = +(robotSize);
        geolocation.x = +(geolocation.x);
        geolocation.y = +(geolocation.y);
        geolocation.angle = +(geolocation.angle);
        this.map.addObject(new map_object_1.MapObject(geolocation, maxInclineAngle, robotSize));
    };
    ;
    MapConstructorComponent.prototype.editRobot = function (maxInclineAngle, robotSize, geolocation) {
        maxInclineAngle = +(maxInclineAngle);
        robotSize = +(robotSize);
        geolocation.x = +(geolocation.x);
        geolocation.y = +(geolocation.y);
        this.deleteRobot();
        this.addRobot(maxInclineAngle, robotSize, geolocation);
    };
    MapConstructorComponent.prototype.deleteRobot = function () {
        this.map.popObject();
        this.map.areaController.redraw();
        this.map.objects.forEach(function (object) { return object.view.render(); });
    };
    MapConstructorComponent.prototype.toggleRobotsConstructorVisibility = function () {
        this.robotsConstructorVisible = !this.robotsConstructorVisible;
    };
    MapConstructorComponent.prototype.toggleMapSettingsVisibility = function () {
        this.mapSettingsVisible = !this.mapSettingsVisible;
    };
    MapConstructorComponent.prototype.toggleRockConstructorVisibility = function () {
        this.rockConstructorVisible = !this.rockConstructorVisible;
    };
    MapConstructorComponent.prototype.editRock = function (rock) {
        rock.size = +(rock.size);
        rock.height = +(rock.height);
        rock.angel = +(rock.angel);
        rock.x = +(rock.x);
        rock.y = +(rock.y);
        rock.resistance = +(rock.resistance);
        for (var prop in rock)
            rock[prop] = Number(rock[prop]);
        if (rock.x + rock.size < this.map.areaController.area.getLength() &&
            rock.y + rock.size < this.map.areaController.area.getWidth()) {
            this.map.popRock();
            this.map.addRock(rock);
        }
    };
    MapConstructorComponent.prototype.addRock = function (rock) {
        rock.size = +(rock.size);
        rock.height = +(rock.height);
        rock.angel = +(rock.angel);
        rock.x = +(rock.x);
        rock.y = +(rock.y);
        rock.resistance = +(rock.resistance);
        for (var prop in rock)
            rock[prop] = Number(rock[prop]);
        this.map.addRock(rock);
    };
    MapConstructorComponent.prototype.deleteRock = function () {
        this.map.popRock();
    };
    MapConstructorComponent.prototype.clearCanvas = function () {
        var canvas = this.canvasContext.canvas;
        this.canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    };
    MapConstructorComponent.prototype.createMap = function (width, length, maxHeight, layersCount) {
        width = +(width);
        length = +(length);
        maxHeight = +(maxHeight);
        layersCount = +(layersCount);
        this.width = Math.floor(width);
        this.length = Math.floor(length);
        this.maxHeight = maxHeight;
        this.layersCount = layersCount;
        this.clearCanvas();
        this.map = new map_1.Map(this.width, this.length, this.maxHeight, this.layersCount, this.canvasContext);
        app_state_1.default.map = this.map;
    };
    MapConstructorComponent.prototype.getMapData = function () {
        var map = this.map.getSettings();
        var rocks = this.map.getRocks();
        var mapData = {
            map: map,
            rocks: rocks
        };
        return mapData;
    };
    MapConstructorComponent.prototype.saveMap = function (linkReference) {
        var data = JSON.stringify(this.getMapData());
        var file = new Blob([data], { type: "application/json" });
        var fileName = "map.json";
        linkReference.href = URL.createObjectURL(file);
        linkReference.download = fileName;
        linkReference.click();
    };
    MapConstructorComponent.prototype.triggerUpload = function (uploaderElement) {
        uploaderElement.click();
    };
    MapConstructorComponent.prototype.handleMapJsonFile = function (file) {
        var _this = this;
        var fileReader = new FileReader();
        fileReader.onload = (function (event) {
            _this.importMapData(JSON.parse(event.target.result));
        });
        fileReader.readAsText(file);
    };
    MapConstructorComponent.prototype.importMapData = function (mapData) {
        var _this = this;
        this.createMap(mapData.map.width, mapData.map.length, mapData.map.maxHeight, mapData.map.layersCount);
        mapData.rocks.forEach(function (rock) {
            _this.addRock(rock);
        });
    };
    MapConstructorComponent.prototype.saveRobotsConfig = function (linkReference) {
        var data = JSON.stringify(this.map.getObjects());
        var file = new Blob([data], { type: "application/json" });
        var fileName = "robots.json";
        linkReference.href = URL.createObjectURL(file);
        linkReference.download = fileName;
        linkReference.click();
    };
    MapConstructorComponent.prototype.handleRobotsJsonFile = function (file) {
        var _this = this;
        var fileReader = new FileReader();
        fileReader.onload = (function (event) {
            _this.importRobotsData(JSON.parse(event.target.result));
        });
        fileReader.readAsText(file);
    };
    MapConstructorComponent.prototype.importRobotsData = function (robots) {
        var _this = this;
        robots.forEach(function (robot) {
            _this.addRobot(robot.maxInclineAngle, robot.size, robot.geolocation);
        });
    };
    return MapConstructorComponent;
}());
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", Object)
], MapConstructorComponent.prototype, "canvas", void 0);
MapConstructorComponent = __decorate([
    core_1.Component({
        templateUrl: './map-constructor.component.html',
        styleUrls: ['./map-constructor.component.css']
    })
], MapConstructorComponent);
exports.MapConstructorComponent = MapConstructorComponent;
//# sourceMappingURL=map-constructor.component.js.map