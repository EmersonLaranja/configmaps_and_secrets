import { Account } from "../../models/account";

export const makeFakeAccount = (): Account => ({
    account_number: "valid_account_number",
    balance: 0
});