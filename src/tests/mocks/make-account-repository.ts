import { Account } from "../../models/account";
import { IAccountRepository } from "../../repositories/interfaces/interface-account-repository";
import { makeFakeAccount } from "./make-fake-account";

export const makeAccountRepository = (): IAccountRepository => {
    class AccountRepositoryStub implements IAccountRepository {
        async createAccount(account: Account): Promise<Account> {
            return Promise.resolve(makeFakeAccount());
        }
        async getAccount(accountNumber: string): Promise<Account | null> {
            return Promise.resolve(null);
        }
        async depositIntoAccount(accountNumber: string, amount: number): Promise<void> {
            return Promise.resolve();
        }
    }
    return new AccountRepositoryStub();
};