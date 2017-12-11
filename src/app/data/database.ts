export class Database {

    public publicVar: number = 0;
    public otherVar: string = "hi";
    private test;

    constructor(
    ) { }

   
    public getNewID() {
        //This method should look into the database and return a new ID number that is not being used
        var id: number;
        return id;
    }
    public getGroupID(){
        //This method will return a group ID that is not stored in the database
        var id:number;
        return id;
    }
    public getUnitID(){
        //This method returns a unit ID that is not being used(stored) in the database
        var id:number;
        return id;
    }

    public addAdminUser(user){
        //This method should add an Admin User to the database
    }
    public addRegUser(user){
        //This method should add a Registered User to the database
    }
    public addGuestUser(user){
        //This method should add a guest user and add to database
    }
    public addGroup(group){
        //This method stores a group workshop in the database
    }
    public addUnit(unit){
        //This method stores a unit workshop in the database
    }

    public deleteUser(id:number){
        //This method should delete a user from the database
    }
    
    
}

export class DatabaseManager {

    public publicVar: number = 0;
    public otherVar: string = "hi";
    private test;

    constructor(
    ) { }

    public func() {
        // testasdf
    }
}