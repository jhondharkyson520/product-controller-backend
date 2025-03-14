import { prisma } from "../../database/prisma-client";
import { User } from "../../entities/user";
import { UserRepository } from "./user-repository";

export class PrismaUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        return prisma.user.create({
            data: user
        });
    }
    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }
    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email }
        });
    }
    async update(id: string, data: Partial<User>): Promise<User> {
        return prisma.user.update({
            where: {id},
            data
        });
    }
    delete(id: string): Promise<User> {
        return prisma.user.delete({
            where: {id}
        })
    }    
}
