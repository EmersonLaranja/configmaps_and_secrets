import { DataSource } from 'typeorm'
import { Account } from '../models/account'

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    synchronize: true,
    logging: true,
    entities: [__dirname + "/../models/**/*.js"],
    migrations: [],
    subscribers: []
})