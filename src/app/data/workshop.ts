import { User } from "./user";

export class WorkshopManager {

    public publicVar: number = 0;
    public otherVar: string = "hi";
    private test;

    constructor(
    ) { }

    public func() {
        // testasdf
    }
}

export class WorkshopGroup {

    public publicVar: number = 0;
    public otherVar: string = "hi";
    private test;

    constructor(
    ) { }

    public func() {
        // testasdf
    }
}

export class WorkshopUnit {

    public publicVar: number = 0;
    public otherVar: string = "hi";
    private test;

    constructor(
    ) { }

    public createWorkshop(workshopName: string, description: string, host: string, persistantSession: obj): boolean {
        if (workshopName.length < 0 || workshopName > 100) {
            return false;
        }

        if (description.length < 0 || description > 500) {
            return false;
        }

        if (!validIp(host)) {
            return false;
        }

        this.Database.createWorkshop(workshopName, description, host, persistantSession);
        return true;
    }

    public participateTempoaryWorkshop(userType, connectionType): null | ConnectionString {

        // first check if the workshop is temporary or not
        if (!this.isTemporaryWorkshop()) {
            return null;
        }

        this.getVM().reserve();
        return this.getVM().getConnection(connectionType);
    }
}

export class Workshop {

    public publicVar: number = 0;
    public otherVar: string = "hi";
    private test;

    constructor(
    ) { }

    public func() {
        // testasdf
    }
}