import { Controller } from "../interfaces/controller";
import { HttpRequest, HttpResponse } from "../interfaces/http";
import { ILogErrorRepository } from "../repositories/interfaces/interface-log-error-repository";

export class LogErrorControllerDecorator implements Controller {
    constructor(
        private readonly controller: Controller,
        private readonly logErrorRepository: ILogErrorRepository
    ) { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse = await this.controller.handle(httpRequest);
        if (httpResponse.statusCode === 500) {
            await this.logErrorRepository?.logError(httpResponse.body.stack);
        }
        return httpResponse;
    }
}
