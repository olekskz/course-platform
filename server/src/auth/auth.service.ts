import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import {  CreateUserDto, LoginUserDto } from './dto/create-auth.dto';
import { RegisterUser, LoginUser } from './user.model';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async RegisterUser({ email, password }: CreateUserDto): Promise<RegisterUser> {
    try {
      const hashedPassword = await hash(password, 10);
  
      const existingUser = await this.prisma.user.findUnique({
        where: { email: email },
      });
  
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
  
      const newUser = await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
        }
      })

      return newUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Failed to create user');
    }
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id,
      role: user.role,      
      iat: Math.floor(Date.now() / 1000),
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      email: user.email,
      role: user.role
    };
  }

  async LoginUser({ email, password }: LoginUserDto): Promise<LoginUser> {
    const instructor = await this.prisma.instructor.findFirst({
      where: { email: email },
    });
    
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user && !instructor) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user) {
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user
    } else if (instructor) {
      const isPasswordValid = await compare(password, instructor.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return instructor
    }
    
    throw new UnauthorizedException('Invalid credentials');
  }

}
