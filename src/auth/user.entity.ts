import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcryptjs from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    async validatePassword(password: string): Promise<boolean> {
        const flag = await bcryptjs.compare(password, this.password);
        return flag;
    }
}