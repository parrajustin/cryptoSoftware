import { Database } from "./database";



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

    private setUserID(id: number) {
        this.userID = id;
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
    private dBase:Database = new Database();
    
    constructor(options: UserOptions) {
        super(options);
    }    

    private createAdmin(fName:string, lName:string){
        let AdminUser = new Administrator({firstName:fName, lastName:lName,userID:this.dBase.getNewID()});
        this.dBase.addAdminUser(AdminUser);
    }    
    private createRegistered(fName:string, lName:string, org:string, email, level){      
        //This function should create a registered User and add it to the database
        let regUser = new RegisteredUser({firstName: fName, lastName: lName, userID:this.dBase.getNewID(), organization:org, email:email, skillLevel:level});
        this.dBase.addRegUser(regUser);
    }
    private createGuest(fName: string, lName:string ){
        //This function should create a guest User and add it to the database
        let gUser = new GuestUser({firstName:fName, lastName:lName, userID:this.dBase.getNewID()})
        this.dBase.addGuestUser(gUser);
    }
    private deleteUser(userID: number){
        //This function will delete a user
        this.dBase.deleteUser(userID);
    }
    private createWorkshopGroup(gName:string, gID:number){
        
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
        this.organization = organization;
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

