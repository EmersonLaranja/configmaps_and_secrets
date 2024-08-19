import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LogError {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    stack: string;

    @CreateDateColumn({ type: "text" })
    dataCriacao: Date;
}
