import {GroupChannel} from "./group-channel";
import {Message} from "./message";
import {PrivateChannel} from "./private-channel";
import {PublicChannel} from "./public-channel";

let clientsId: number[] = [];

export class CommunicationChannel {
    static groupChannel = GroupChannel;
    static privateChannel = PrivateChannel;
    static publicChannel = PublicChannel;

    static connect(id: number) {
        if(!this.clientConnected(id)) clientsId.push(id);
    }

    static disconnect(id: number) {
        if(this.clientConnected(id))
            clientsId.splice(clientsId.indexOf(id), 1);
    }

    static receive(id: number, timestamp: number): Message[] {
        let messages: any = [];
        messages = messages.concat(this.privateChannel.getMessages(id, timestamp));
        messages = messages.concat(this.publicChannel.receive(timestamp));
        this.groupChannel.getClientGroups(id).forEach((groupId) => {
            messages = messages.concat(this.groupChannel.receive(groupId, id, timestamp));
        });
        return messages;
    }

    static sendTo(message: string, receiverId: number, senderId: number) {
        if(clientsId.indexOf(receiverId) > -1)
            this.privateChannel.pushMessage(message, receiverId, senderId);
    }
  
    private static clientConnected(id: number): Boolean {
        return clientsId.indexOf(id) > -1;
    }

    static getClients(): number[] {
        return clientsId;
    }
}


