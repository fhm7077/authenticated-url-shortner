/* eslint-disable prettier/prettier */
import { Injectable, ConflictException  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
      return { message: 'Invalid username' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { message: 'Invalid password' };
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


  
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}