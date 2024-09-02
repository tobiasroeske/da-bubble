import { Reaction } from "../types/interfaces/reaction.interface";

export class PrivateChatMessage {
    id?: string;
    creatorId: string;
    privateChatId: string;
    createdAt: number;
    message: string;
    reactions: Reaction[];
    fileUpload: string;

    constructor(obj?: any) {
        this.id = obj?.id ?? '';
        this.creatorId = obj?.creatorId ?? '';
        this.privateChatId = obj?.privateChatId ?? '';
        this.createdAt = obj?.createdAt ?? Date.now(); 
        this.message = obj?.message ?? '';
        this.reactions = obj?.reactions ?? [];
        this.fileUpload = obj?.fileUpload ?? '';
    }
}