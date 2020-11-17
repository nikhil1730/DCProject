export class BusinessOwner {
    username: string;
    password: string;
    storeName: string;
    location: string;
    insidePeople: number;
    waitTime: number;
    webIn: number;
    maxCapacity: number;
    totalTime: number;
    constructor() {
        this.username = '';
        this.password = '';
        this.storeName = '';
        this.location = '';
        this.insidePeople = 0;
        this.waitTime = 0;
        this.webIn = 0;
        this.maxCapacity = 1;
        this.totalTime = 0;
    }
}
