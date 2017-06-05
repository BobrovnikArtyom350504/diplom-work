"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var logMap = new typescript_map_1.TSMap();
var MainLoopLogger = (function () {
    function MainLoopLogger() {
    }
    MainLoopLogger.getLogs = function (id) {
        return logMap.get(id);
    };
    MainLoopLogger.addLog = function (id, string, stringNumber) {
        if (!logMap.has(id))
            logMap.set(id, []);
        logMap.get(id).push({ stringNumber: stringNumber, string: string });
    };
    MainLoopLogger.clearLogs = function (id) {
        logMap.set(id, []);
    };
    return MainLoopLogger;
}());
exports.MainLoopLogger = MainLoopLogger;
//# sourceMappingURL=main-loop-logger.js.map