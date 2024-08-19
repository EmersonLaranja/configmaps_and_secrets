import { Controller } from "../../interfaces/controller";
import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../interfaces/validation";
import { IAccountRepository } from "../../repositories/interfaces/interface-account-repository";
import { badRequest, notFound, ok, serverError } from "../../utils/httpResponses/http-responses";

export class GetAccountBalanceController implements Controller {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly validation: Validation
    ) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            const error = this.validation.validate(httpRequest.params);

            if (error) {
                return badRequest(error);
            }

            const { accountNumber } = httpRequest.params;

            const accountExists = await this.accountRepository.getAccount(accountNumber)
            if (!accountExists) {
                return notFound("Account")
            }

            const { balance } = accountExists
            return ok({ balance });

        } catch (error) {
            return serverError(error);
        }
    }
}
