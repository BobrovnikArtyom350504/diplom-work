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
        this.currentScriptRows = [];
        this.currentRow = 0;
        this.breakpoints = [];
    }
    SimulatorComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.scripts.length)
            this.setCurrentScriptRows();
        this.mapApi = new map_api_1.MapApi(this.map);
        this.scripts.forEach(function (script, id) {
            _this.robots.push(new robot_1.Robot(_this.mapApi));
            var variable = new typescript_map_1.TSMap();
            variable.set('robot', _this.robots[id]);
            main_loop_1.MainLoop.addLoop(id, script, variable);
            main_loop_1.MainLoop.setOnStepCallback(id, function () { });
        });
        main_loop_1.MainLoop.setOnStepCallback(0, this.onRowChange);
    };
    SimulatorComponent.prototype.onRowChange = function (rowNumber) {
        this.currentRow = rowNumber;
        var currentRow = document.querySelector('.row.current');
        if (currentRow)
            currentRow.classList.remove('current');
        var newRow = document.querySelector(".row:nth-of-type(" + (this.currentRow + 1) + ")");
        if (newRow)
            newRow.classList.add('current');
    };
    SimulatorComponent.prototype.setSpeed = function (speed) {
        main_loop_1.MainLoop.setSpeed(+speed);
    };
    SimulatorComponent.prototype.toggleBreackPoint = function (row) {
        if (this.breakpoints.indexOf(row) >= 0) {
            this.breakpoints.splice(this.breakpoints.indexOf(row), 1);
            main_loop_1.MainLoop.removeBreackpoint(this.currentRobotIndex, row);
        }
        else {
            main_loop_1.MainLoop.addBreackpoint(this.currentRobotIndex, row);
            this.breakpoints.push(row);
        }
    };
    SimulatorComponent.prototype.ngAfterViewChecked = function () {
        var canvas = this.canvas.nativeElement;
        this.canvasContext = canvas.getContext('2d');
        this.map.setCanvasContext(this.canvasContext);
        this.map.areaController.redraw();
        this.map.objects.forEach(function (object) { return object.view.render(); });
    };
    SimulatorComponent.prototype.setCurrentScriptRows = function () {
        this.currentScriptRows = this.scripts[this.currentRobotIndex].split(/\r\n|\r|\n/);
    };
    SimulatorComponent.prototype.setCurrentRobotBreakpoints = function () {
        this.breakpoints = main_loop_1.MainLoop.getBreackpoints(this.currentRobotIndex);
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
        main_loop_1.MainLoop.removeStepCallback(this.currentRobotIndex);
        this.currentRobotIndex = index;
        this.currentRow = main_loop_1.MainLoop.getCurrentRow(this.currentRobotIndex);
        var currentRow = document.querySelector('.row.current');
        if (currentRow)
            currentRow.classList.remove('current');
        var newRow = document.querySelector(".row:nth-of-type(" + (this.currentRow + 1) + ")");
        if (newRow)
            newRow.classList.add('current');
        main_loop_1.MainLoop.setOnStepCallback(this.currentRobotIndex, this.onRowChange);
        this.setCurrentScriptRows();
        this.setCurrentRobotBreakpoints();
    };
    return SimulatorComponent;
}());
__decorate([
    core_1.ViewChild('canvas'),
    __metadata("design:type", Object)
], SimulatorComponent.prototype, "canvas", void 0);
SimulatorComponent = __decorate([
    core_1.Component({
        templateUrl: './simulator.component.html',
        styleUrls: ['./simulator.component.css']
    })
], SimulatorComponent);
exports.SimulatorComponent = SimulatorComponent;
//# sourceMappingURL=simulator.component.js.map