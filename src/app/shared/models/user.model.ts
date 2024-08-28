type LoginState = 'loggedIn' | 'loggedOut' | 'idle'

export class User {
    id?: string | null
    name: string | null;
    email: string | null;
    avatarPath: string | null;
    loginState: LoginState;

    constructor(obj?: any) {
        this.id = obj ? obj.id : null;
        this.name = obj ? obj.name : null;
        this.email = obj ? obj.email : null;
        this.avatarPath = obj ? obj.password : null;
        this.loginState = obj ? obj.loginState : 'loggedOut';
    }
}