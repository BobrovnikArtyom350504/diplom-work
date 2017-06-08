"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_state_1 = require("../app-state/app-state");
var instruction_1 = require("../simulator/instruction");
var CodeEditorComponent = (function () {
    function CodeEditorComponent() {
        this.map = app_state_1.default.map;
        this.scripts = app_state_1.default.scripts;
        this.currentRobotIndex = 0;
        this.instruction = instruction_1.instruction;
    }
    CodeEditorComponent.prototype.setCurrentRobotIndex = function (index) {
        this.currentRobotIndex = index;
    };
    CodeEditorComponent.prototype.setCurrentRobotScript = function (script) {
        this.scripts[this.currentRobotIndex] = script;
    };
    return CodeEditorComponent;
}());
CodeEditorComponent = __decorate([
    core_1.Component({
        templateUrl: './code-editor.component.html',
        styleUrls: ['./code-editor.component.css']
    })
], CodeEditorComponent);
exports.CodeEditorComponent = CodeEditorComponent;
//# sourceMappingURL=code-editor.component.js.map