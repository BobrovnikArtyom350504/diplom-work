"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Services;
(function (Services) {
    var IdGenerator = (function () {
        function IdGenerator() {
            this.id = 1;
        }
        IdGenerator.prototype.nextId = function () {
            return this.id++;
        };
        return IdGenerator;
    }());
    Services.IdGenerator = IdGenerator;
})(Services = exports.Services || (exports.Services = {}));
//# sourceMappingURL=id-generator.js.map