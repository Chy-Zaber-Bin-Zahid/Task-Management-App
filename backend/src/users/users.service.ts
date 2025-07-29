import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { LoginUserDto } from 'src/users/dto/login-users.dto';
import { Users } from 'src/users/entity/users.entity';
import { FindOne } from 'src/users/types/users.types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepo: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<FindOne | null> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = this.userRepo.create({
        name: createUserDto.name,
        password: hashedPassword,
        email: createUserDto.email,
        role: 'user',
      });

      const savedUser = await this.userRepo.save(user);

      const { userId, name, role, email } = savedUser;
      return { userId, name, role, email };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to create user: ${error}`);
    }
  }

  async findOne(loginUserDto: LoginUserDto): Promise<FindOne | null> {
    try {
      const user = await this.userRepo.findOne({
        where: { email: loginUserDto.email },
      });

      if (!user) return null;

      const isPasswordValid = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );

      if (!isPasswordValid) return null;

      const { userId, name, role, email } = user;
      return { userId, name, role, email };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to find user: ${error}`);
    }
  }
}
