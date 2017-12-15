export class SurveyManager {

    public publicVar: number = 0;
    public otherVar: string = "hi";
    private test;

    constructor(
    ) { }

    public func() {
        // testasdf
    }
}

export class Survey {

    public publicVar: number = 0;
    public otherVar: string = "hi";
    private test;

    constructor(
    ) { }

    public takeSurvey(): Pdf {
        if (!this.surveyExists()) {
            return null;
        }

        return Survey.downloadFile();
    }
}