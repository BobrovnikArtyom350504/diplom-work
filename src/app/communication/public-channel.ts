import {Message} from "./message";
import {MessageTypes} from "./message-types";

let messages: Message[] = [];

export class PublicChannel {
    static send(message: string, id: number) {
        let newMessage = {
            senderId: id,
            data: message,
            timestamp: new Date().getTime(),
            type: MessageTypes.public
        };
        messages.unshift(newMessage);
    }

    static receive(timestamp: number): Message[] {
        let receiverMessages = [];
        for(let message of messages) {
            if(message.timestamp >= timestamp)
                receiverMessages.push(message);
            else return receiverMessages;
        }
        return receiverMessages;
    }
}


