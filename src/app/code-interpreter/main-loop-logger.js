"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainLoopLogger = (function () {
    function MainLoopLogger() {
    }
    MainLoopLogger.getCurrentRow = function (id) {
        if (!this.loops[id])
            this.loops[id] = { currentRow: 0 };
        return this.loops[id];
    };
    MainLoopLogger.setCurrentRow = function (id, stringNumber) {
        debugger;
        if (this.loops[id])
            this.loops[id].currentRow = stringNumber;
        else
            this.loops[id] = { currentRow: stringNumber };
    };
    return MainLoopLogger;
}());
MainLoopLogger.loops = [];
exports.MainLoopLogger = MainLoopLogger;
//# sourceMappingURL=main-loop-logger.js.map
