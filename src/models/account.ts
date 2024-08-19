import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Deposit } from "./deposit";
import { Transfer } from "./transfer";

@Entity()
export class Account {
    @PrimaryColumn()
    account_number: string;

    @Column({ default: 0, type: "float" })
    balance!: number;

    @OneToMany(() => Deposit, deposit => deposit.account)
    deposits?: Deposit[];

}