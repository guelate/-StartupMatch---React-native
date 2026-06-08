import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    //find all users
    async findAllDevelopers(currentUserId: string) {
        return this.prisma.user.findMany({
            where: {
                role: "DEVELOPER",
                id: { not: currentUserId }
            },
            select: {
                id: true,
                name: true,
                bio: true,
                role: true,
                createdAt: true,
            }
        })
    }

    //find user
    async findOne(id: string) {
        const user = this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                bio: true,
                role: true,
                createdAt: true,
            }
        })

        if (!user) {
            throw new NotFoundException("User not found")
        }

        return user
    }

    //update profil
    async update(id: string, { name, bio }: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: { name, bio },
            select: {
                id: true,
                name: true,
                bio: true,
                role: true,
                createdAt: true,
            }
        })
    }
}
