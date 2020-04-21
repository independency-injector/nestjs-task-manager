import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository)
        {}

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.SignUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialsDto) {
        const user = await this.userRepository.validatePassword(authCredentialDto);
        
        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
