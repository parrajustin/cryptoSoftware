

export class User {

    public firstName: string;
    public lastName: string;
    public userID: number;

    constructor(options: UserOptions) {
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.userID = options.userID;
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

interface UserOptions{
    firstName: string;
    lastName: string;
    userID: number;
}

interface RegisteredOptions extends UserOptions{
    organization: string;
    email: string;
    skillLevel: number;
}



export class Administrator extends User {

    constructor(options: UserOptions) {
        super(options);
    }    
}




export class GuestUser extends User {

    constructor(options: UserOptions){
        super(options);
    }


}




export class RegisteredUser extends User {

    private organization: String;
    private email: String;
    private skillLevel: number;

    constructor(options: RegisteredOptions){
        super(options);
        this.organization = options.organization;
        this.email = options.email;
        this.skillLevel = options.skillLevel;
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