"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var main_loop_logger_1 = require("./main-loop-logger");
var CodeInterpreter = (function () {
    function CodeInterpreter(id, script, onExecuteCallback, availableVariables) {
        this.id = id;
        this.script = script;
        this.onExecuteCallback = onExecuteCallback;
        this.executionSpeed = 1000;
        this.isStopped = true;
        this.currentRow = 0;
        this.breakpoints = [];
        this.executedBreakpoints = [];
        this.availableVariables = new typescript_map_1.TSMap();
        if (availableVariables)
            this.addVariables(availableVariables);
        if (script)
            this.processScript();
    }
    CodeInterpreter.prototype.addVariables = function (availableVariables) {
        var _this = this;
        availableVariables.forEach(function (value, varName) {
            _this.availableVariables.set(varName, value);
        });
    };
    CodeInterpreter.prototype.setScript = function (script) {
        this.script = script;
        this.stop();
        this.executedBreakpoints = [];
        this.processScript();
    };
    CodeInterpreter.prototype.setBreackPointCallback = function (onBreakPointStop) {
        this.onBreakPointStop = onBreakPointStop;
    };
    CodeInterpreter.prototype.addBreackpoint = function (number) {
        if (this.breakpoints.indexOf(number) === -1)
            this.breakpoints.push(number);
    };
    CodeInterpreter.prototype.setOnExecutedCallback = function (callback) {
        this.onExecuteCallback = callback;
    };
    ;
    CodeInterpreter.prototype.removeBreackpoint = function (number) {
        var index = this.breakpoints.indexOf(number);
        if (index >= 0)
            this.breakpoints.splice(index, 1);
    };
    CodeInterpreter.prototype.stop = function () {
        this.isStopped = true;
    };
    CodeInterpreter.prototype.run = function () {
        this.isStopped = false;
        this.doSteps();
    };
    CodeInterpreter.prototype.rerun = function () {
        this.executedBreakpoints = [];
        this.processScript();
        this.currentRow = 0;
        this.run();
    };
    CodeInterpreter.prototype.doStep = function () {
        if (this.isStopped) {
            if (this.breakpoints.indexOf(this.currentRow) >= 0)
                this.executedBreakpoints.push(this.currentRow);
            var step = this.processedScript.next();
            this.currentRow++;
            main_loop_logger_1.MainLoopLogger.addLog(this.id, step.value, this.currentRow);
            if (step.done) {
                main_loop_logger_1.MainLoopLogger.clearLogs(this.id);
                this.onExecuteCallback();
            }
        }
    };
    CodeInterpreter.prototype.setSpeed = function (speed) {
        this.executionSpeed = speed;
    };
    CodeInterpreter.prototype.doSteps = function () {
        var _this = this;
        if (this.breakpoints.indexOf(this.currentRow) >= 0 &&
            this.executedBreakpoints.indexOf(this.currentRow) === -1) {
            this.onBreakPointStop();
            this.stop();
            this.executedBreakpoints.push(this.currentRow);
        }
        else
            setTimeout(function () {
                if (!_this.isStopped) {
                    var step = _this.processedScript.next();
                    main_loop_logger_1.MainLoopLogger.addLog(_this.id, step.value, _this.currentRow);
                    _this.currentRow++;
                    if (!step.done)
                        _this.doSteps();
                    else {
                        main_loop_logger_1.MainLoopLogger.clearLogs(_this.id);
                        _this.onExecuteCallback();
                    }
                }
            }, this.executionSpeed);
    };
    CodeInterpreter.prototype.processScript = function () {
        var _this = this;
        var lines = this.script.split(/\r\n|\r|\n/);
        var processedLine = lines.map(function (line) {
            return _this.proccesString(line) + " yield \"" + line + "\";";
        });
        var processedScript = processedLine.join('\n');
        this.setGenerator(processedScript);
    };
    CodeInterpreter.prototype.proccesString = function (string) {
        this.availableVariables.keys().forEach(function (varName) {
            string = string.split(varName).join("this.availableVariables.get(\"" + varName + "\")");
        });
        return string;
    };
    CodeInterpreter.prototype.setGenerator = function (script) {
        var generatorString = 'function* (){ ' + script + ' }';
        var generatorFunction = new Function('return ' + generatorString)();
        var generator = generatorFunction.call(this);
        this.processedScript = generator;
    };
    return CodeInterpreter;
}());
exports.CodeInterpreter = CodeInterpreter;
//# sourceMappingURL=code-interpreter.js.map