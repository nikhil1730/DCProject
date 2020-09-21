export class BusinessOwner {
    username: string;
    password: string;
    storeName: string;
    location: string;
    insidePeople: number;
    waitTime: number;
    constructor() {
        this.username = '';
        this.password = '';
        this.storeName = '';
        this.location = '';
        this.insidePeople = 0;
        this.waitTime = 0;
    }
}
