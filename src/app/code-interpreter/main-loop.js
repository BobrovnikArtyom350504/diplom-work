"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var code_interpreter_1 = require("./code-interpreter");
var loops = new typescript_map_1.TSMap();
var MainLoop = (function () {
    function MainLoop() {
    }
    MainLoop.addLoop = function (id, script, availableVariables, callback) {
        if (!loops.has(id)) {
            var loop_1;
            if (callback)
                loop_1 = new code_interpreter_1.CodeInterpreter(id, script, function () { loop_1.rerun(); callback(); }, availableVariables);
            else
                loop_1 = new code_interpreter_1.CodeInterpreter(id, script, function () { loop_1.rerun(); }, availableVariables);
            loop_1.setBreackPointCallback(function () {
                loops.forEach(function (loop) {
                    loop.stop();
                });
            });
            loops.set(id, loop_1);
        }
    };
    MainLoop.setOnStepCallback = function (id, callback) {
        loops.get(id).setOnStepExecuted(callback);
    };
    MainLoop.getCurrentRow = function (id) {
        return loops.get(id).getCurrentRow();
    };
    MainLoop.removeStepCallback = function (id) {
        loops.get(id).removeOnStepExecutedCallback();
    };
    MainLoop.getBreackpoints = function (id) {
        return loops.get(id).getBreakpoints();
    };
    MainLoop.setOnExecutedCallback = function (id, callback) {
        loops.get(id).setOnExecutedCallback(function () {
            loops.get(id).rerun();
            callback();
        });
    };
    MainLoop.setScript = function (id, script) {
        if (loops.has(id))
            loops.get(id).setScript(script);
    };
    MainLoop.addBreackpoint = function (id, number) {
        if (loops.has(id))
            loops.get(id).addBreackpoint(number);
    };
    MainLoop.removeBreackpoint = function (id, number) {
        if (loops.has(id))
            loops.get(id).removeBreackpoint(number);
    };
    MainLoop.stop = function () {
        loops.forEach(function (loop) {
            loop.stop();
        });
    };
    MainLoop.run = function () {
        loops.forEach(function (loop) {
            loop.run();
        });
    };
    MainLoop.doStep = function () {
        loops.forEach(function (loop) {
            loop.doStep();
        });
    };
    MainLoop.setSpeed = function (speed) {
        loops.forEach(function (loop) {
            loop.setSpeed(speed);
        });
    };
    MainLoop.addVariables = function (id, variables) {
        loops.get(id).addVariables(variables);
    };
    return MainLoop;
}());
exports.MainLoop = MainLoop;
//# sourceMappingURL=main-loop.js.map