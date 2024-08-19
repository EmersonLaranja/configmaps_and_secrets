import { Express, Router } from "express";
import accountRoutes from "./account";

export const configureRoutes = (app: Express): void => {
    const router = Router();
    app.use("/api/v1", router);
    accountRoutes(router);

    app.use((req, res, next) => {
        res.status(404).json({
            erro: "Not Found",
            status: 404,
            mensagem: "The requested route was not found.",
        });
    });
};
