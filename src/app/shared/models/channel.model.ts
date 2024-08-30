export class Channel {
    id?: string ;
    title: string;
    memberIds: string [];
    description: string;
    creatorId: string;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.title = obj ? obj.title : '';
        this.memberIds = obj? obj.memberIds : [];
        this.description = obj ? obj.description : '';
        this.creatorId = obj ? obj.creatorId : '';
    }
}