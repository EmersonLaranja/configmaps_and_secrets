import { GetAccountBalanceController } from '../../controllers/account/get-account-balance-controller';
import { HttpRequest } from '../../interfaces/http';
import { Account } from '../../models/account';
import { IAccountRepository } from '../../repositories/interfaces/interface-account-repository';
import { badRequest, notFound, ok, serverError } from '../../utils/httpResponses/http-responses';
import { makeFakeAccount } from '../mocks/make-fake-account';
import { makeValidation } from '../mocks/make-validation';

describe('GetAccountBalanceController', () => {

    const makeAccountRepository = (): IAccountRepository => {
        class AccountRepositoryStub implements IAccountRepository {
            async createAccount(account: Account): Promise<Account> {
                return Promise.resolve(makeFakeAccount());
            }

            async depositIntoAccount(accountNumber: string, amount: number): Promise<void> {
                return Promise.resolve();
            }
            async getAccount(accountNumber: string): Promise<Account | null> {
                return {
                    account_number: accountNumber,
                    balance: 1000, //valor de saldo arbitrário para o teste
                };
            }
        }
        return new AccountRepositoryStub();
    };

    const makeSut = () => {
        const validationStub = makeValidation();
        const accountRepositoryStub = makeAccountRepository();
        const sut = new GetAccountBalanceController(accountRepositoryStub, validationStub);
        return { sut, validationStub, accountRepositoryStub };
    };

    test('Should return 400 if validation fails', async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
        const httpRequest = {
            params: {
                accountNumber: "accountNumber"
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new Error()));
    });

    test('Should call getAccount with correct account number', async () => {
        const { sut, accountRepositoryStub } = makeSut();
        const getAccountSpy = jest.spyOn(accountRepositoryStub, 'getAccount');
        const httpRequest = {
            params: {
                accountNumber: 'valid_account_number',
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
                accountNumber: 'invalid_account_number',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(notFound('Account'));
    });

    test('Should return 200 with account balance if account exists', async () => {
        const { sut } = makeSut();
        const httpRequest = {
            params: {
                accountNumber: 'valid_account_number',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(ok({ balance: 1000 }));
    });

    test('Should return 500 if accountRepository throws', async () => {
        const { sut, accountRepositoryStub } = makeSut();
        jest.spyOn(accountRepositoryStub, 'getAccount').mockImplementationOnce(async () => {
            throw new Error();
        });
        const httpRequest = {
            params: {
                accountNumber: 'valid_account_number',
            },
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
