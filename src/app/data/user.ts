

export class User {

    public firstName: string;
    public lastName: string;
    public userID: number;

    constructor(makeFirstName: String, makeLastName: String, makeUserID: String) {
        this.firstName = makeFirstName;
        this.lastName = makeLastName;
        this.userID = makeUserID;
     }

    private setFirstName(name: String) {
        this.firstName = firstName;
    }

    private setLastName(name: String ){
        this.lastName = lastname
    }

    private getFirstName(){
        return this.firstName;
    }

    private getLastName(){
        return this.lastName;
    }

    private setUserID(){
        
    }
    private getUserID(){
        return this.userID;
    }

}



export class Administrator extends User{

    private organization: String;
    private email: String;
    private skillLevel: number;


    constructor(firstname: String, lastName: String, userID: String) {
        
     }

    public setEmail(email: String ) {
        this.email = email;
    }

    public getEmail(){
        return this.email;
    }

    public setOrg(organization: String ){
        this.email = organization;
    }

    public getOrg(){
        return this.organization;
    }

    public setSkill(skill: number){
        this.skillLevel = skill;
    }

    public getSkill(){
        return this.skillLevel;
    }
}



export class GuestUser extends User{

    
}

export class RegisteredUser extends User{

    
}