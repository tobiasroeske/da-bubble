export class Notification {
    id?: string;
    channelId: string;
    chatMessageId: string;
    creatorId: string;
    userId: string;
    createdAt: number;
    read: boolean;

    constructor(obj?: any) {
        this.id = obj?.id ?? '';
        this.channelId = obj?.channelId ?? '';
        this.chatMessageId = obj?.chatMessageId ?? '';
        this.creatorId = obj?.creatorId ?? '';
        this.userId = obj?.userId ?? '';
        this.createdAt = obj?.createdAt ?? Date.now(); 
        this.read = obj?.read ?? false; 
    }

}