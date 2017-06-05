"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var message_types_1 = require("./message-types");
var messages = new typescript_map_1.TSMap();
var PrivateChannel = (function () {
    function PrivateChannel() {
    }
    PrivateChannel.pushMessage = function (message, receiverId, senderId) {
        var newMessage = {
            senderId: senderId,
            data: message,
            timestamp: new Date().getTime(),
            type: message_types_1.MessageTypes.private
        };
        var receiverMessages = messages.get(receiverId);
        receiverMessages = receiverMessages || [];
        receiverMessages.unshift(newMessage);
        messages.set(receiverId, receiverMessages);
    };
    PrivateChannel.getMessages = function (id, timestamp) {
        var receiverMessages = [];
        if (messages.get(id))
            for (var _i = 0, _a = messages.get(id); _i < _a.length; _i++) {
                var message = _a[_i];
                if (message.timestamp >= timestamp)
                    receiverMessages.push(message);
                else
                    return receiverMessages;
            }
        return receiverMessages;
    };
    return PrivateChannel;
}());
exports.PrivateChannel = PrivateChannel;
//# sourceMappingURL=private-channel.js.map