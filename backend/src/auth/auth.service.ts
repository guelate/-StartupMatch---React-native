import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    //register user
    async register({ name, email, password, role }: RegisterDto) {

        const existingUser = await this.prisma.user.findUnique({
            where: { email }
        })

        //check if user exists
        if (existingUser) {
            throw new ConflictException("Email already exists")
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            }
        })


        //JWT token 
        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        })

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                bio: user.bio,
            }
        }

    }

    //login user 
    async login({ email, password }: LoginDto) {

        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        //check if user exists
        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }

        //check password 
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            throw new UnauthorizedException("invalid credentials")
        }

        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        })

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                bio: user.bio,

            }
        }

    }

    //check current user
    async me(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                bio: true,
                createdAt: true,
            }
        })
    }
}


