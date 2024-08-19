import { AppDataSource } from "../database/data-source";
import { Account } from "../models/account";
import { Transfer } from "../models/transfer";
import { InsufficientError } from "../utils/errors/insufficient-error";
import { NotFoundError } from "../utils/errors/not-found-error";
import { ITransferRepository } from "./interfaces/interface-transfer-repository";

export class TransferRepository implements ITransferRepository {
    private readonly accountRepository = AppDataSource.getRepository(Account);
    private readonly transferRepository = AppDataSource.getRepository(Transfer);

    async makeTransfer(sourceAccountNumber: string, targetAccountNumber: string, amount: number): Promise<Transfer> {
        const sourceAccount = await this.accountRepository.findOne({ where: { account_number: sourceAccountNumber } });
        const targetAccount = await this.accountRepository.findOne({ where: { account_number: targetAccountNumber } });

        if (!sourceAccount || !targetAccount) {
            throw new NotFoundError('Source or target account');
        }

        if (sourceAccount.balance < amount) {
            throw new InsufficientError('balance');
        }

        const transfer = new Transfer();
        transfer.amount = amount;
        transfer.from = sourceAccount.account_number;
        transfer.to = targetAccount.account_number;

        sourceAccount.balance -= amount;
        targetAccount.balance += amount;

        await this.accountRepository.save(sourceAccount);
        await this.accountRepository.save(targetAccount);
        await this.transferRepository.save(transfer);

        return transfer;
    }
}