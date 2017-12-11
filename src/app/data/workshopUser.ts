
// new update
export class Workshop {

  public workshopName: string;
  public workshopID: number;

  constructor(data: workshopData) {
    this.workshopName = data.workshopName;
    this.workshopID = data.workshopID;
  }
  
}

interface workshopData {
  workshopName: string;
  workshopID: number;
}
interface groupData extends workshopData{
  groupName:string;
  groupID:number;
}
interface unitData extends groupData{
  unitName:string;
  unitNumber:number;
}


export class WorkshopGroup extends Workshop {

  public groupName: string;
  public groupNumber: number;

  constructor(data: groupData) {
    super(data);
    this.groupName = data.groupName;
    this.groupNumber = data.groupID;
  }

  public getGroupName() {
    return this.getGroupName;
  }
  public getGroupID(){
    return this.getGroupID;
  }
  public changeGroupName(name){
    this.groupName = name;
  }
  

}

export class WorkshopUnit extends WorkshopGroup{

  public unitName:string;
  public unitNumber:number;

  constructor(data: unitData){
    super(data);
    this.unitName = data.unitName;
    this.unitNumber = data.unitNumber;
   }

  public getUnitName() {
    return this.unitName;
  }
  public getunitID(){
    return this.unitNumber
  }
  public changeUnitName(name){
    this.unitName = name;
  }
}
