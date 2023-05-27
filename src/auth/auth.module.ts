import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'src/decorator/typeorm-ex.module.ts';
import { UserRepository } from './user.repository';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
