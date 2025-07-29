import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { LoginAuthDto } from 'src/auth/dto/login-auth.dto';
import { SignIn } from 'src/auth/types/auth.types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(loginAuthDto: LoginAuthDto): Promise<SignIn | null> {
    try {
      const user = await this.usersService.findOne(loginAuthDto);
      if (!user) {
        return null;
      }
      return {
        message: 'User authenticated successfully',
        access_token: await this.jwtService.signAsync({
          sub: user.userId,
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException(`Authentication failed: ${error}`);
    }
  }

  async register(createAuthDto: CreateAuthDto): Promise<SignIn | null> {
    try {
      const user = await this.usersService.create(createAuthDto);
      console.log(user);
      if (!user) {
        return null;
      }
      return {
        message: 'User register successfully',
      };
    } catch (error) {
      throw new UnauthorizedException(`Register failed: ${error}`);
    }
  }
}
