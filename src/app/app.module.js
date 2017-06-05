"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var code_editor_component_1 = require("./code-editor/code-editor.component");
var simulator_component_1 = require("./simulator/simulator.component");
var map_constructor_component_1 = require("./map-constructor/map-constructor.component");
var app_routing_module_1 = require("./app-routing.module");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            app_routing_module_1.AppRoutingModule,
            animations_1.BrowserAnimationsModule,
            material_1.MdTabsModule,
            material_1.MdCardModule,
            material_1.MdInputModule,
            material_1.MdButtonModule,
            material_1.MdIconModule
        ],
        declarations: [
            app_component_1.AppComponent,
            code_editor_component_1.CodeEditorComponent,
            simulator_component_1.SimulatorComponent,
            map_constructor_component_1.MapConstructorComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map