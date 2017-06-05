import { TSMap as Map } from "typescript-map";
import {Message} from "./message";
import {CommunicationGroup as Group} from "./communication-group";
import {Services} from "../services/id-generator";
import {MessageTypes} from "./message-types";

interface GroupFix {
  messages: any;
  creatorId: any;
  membersIds: any;
};


let groups: Map<number, Group> = new Map<number, Group>();
let groupIdGenerator: Services.IdGenerator = new Services.IdGenerator();

export class GroupChannel {
    static send(message: string, groupId: number, senderId: number): boolean {
        let newMessage = {
            senderId: senderId,
            data: message,
            timestamp: new Date().getTime(),
            type: MessageTypes.group,
            groupId: groupId
        };

        if(this.operationAvailable(groupId, senderId)) {
            let messages = groups.get(groupId).messages;
            messages.unshift(newMessage);
        } else return false;
    }

    static receive(groupId: number, receiverID: number, timestamp: number): Message[] {
        let receiverMessages: Message[] = [];
        if(this.operationAvailable(groupId, receiverID)) {
            let messages = groups.get(groupId).messages;
            for(let message of messages) {
                if(message.timestamp >= timestamp)
                    receiverMessages.push(message);
                else return receiverMessages;
            }
        }
        return receiverMessages;
    }

    static createGroup(clientId: number): number {
        let groupId = groupIdGenerator.nextId();
        let group: GroupFix = {
            creatorId: clientId,
            membersIds: [clientId],
            messages: []
        };
        groups.set(groupId, group);
        return groupId;
    }

    static deleteGroup(groupId: number, clienId: number): boolean {
        if(this.operationAvailable(groupId) && groups.get(groupId).creatorId === clienId) {
            groups.delete(groupId);
            return true;
        }
        else return false;
    }

    static connectGroup(groupId :number, clientId: number): boolean {
        if(this.operationAvailable(groupId)) {
            groups.get(groupId).membersIds.push(clientId);
            return true;
        }else return false;
    }

    static disconnectGroup(groupId :number, clientId: number): boolean {
        if(this.operationAvailable(groupId, clientId)) {
            let clientIds = groups.get(groupId).membersIds;
            let index = clientIds.indexOf(clientId);
            clientIds.splice(index, 1);
            return true;
        }else return false;
    }

    static getClientGroups(id: number): number[]{
        let clientGroups = groups.filter((group)=>{
            if (group.membersIds.indexOf(id) > -1)
                return true;
        });
        return clientGroups.keys();
    }

    private static operationAvailable(groupId: number, clientId?: number): boolean {
        if(groups.has(groupId)) {
            if (clientId) {
                return groups.get(groupId).membersIds.indexOf(clientId) !== -1;
            }
            return true;
        }
        return false;
    }
}

