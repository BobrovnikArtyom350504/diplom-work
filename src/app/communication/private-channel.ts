import { TSMap as Map } from "typescript-map";
import {Message} from "./message";
import {MessageTypes} from "./message-types";

let messages: Map<number, Message[]> = new Map<number, Message[]>();

export class PrivateChannel {
    static pushMessage(message: string, receiverId: number, senderId: number) {
        let newMessage = {
            senderId: senderId,
            data: message,
            timestamp: new Date().getTime(),
            type: MessageTypes.private
        };

        let receiverMessages = messages.get(receiverId);
        receiverMessages = receiverMessages || [];
        receiverMessages.unshift(newMessage);
        messages.set(receiverId, receiverMessages);
    }

    static getMessages(id: number, timestamp: number): Message[] {
        let receiverMessages = [];
        if(messages.get(id))
            for(let message of messages.get(id)) {
                if(message.timestamp >= timestamp)
                    receiverMessages.push(message);
                else return receiverMessages;
            }
        return receiverMessages;
    }
}

