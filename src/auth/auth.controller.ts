import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credention.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signin(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // 토큰을 확인하고 validate 한 후 req안에 유저 정보를 넣어준다.
  test(@GetUser() user: User) {
    console.log('req', user);
  }
}
