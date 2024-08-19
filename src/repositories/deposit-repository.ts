import { AppDataSource } from "../database/data-source";
import { Account } from "../models/account";
import { Deposit } from "../models/deposit";
import { NotFoundError } from "../utils/errors/not-found-error";
import { IDepositRepository } from "./interfaces/interface-deposit-repository";

export class DepositRepository implements IDepositRepository {
    private readonly accountRepository = AppDataSource.getRepository(Account);
    private readonly depositRepository = AppDataSource.getRepository(Deposit);

    async depositIntoAccount(accountNumber: string, amount: number): Promise<Deposit> {
        const account = await this.accountRepository.findOne({ where: { account_number: accountNumber } });

        if (!account) {
            throw new NotFoundError('Account');
        }

        const deposit = new Deposit();
        deposit.amount = Number(amount);
        deposit.account = account;

        await this.depositRepository.save(deposit);

        account.balance += Number(amount);

        await this.accountRepository.save(account);

        return deposit
    }
}