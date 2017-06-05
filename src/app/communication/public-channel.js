"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message_types_1 = require("./message-types");
var messages = [];
var PublicChannel = (function () {
    function PublicChannel() {
    }
    PublicChannel.send = function (message, id) {
        var newMessage = {
            senderId: id,
            data: message,
            timestamp: new Date().getTime(),
            type: message_types_1.MessageTypes.public
        };
        messages.unshift(newMessage);
    };
    PublicChannel.receive = function (timestamp) {
        var receiverMessages = [];
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var message = messages_1[_i];
            if (message.timestamp >= timestamp)
                receiverMessages.push(message);
            else
                return receiverMessages;
        }
        return receiverMessages;
    };
    return PublicChannel;
}());
exports.PublicChannel = PublicChannel;
//# sourceMappingURL=public-channel.js.map