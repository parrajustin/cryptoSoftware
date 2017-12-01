
export class Workshop {

    private name: string;    

    constructor(name: string) {
        this.name = name;        
     }

    public getName() {
        return this.name;
    }    

    private setName(name: string){
        this.name = name;
    }    

}



export class Manager {

    
    
}


export class WorkshopGroup extends Workshop {

    private id: number;
        
    constructor(name: string, id: number) {
        super(name);
        this.id = id; 
     }

     private getID(){
        return this.id;
    }

    private setID(id: number){
        this.id = id;
    }

}

export class WorkshopUnit extends Workshop{

    private id: number

    constructor(name: string, id: number){
        super(name);
        this.id = id;
     }

     private getID(){
        return this.id;
    }

    private setID(id: number){
        this.id = id;
    }

}

