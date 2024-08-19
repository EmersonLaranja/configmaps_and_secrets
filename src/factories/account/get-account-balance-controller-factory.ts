import { GetAccountBalanceController } from "../../controllers/account/get-account-balance-controller";
import { LogErrorControllerDecorator } from "../../decorators/log-error";
import { AccountRepository } from "../../repositories/account-repository";
import LogErrorRepository from "../../repositories/log-error-repository";
import { getAccountBalanceValidationFactory } from "./get-account-balance-validation-factory";

export const getAccountBalanceControllerFactory = () => {
    const getAccountBalanceController = new GetAccountBalanceController(
        new AccountRepository(),
        getAccountBalanceValidationFactory()
    );

    return new LogErrorControllerDecorator(
        getAccountBalanceController,
        new LogErrorRepository()
    );
};
