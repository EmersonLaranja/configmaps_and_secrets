import { AddAccountController } from "../../controllers/account/add-account-controller";
import { LogErrorControllerDecorator } from "../../decorators/log-error";
import { AccountRepository } from "../../repositories/account-repository";
import LogErrorRepository from "../../repositories/log-error-repository";
import { addAccountValidationFactory } from "./add-account-validation-factory";

export const addAccountControllerFactory = () => {
    const addAccountController = new AddAccountController(
        new AccountRepository(),
        addAccountValidationFactory()
    );

    return new LogErrorControllerDecorator(
        addAccountController,
        new LogErrorRepository()
    );
};
