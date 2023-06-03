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
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBody,
  ApiResponse,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /* 회원가입 */
  @Post('/signup')
  @ApiOperation({
    summary: '회원가입',
  })
  @ApiCreatedResponse({
    description: '회원가입',
    type: User,
    isArray: true,
  })
  @ApiBody({ type: AuthCredentialDto })
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  /* 로그인 */
  @Post('/signin')
  @ApiOperation({
    summary: '로그인',
  })
  @ApiCreatedResponse({
    description: '토큰발급',
    schema: {
      example: { accessToken: 'Bearer token' },
    },
  })
  @ApiBody({ type: AuthCredentialDto })
  signin(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  /* 토큰 검토 */
  @Post('/token')
  @ApiOperation({
    summary: '토큰 검토 middleware',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Access token for authentication',
    example: 'Bearer <access_token>',
  })
  @UseGuards(AuthGuard()) // 토큰을 확인하고 validate 한 후 req안에 유저 정보를 넣어준다.
  test(@GetUser() user: User) {
    console.log('req', user);
  }
}
