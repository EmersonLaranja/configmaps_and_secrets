import { AddAccountController } from "../../controllers/account/add-account-controller";
import { Validation } from "../../interfaces/validation";
import { IAccountRepository } from "../../repositories/interfaces/interface-account-repository";
import { MissingParamError } from "../../utils/errors/missing-param-error";
import { ServerError } from "../../utils/errors/server-error";
import { badRequest, conflict, created, serverError } from "../../utils/httpResponses/http-responses";
import { makeAccountRepository } from "../mocks/make-account-repository";
import { makeFakeAccount } from "../mocks/make-fake-account";
import { makeFakeCreateAccountRequest } from "../mocks/make-fake-create-account-request";
import { makeValidation } from "../mocks/make-validation";


interface SutTypes {
    sut: AddAccountController;
    accountRepositoryStub: IAccountRepository;
    validationStub: Validation;
}


const makeSut = (): SutTypes => {
    const accountRepositoryStub = makeAccountRepository();
    const validationStub = makeValidation();
    const sut = new AddAccountController(accountRepositoryStub, validationStub);
    return { sut, accountRepositoryStub, validationStub };
};

describe("AddAccount Controller", () => {
    test("Should call AddAccount with correct values", async () => {
        const { sut, accountRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(accountRepositoryStub, "createAccount");
        await sut.handle(makeFakeCreateAccountRequest());
        expect(addSpy).toHaveBeenCalledWith({ account_number: "any_account_number" });
    });

    test("Should return 500 if AddAccount throws", async () => {
        const { sut, accountRepositoryStub } = makeSut();
        jest.spyOn(accountRepositoryStub, "createAccount").mockImplementationOnce(async () => Promise.reject(new Error()));

        const httpResponse = await sut.handle(makeFakeCreateAccountRequest());
        expect(httpResponse).toEqual(serverError(new ServerError()));
    });

    test("Should call Validation with correct value", async () => {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, "validate");
        const httpRequest = makeFakeCreateAccountRequest();
        await sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    });

    test("Should return 400 if Validation returns an error", async () => {
        const { sut, validationStub } = makeSut();

        jest.spyOn(validationStub, "validate").mockReturnValueOnce(new MissingParamError("any_field"));
        const httpResponse = await sut.handle(makeFakeCreateAccountRequest());
        expect(httpResponse).toEqual(badRequest(new MissingParamError("any_field")));
    });

    test("Should return 409 if account already exists", async () => {
        const { sut, accountRepositoryStub } = makeSut();
        jest.spyOn(accountRepositoryStub, "getAccount").mockReturnValueOnce(
            Promise.resolve(makeFakeAccount()))

        const httpResponse = await sut.handle(makeFakeCreateAccountRequest());
        expect(httpResponse).toEqual(conflict("Account"));
    });

    test('Should return 201 if valid data is provided', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeCreateAccountRequest())
        expect(httpResponse).toEqual(created(makeFakeAccount()))
    })
});
