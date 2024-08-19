import { Deposit } from "../../models/deposit";

export interface IDepositRepository {
    depositIntoAccount(accountNumber: string, amount: number): Promise<Deposit>;
}