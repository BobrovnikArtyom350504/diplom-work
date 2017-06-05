import {Message} from "./message";

export interface CommunicationGroup {
    creatorId: number;
    membersIds: number[];
    messages: Message[];
}