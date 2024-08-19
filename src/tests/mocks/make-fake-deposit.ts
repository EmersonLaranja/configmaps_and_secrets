import { Deposit } from "../../models/deposit";
import { makeFakeAccount } from "./make-fake-account";

export const makeFakeDeposit = (): Deposit => ({
    "id": "valid_id",
    "account": makeFakeAccount(),
    "amount": 100
});