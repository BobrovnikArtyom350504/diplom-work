import { TSMap as Map } from "typescript-map";

import {CommunicationChannel} from "../communication/communication-channel";
import {Message} from "../communication/message";

let robotUpdates: Map<number, number> = new Map<number, number>();

export class RobotCommunication {
    private getId: () => number;
    constructor(id: number) {
        this.getId = ()=>{
            return id;
        };
        robotUpdates.set(id, 0);
        CommunicationChannel.connect(id);
    }

    receive(): Message[] {
        let messages = CommunicationChannel.receive(this.getId(), robotUpdates.get(this.getId()));
        robotUpdates.set(this.getId(),  new Date().getTime());
        return messages;
    }

    sendTo(message: string, id: number) {
        CommunicationChannel.sendTo(message, id, this.getId());
    }

    send(message: string) {
        CommunicationChannel.publicChannel.send(message, this.getId());
    }

    createGroup(): number {
        return CommunicationChannel.groupChannel.createGroup(this.getId());
    }

    deleteGroup(id: number): boolean {
        return CommunicationChannel.groupChannel.deleteGroup(id, this.getId());
    }

    connectGroup(id: number): boolean {
        return CommunicationChannel.groupChannel.connectGroup(id, this.getId());
    }

    disconnectGroup(id: number): boolean {
        return CommunicationChannel.groupChannel.disconnectGroup(id, this.getId());
    }

    sendGroup(message: string, id: number) {
        CommunicationChannel.groupChannel.send(message, id, this.getId());
    }
}