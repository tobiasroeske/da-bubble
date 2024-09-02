import { Reaction } from "../types/interfaces/reaction.interface";

export class ChatMessage {
    id?: string;
    creatorId: string;
    channelId: string;
    message: string;
    reactions: Reaction[];
    fileUpload: string;
    createdAt: number;
    
    constructor(obj? : any) {
        this.id = obj ? obj.id : '';
        this.creatorId = obj ? obj.creatorId : '';
        this.message = obj ? obj.message : '';
        this.reactions = obj ? obj.reactions : [];
        this.fileUpload = obj ? obj.fileUpload : '';
        this.channelId = obj ? obj.channelId : '';
        this.createdAt = obj ? obj.createdAt : new Date().getTime();
    }
}