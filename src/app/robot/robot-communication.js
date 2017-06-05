"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var communication_channel_1 = require("../communication/communication-channel");
var robotUpdates = new typescript_map_1.TSMap();
var RobotCommunication = (function () {
    function RobotCommunication(id) {
        this.getId = function () {
            return id;
        };
        robotUpdates.set(id, 0);
        communication_channel_1.CommunicationChannel.connect(id);
    }
    RobotCommunication.prototype.receive = function () {
        var messages = communication_channel_1.CommunicationChannel.receive(this.getId(), robotUpdates.get(this.getId()));
        robotUpdates.set(this.getId(), new Date().getTime());
        return messages;
    };
    RobotCommunication.prototype.sendTo = function (message, id) {
        communication_channel_1.CommunicationChannel.sendTo(message, id, this.getId());
    };
    RobotCommunication.prototype.send = function (message) {
        communication_channel_1.CommunicationChannel.publicChannel.send(message, this.getId());
    };
    RobotCommunication.prototype.createGroup = function () {
        return communication_channel_1.CommunicationChannel.groupChannel.createGroup(this.getId());
    };
    RobotCommunication.prototype.deleteGroup = function (id) {
        return communication_channel_1.CommunicationChannel.groupChannel.deleteGroup(id, this.getId());
    };
    RobotCommunication.prototype.connectGroup = function (id) {
        return communication_channel_1.CommunicationChannel.groupChannel.connectGroup(id, this.getId());
    };
    RobotCommunication.prototype.disconnectGroup = function (id) {
        return communication_channel_1.CommunicationChannel.groupChannel.disconnectGroup(id, this.getId());
    };
    RobotCommunication.prototype.sendGroup = function (message, id) {
        communication_channel_1.CommunicationChannel.groupChannel.send(message, id, this.getId());
    };
    return RobotCommunication;
}());
exports.RobotCommunication = RobotCommunication;
//# sourceMappingURL=robot-communication.js.map