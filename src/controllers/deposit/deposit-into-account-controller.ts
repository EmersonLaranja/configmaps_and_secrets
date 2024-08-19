import { Controller } from "../../interfaces/controller";
import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../interfaces/validation";
import { IAccountRepository } from "../../repositories/interfaces/interface-account-repository";
import { IDepositRepository } from "../../repositories/interfaces/interface-deposit-repository";
import { badRequest, notFound, ok, serverError } from "../../utils/httpResponses/http-responses";

export class DepositIntoAccountController implements Controller {
    constructor(
        private readonly accountRepository: IAccountRepository,
        private readonly depositRepository: IDepositRepository,
        private readonly validation: Validation
    ) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            const combinedRequest = {
                ...httpRequest.params,
                ...httpRequest.body
            };
            const error = this.validation.validate(combinedRequest);

            if (error) {
                return badRequest(error);
            }

            const { amount } = httpRequest.body;
            const { account_number } = httpRequest.params;

            const accountExists = await this.accountRepository.getAccount(account_number)
            if (!accountExists) {
                return notFound("Account")
            }


            const deposit = await this.depositRepository.depositIntoAccount(account_number, amount);
            //a documentação atual pede para não retornar as informações do deposito, mas apenas um status 200

            return ok();
        } catch (error) {
            return serverError(error);
        }
    }
}
