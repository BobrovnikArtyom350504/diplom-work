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
var app_state_1 = require("../app-state/app-state");
var robot_1 = require("../robot/robot");
var main_loop_1 = require("../code-interpreter/main-loop");
var typescript_map_1 = require("typescript-map");
var map_api_1 = require("../map/map-api");
var SimulatorComponent = (function () {
    function SimulatorComponent() {
        this.map = app_state_1.default.map;
        this.currentRobotIndex = 0;
        this.robots = [];
        this.scripts = app_state_1.default.scripts;
    }
    SimulatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.mapApi = new map_api_1.MapApi(this.map);
        this.scripts.forEach(function (script, id) {
            _this.robots.push(new robot_1.Robot(_this.mapApi));
            var variable = new typescript_map_1.TSMap();
            variable.set('robot' + (id + 1), _this.robots[id]);
            main_loop_1.MainLoop.addLoop(id + 1, script, variable);
        });
    };
    SimulatorComponent.prototype.ngAfterViewInit = function () {
        var canvas = this.canvas.nativeElement;
        this.canvasContext = canvas.getContext('2d');
        this.map.setCanvasContext(this.canvasContext);
    };
    SimulatorComponent.prototype.ngAfterViewChecked = function () {
        this.map.areaController.redraw();
        this.map.objects.forEach(function (object) { return object.view.render(); });
    };
    SimulatorComponent.prototype.run = function () {
        main_loop_1.MainLoop.run();
    };
    SimulatorComponent.prototype.stop = function () {
        main_loop_1.MainLoop.stop();
    };
    SimulatorComponent.prototype.doStep = function () {
        main_loop_1.MainLoop.doStep();
    };
    SimulatorComponent.prototype.setCurrentRobotIndex = function (index) {
        this.currentRobotIndex = index;
    };
    return SimulatorComponent;
}());
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", core_1.ViewChild)
], SimulatorComponent.prototype, "canvas", void 0);
SimulatorComponent = __decorate([
    core_1.Component({
        templateUrl: './simulator.component.html',
        styleUrls: ['./simulator.component.css']
    })
], SimulatorComponent);
exports.SimulatorComponent = SimulatorComponent;
//# sourceMappingURL=simulator.component.js.map