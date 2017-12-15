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