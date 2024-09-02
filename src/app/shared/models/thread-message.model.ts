import { Reaction } from "../types/interfaces/reaction.interface";

export class ThreadMessage {
    id?: string;
    creatorId: string;
    chatMessageId: string;
    message: string;
    reactions: Reaction[];
    createdAt: number;
    fileUpload: string;

    constructor(obj?: any) {
        this.id = obj?.id ?? '';
        this.creatorId = obj?.creatorId ?? '';
        this.chatMessageId = obj?.chatMessageId ?? '';
        this.message = obj?.message ?? '';
        this.reactions = obj?.reactions ?? [];
        this.createdAt = obj?.createdAt ?? Date.now(); 
        this.fileUpload = obj?.fileUpload ?? '';
    }
}