"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var robot_communication_1 = require("./robot-communication");
var id_generator_1 = require("../services/id-generator");
var robotIdGenerator = new id_generator_1.Services.IdGenerator();
var Robot = (function () {
    function Robot(mapApi) {
        this.movement = {};
        var id = robotIdGenerator.nextId();
        this.getId = function () {
            return id;
        };
        this.movement.move = function (speed) { return mapApi.move(id, +speed); };
        this.movement.rotateTo = function (angle) { return mapApi.rotate(id, +angle); };
        this.movement.rotateOn = function (angleOffset) { return mapApi.rotateOn(id, +angleOffset); };
        this.getLocation = function () { return mapApi.getLocation(id); };
        this.communication = new robot_communication_1.RobotCommunication(id);
    }
    return Robot;
}());
exports.Robot = Robot;
//# sourceMappingURL=robot.js.map