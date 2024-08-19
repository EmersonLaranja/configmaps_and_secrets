import { DepositIntoAccountController } from '../../controllers/deposit/deposit-into-account-controller';
import { Account } from '../../models/account';
import { Deposit } from '../../models/deposit';
import { IAccountRepository } from '../../repositories/interfaces/interface-account-repository';
import { IDepositRepository } from '../../repositories/interfaces/interface-deposit-repository';
import { badRequest, notFound, ok, serverError } from '../../utils/httpResponses/http-responses';
import { makeFakeAccount } from '../mocks/make-fake-account';
import { makeFakeDeposit } from '../mocks/make-fake-deposit';
import { makeValidation } from '../mocks/make-validation';

describe('DepositIntoAccountController', () => {
    const makeAccountRepository = (): IAccountRepository => {
        class AccountRepositoryStub implements IAccountRepository {
            async createAccount(account: Account): Promise<Account> {
                return Promise.resolve(makeFakeAccount());
            }
            async getAccount(accountNumber: string): Promise<Account | null> {
                return {
                    account_number: accountNumber,
                    balance: 0,
                };
            }

            async depositIntoAccount(accountNumber: string, amount: number): Promise<void> {
                return Promise.resolve();
            }
        }
        return new AccountRepositoryStub();
    };


    const makeDepositRepository = (): IDepositRepository => {
        class DepositRepositoryStub implements IDepositRepository {
            async depositIntoAccount(accountNumber: string, amount: number): Promise<Deposit> {
                return new Promise((resolve) => resolve(makeFakeDeposit()));
            }
        }
        return new DepositRepositoryStub();
    };


    const makeSut = () => {
        const validationStub = makeValidation();
        const accountRepositoryStub = makeAccountRepository();
        const depositRepositoryStub = makeDepositRepository();
        const sut = new DepositIntoAccountController(accountRepositoryStub, depositRepositoryStub, validationStub);
        return { sut, validationStub, accountRepositoryStub, depositRepositoryStub };
    };

    test('Should return 400 if validation fails', async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
        const httpRequest = {};
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new Error()));
    });

    test('Should call getAccount with correct account number', async () => {
        const { sut, accountRepositoryStub } = makeSut();
        const getAccountSpy = jest.spyOn(accountRepositoryStub, 'getAccount');
        const httpRequest = {
            params: {
                account_number: 'valid_account_number',
            },
            body: {
                amount: 100,
            },
        };
        await sut.handle(httpRequest);
        expect(getAccountSpy).toHaveBeenCalledWith('valid_account_number');
    });

    test('Should return 404 if account does not exist', async () => {
        const { sut, accountRepositoryStub } = makeSut();
        jest.spyOn(accountRepositoryStub, 'getAccount').mockReturnValueOnce(Promise.resolve(null));
        const httpRequest = {
            params: {
                account_number: 'invalid_account_number',
            },
            body: {
                amount: 100,
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(notFound('Account'));
    });

    test('Should call depositIntoAccount with correct values', async () => {
        const { sut, depositRepositoryStub } = makeSut();
        const depositIntoAccountSpy = jest.spyOn(depositRepositoryStub, 'depositIntoAccount');
        const httpRequest = {
            params: {
                account_number: 'valid_account_number',
            },
            body: {
                amount: 100,
            },
        };
        await sut.handle(httpRequest);
        expect(depositIntoAccountSpy).toHaveBeenCalledWith('valid_account_number', 100);
    });

    test('Should return 200 on deposit', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            params: {
                account_number: 'valid_account_number',
            },
            body: {
                amount: 100,
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        //a documentação atual pede para não retornar as informações do deposito, mas apenas um status 200
        expect(httpResponse).toEqual(ok());
    });

    test('Should return 500 if accountRepository throws', async () => {
        const { sut, accountRepositoryStub } = makeSut();
        jest.spyOn(accountRepositoryStub, 'getAccount').mockImplementationOnce(async () => Promise.reject(new Error()));
        const httpRequest = {
            params: {
                account_number: 'valid_account_number',
            },
            body: {
                amount: 100,
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
