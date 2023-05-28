import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credention.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    /* return을 안하게 되면 error 상황에 대한 return이 안된다. */
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { username };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
