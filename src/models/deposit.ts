import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account";

@Entity()
export class Deposit {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "float" })
    amount: number;

    @ManyToOne(() => Account, account => account.deposits)
    account: Account;
}