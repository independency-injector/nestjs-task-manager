import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcryptjs from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async SignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password} = authCredentialsDto;

        const user = new User();
        const salt = await bcryptjs.genSalt(10);
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        try {
        await user.save();
        } catch (ex) {
            if(ex.code === '23505') {
                throw new ConflictException('Username already exists');
            }
                throw new InternalServerErrorException();
        }
    }

    async hashPassword(password: string, salt: string) {
        return bcryptjs.hash(password, salt);
    }

    async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({username});
        if(user && await user.validatePassword(password)) {
            return user.username;
        }
        return null;
    }
}