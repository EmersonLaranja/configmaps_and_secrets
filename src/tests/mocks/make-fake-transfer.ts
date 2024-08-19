import { Transfer } from "../../models/transfer";

export const makeFakeTransfer = (): Transfer => ({
    id: "valid_id",
    from: "valid_from_account", to: "valid_to_account", amount: 100 //valor para teste
});