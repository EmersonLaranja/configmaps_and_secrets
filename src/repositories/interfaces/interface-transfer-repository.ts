import { Transfer } from "../../models/transfer";

export interface ITransferRepository {
    makeTransfer(sourceAccountNumber: string, targetAccountNumber: string, amount: number): Promise<Transfer>;
}