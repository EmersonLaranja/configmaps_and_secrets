import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './account';

@Entity()
export class Transfer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column({ type: "float" })
    amount: number;
}
