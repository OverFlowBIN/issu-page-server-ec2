import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'src/decorator/typeorm-ex.module.ts';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // 유저를 인증하기위해 사용할 기본 strategy를 명시 해주기, 여기서는 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [AuthController],
  // JwtStrategy를 이 Auth 모듈에서 사용할 수 있도록 등록
  providers: [AuthService, JwtStrategy],
  // JwtStrategy, PassportModule를 다른 모듈에서 사용할 수 있게 등록
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
