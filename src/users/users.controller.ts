/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, UseGuards, Request, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //register
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //login
  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    return this.usersService.login(email, password);
  }

  //viewprofile
  @Get('viewProfile')
  @UseGuards(JwtAuthGuard)
  async viewProfile(@Req() request: Request): Promise<User> {
    const userId = request['user'].id;
    const userProfile = await this.usersService.viewProfile(userId);
    return userProfile;
  }
}
