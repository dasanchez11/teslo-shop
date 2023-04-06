import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces/valid-roles';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivate(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(user);
    console.log(email);
    return { ok: true, message: 'Hello world' };
  }

  @Get('private2')
  @RoleProtected(ValidRoles.superUSer, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivate2(@GetUser() user: User) {
    return { ok: true, message: 'Hello world' };
  }

  @Get('private3')
  @Auth(ValidRoles.superUSer, ValidRoles.admin)
  testingPrivate3(@GetUser() user: User) {
    return { ok: true, message: 'Hello world', user };
  }
}
