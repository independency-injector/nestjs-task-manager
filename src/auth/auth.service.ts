import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';   
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        ){}

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.SignUp(authCredentialDto);
    }

    async signIn(authCredentialDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const username = await this.userRepository.validatePassword(authCredentialDto);
        
        if(!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }
}
