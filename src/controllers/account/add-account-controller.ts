import { Controller } from "../../interfaces/controller";
import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../interfaces/validation";
import { IAccountRepository } from "../../repositories/interfaces/interface-account-repository";
import { badRequest, conflict, created, serverError } from "../../utils/httpResponses/http-responses";

export class AddAccountController implements Controller {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly validation: Validation
    ) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            const error = this.validation.validate(httpRequest.body);

            if (error) {
                return badRequest(error);
            }

            const { account_number } = httpRequest.body;

            const accountExists = await this.accountRepository.getAccount(account_number)
            if (accountExists) {
                return conflict("Account")
            }

            const account = await this.accountRepository.createAccount({ account_number })
            return created(account);
        } catch (error) {
            return serverError(error);
        }
    }
}
