export default class WebServiceError extends Error {

    status: number;

    constructor(status: number) {
        super('The server did not return a valid response.');
        this.status = status;
    }
}
