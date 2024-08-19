import { AppDataSource } from "../database/data-source";
import { LogError } from "../models/log-error";
import { ILogErrorRepository } from "./interfaces/interface-log-error-repository";

export default class LogErrorRepository implements ILogErrorRepository {
    async logError(stack: string): Promise<void> {
        const errorRepository = AppDataSource.getRepository(LogError);
        await errorRepository.save({ stack });
    }
}