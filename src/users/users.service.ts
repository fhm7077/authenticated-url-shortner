/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //register user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: {email : createUserDto.email} })
    if(existingUser) {
      throw new ConflictException('Email already exists');
    }
    //password hashing
    const hashedPassword =  await bcrypt.hash(createUserDto.password, 10)

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  //login user
  async login(email: string, password: string): Promise<{ message: string } | { auth: boolean; token: string; user: User }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('Invalid username');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const resp = {
      id: user.id,
      name: user.name   
  };
  
  const token = jwt.sign(resp, 'secret-key', { expiresIn: '1h' });

    return {
      message: 'Authentication Successful',
      auth: true,
      token, 
      user
    };
  }

  async viewProfile(id: number): Promise<User> {
    return this.userRepository.findOne({where: {id}})
  }
}
