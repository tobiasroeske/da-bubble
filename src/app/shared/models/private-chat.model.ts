export class PrivateChat {
    id?: string;
    participantIds: string;
    creatorId: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.participantIds = obj ? obj.participantIds : '';
        this.creatorId = obj ? obj.creatorId : '';
    }
}