import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { addAccountControllerFactory } from "../factories/account/add-account-controller-factory";
import { getAccountBalanceControllerFactory } from "../factories/account/get-account-balance-controller-factory";
import { depositIntoAccountControllerFactory } from "../factories/deposit/deposit-into-account-controller-factory";
import { makeAccountTransferControllerFactory } from "../factories/transfer/make-account-transfer-controller-factory";

export default (router: Router): void => {
    router.post(
        "/accounts",
        expressRouteAdapter(addAccountControllerFactory())
    );
    router.get(
        "/accounts/:accountNumber/balance",
        expressRouteAdapter(getAccountBalanceControllerFactory())
    );

    router.post(
        "/accounts/:account_number/deposit",
        expressRouteAdapter(depositIntoAccountControllerFactory())
    );

    router.post(
        "/accounts/transfer",
        expressRouteAdapter(makeAccountTransferControllerFactory())
    );



};