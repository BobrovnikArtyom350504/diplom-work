"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var group_channel_1 = require("./group-channel");
var private_channel_1 = require("./private-channel");
var public_channel_1 = require("./public-channel");
var clientsId = [];
var CommunicationChannel = (function () {
    function CommunicationChannel() {
    }
    CommunicationChannel.connect = function (id) {
        if (!this.clientConnected(id))
            clientsId.push(id);
    };
    CommunicationChannel.disconnect = function (id) {
        if (this.clientConnected(id))
            clientsId.splice(clientsId.indexOf(id), 1);
    };
    CommunicationChannel.receive = function (id, timestamp) {
        var _this = this;
        var messages = [];
        messages = messages.concat(this.privateChannel.getMessages(id, timestamp));
        messages = messages.concat(this.publicChannel.receive(timestamp));
        this.groupChannel.getClientGroups(id).forEach(function (groupId) {
            messages = messages.concat(_this.groupChannel.receive(groupId, id, timestamp));
        });
        return messages;
    };
    CommunicationChannel.sendTo = function (message, receiverId, senderId) {
        if (clientsId.indexOf(receiverId) > -1)
            this.privateChannel.pushMessage(message, receiverId, senderId);
    };
    CommunicationChannel.clientConnected = function (id) {
        return clientsId.indexOf(id) > -1;
    };
    CommunicationChannel.getClients = function () {
        return clientsId;
    };
    return CommunicationChannel;
}());
CommunicationChannel.groupChannel = group_channel_1.GroupChannel;
CommunicationChannel.privateChannel = private_channel_1.PrivateChannel;
CommunicationChannel.publicChannel = public_channel_1.PublicChannel;
exports.CommunicationChannel = CommunicationChannel;
//# sourceMappingURL=communication-channel.js.map