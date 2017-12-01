

export class User {

    public firstName: string;
    public lastName: string;
    public userID: number;

    constructor(makeFirstName: string, makeLastName: string, makeUserID: number) {
        this.firstName = makeFirstName;
        this.lastName = makeLastName;
        this.userID = makeUserID;
    }

    private setFirstName(name: string) {
        this.firstName = name;
    }

    private setLastName(name: string) {
        this.lastName = name;
    }

    private getFirstName() {
        return this.firstName;
    }

    private getLastName() {
        return this.lastName;
    }

    private setUserID() {

    }
    private getUserID() {
        return this.userID;
    }

}



export class Administrator extends User {

    private organization: string;
    private email: string;
    private skillLevel: number;


    constructor(firstname: string, lastName: string, userID: number) {
        super(firstname, lastName, userID)
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail() {
        return this.email;
    }

    public setOrg(organization: string) {
        this.email = organization;
    }

    public getOrg() {
        return this.organization;
    }

    public setSkill(skill: number) {
        this.skillLevel = skill;
    }

    public getSkill() {
        return this.skillLevel;
    }
}



export class GuestUser extends User {


}

export class RegisteredUser extends User {


}