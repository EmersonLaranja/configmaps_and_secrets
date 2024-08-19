import { MakeAccountTransferController } from "../../controllers/transfer/make-account-transfer-controller";
import { LogErrorControllerDecorator } from "../../decorators/log-error";
import { AccountRepository } from "../../repositories/account-repository";
import LogErrorRepository from "../../repositories/log-error-repository";
import { TransferRepository } from "../../repositories/transfer-repository";
import { makeAccountTransferValidationFactory } from "./make-account-transfer-validation-factory";

export const makeAccountTransferControllerFactory = () => {
    const makeAccountTransferController = new MakeAccountTransferController(
        new TransferRepository(),
        makeAccountTransferValidationFactory()
    );

    return new LogErrorControllerDecorator(
        makeAccountTransferController,
        new LogErrorRepository()
    );
};
