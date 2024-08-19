import { Controller } from "../../interfaces/controller";
import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { Validation } from "../../interfaces/validation";
import { ITransferRepository } from "../../repositories/interfaces/interface-transfer-repository";
import { InsufficientError } from "../../utils/errors/insufficient-error";
import { badRequest, insufficient, ok, serverError } from "../../utils/httpResponses/http-responses";

export class MakeAccountTransferController implements Controller {
    constructor(
        private readonly transferRepository: ITransferRepository,
        private readonly validation: Validation
    ) { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            const error = this.validation.validate(httpRequest.body);

            if (error) {
                return badRequest(error);
            }

            const { from, to, amount } = httpRequest.body;
            const formattedAmount = Number(amount)
            await this.transferRepository.makeTransfer(from, to, formattedAmount);

            return ok({ amount: formattedAmount, from, to });
        } catch (error: any) {

            if (error instanceof InsufficientError) {
                return insufficient(error.message);
            }
            return serverError(error);
        }
    }
}