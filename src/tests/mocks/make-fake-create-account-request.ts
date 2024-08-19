import { HttpRequest } from "../../interfaces/http";

export const makeFakeCreateAccountRequest = (): HttpRequest => ({
    body: {
        account_number: "any_account_number"
    }
});