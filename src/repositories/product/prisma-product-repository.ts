import { prisma } from "../../database/prisma-client";
import { Product } from "../../entities/product";
import { ProductRepository } from "./product-repository";

export class PrismaProductRepository implements ProductRepository {
    async create(product: Omit<Product, 'stockMovements'>): Promise<Product> {
        return prisma.product.create({
            data: {
                id: product.id,
                name: product.name,
                amount: product.amount,
                value: product.value,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            },
        });
    }
    
    async findAll(): Promise<Product[]> {
        return prisma.product.findMany();
    }

    async findByName(name: string): Promise<Product | null> {
        return prisma.product.findFirst({
            where: {name: name}
        });
    }
    
    async update(id: string, data: Partial<Product>): Promise<Product> {
        return prisma.product.update({
            where: {id},
            data: {
                id: data.id,
                name: data.name,
                amount: data.amount,
                value: data.value,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            }
        });
    }
    delete(id: string): Promise<Product> {
        return prisma.product.delete({
            where: {id}
        })
    }    
}
