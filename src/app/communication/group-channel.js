"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_map_1 = require("typescript-map");
var id_generator_1 = require("../services/id-generator");
var message_types_1 = require("./message-types");
;
var groups = new typescript_map_1.TSMap();
var groupIdGenerator = new id_generator_1.Services.IdGenerator();
var GroupChannel = (function () {
    function GroupChannel() {
    }
    GroupChannel.send = function (message, groupId, senderId) {
        var newMessage = {
            senderId: senderId,
            data: message,
            timestamp: new Date().getTime(),
            type: message_types_1.MessageTypes.group,
            groupId: groupId
        };
        if (this.operationAvailable(groupId, senderId)) {
            var messages = groups.get(groupId).messages;
            messages.unshift(newMessage);
        }
        else
            return false;
    };
    GroupChannel.receive = function (groupId, receiverID, timestamp) {
        var receiverMessages = [];
        if (this.operationAvailable(groupId, receiverID)) {
            var messages = groups.get(groupId).messages;
            for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                var message = messages_1[_i];
                if (message.timestamp >= timestamp)
                    receiverMessages.push(message);
                else
                    return receiverMessages;
            }
        }
        return receiverMessages;
    };
    GroupChannel.createGroup = function (clientId) {
        var groupId = groupIdGenerator.nextId();
        var group = {
            creatorId: clientId,
            membersIds: [clientId],
            messages: []
        };
        groups.set(groupId, group);
        return groupId;
    };
    GroupChannel.deleteGroup = function (groupId, clienId) {
        if (this.operationAvailable(groupId) && groups.get(groupId).creatorId === clienId) {
            groups.delete(groupId);
            return true;
        }
        else
            return false;
    };
    GroupChannel.connectGroup = function (groupId, clientId) {
        if (this.operationAvailable(groupId)) {
            groups.get(groupId).membersIds.push(clientId);
            return true;
        }
        else
            return false;
    };
    GroupChannel.disconnectGroup = function (groupId, clientId) {
        if (this.operationAvailable(groupId, clientId)) {
            var clientIds = groups.get(groupId).membersIds;
            var index = clientIds.indexOf(clientId);
            clientIds.splice(index, 1);
            return true;
        }
        else
            return false;
    };
    GroupChannel.getClientGroups = function (id) {
        var clientGroups = groups.filter(function (group) {
            if (group.membersIds.indexOf(id) > -1)
                return true;
        });
        return clientGroups.keys();
    };
    GroupChannel.operationAvailable = function (groupId, clientId) {
        if (groups.has(groupId)) {
            if (clientId) {
                return groups.get(groupId).membersIds.indexOf(clientId) !== -1;
            }
            return true;
        }
        return false;
    };
    return GroupChannel;
}());
exports.GroupChannel = GroupChannel;
//# sourceMappingURL=group-channel.js.map