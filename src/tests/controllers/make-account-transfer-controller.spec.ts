import { MakeAccountTransferController } from '../../controllers/transfer/make-account-transfer-controller';
import { HttpRequest } from '../../interfaces/http';
import { Transfer } from '../../models/transfer';
import { ITransferRepository } from '../../repositories/interfaces/interface-transfer-repository';
import { InsufficientError } from '../../utils/errors/insufficient-error';
import { badRequest, insufficient, ok, serverError } from '../../utils/httpResponses/http-responses';
import { makeFakeTransfer } from '../mocks/make-fake-transfer';
import { makeValidation } from '../mocks/make-validation';

describe('MakeAccountTransferController', () => {

    const makeTransferRepository = (): ITransferRepository => {
        class TransferRepositoryStub implements ITransferRepository {
            async makeTransfer(from: string, to: string, amount: number): Promise<Transfer> {
                return new Promise((resolve) => resolve(makeFakeTransfer()));
            }
        }
        return new TransferRepositoryStub();
    };

    const makeSut = () => {
        const validationStub = makeValidation();
        const transferRepositoryStub = makeTransferRepository();
        const sut = new MakeAccountTransferController(transferRepositoryStub, validationStub);
        return { sut, validationStub, transferRepositoryStub };
    };

    test('Should return 400 if validation fails', async () => {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
        const httpRequest: HttpRequest = {
            body: {}
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(badRequest(new Error()));
    });

    test('Should call makeTransfer with correct values', async () => {
        const { sut, transferRepositoryStub } = makeSut();
        const makeTransferSpy = jest.spyOn(transferRepositoryStub, 'makeTransfer');
        const httpRequest: HttpRequest = {
            body: {
                from: 'valid_from_account',
                to: 'valid_to_account',
                amount: 100
            }
        };
        await sut.handle(httpRequest);
        expect(makeTransferSpy).toHaveBeenCalledWith('valid_from_account', 'valid_to_account', 100);
    });

    test('Should return 200 with correct data on successful transfer', async () => {
        const { sut } = makeSut();
        const httpRequest: HttpRequest = {
            body: {
                from: 'valid_from_account',
                to: 'valid_to_account',
                amount: 100
            }
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(ok({ amount: 100, from: 'valid_from_account', to: 'valid_to_account' }));
    });

    test('Should return 500 if transferRepository throws', async () => {
        const { sut, transferRepositoryStub } = makeSut();
        jest.spyOn(transferRepositoryStub, 'makeTransfer').mockImplementationOnce(async () => {
            throw new Error();
        });
        const httpRequest: HttpRequest = {
            body: {
                from: 'valid_from_account',
                to: 'valid_to_account',
                amount: 100
            }
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    test('Should return 409 if InsufficientError is thrown', async () => {
        const { sut, transferRepositoryStub } = makeSut();
        jest.spyOn(transferRepositoryStub, 'makeTransfer').mockImplementationOnce(async () => {
            throw new InsufficientError('Insufficient balance');
        });
        const httpRequest: HttpRequest = {
            body: {
                from: 'valid_from_account',
                to: 'valid_to_account',
                amount: 100
            }
        };
        const httpResponse = await sut.handle(httpRequest);
        expect(httpResponse).toEqual(insufficient('Insufficient balance'));
    });
});
