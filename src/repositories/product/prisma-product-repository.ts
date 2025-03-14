import { prisma } from "../../database/prisma-client";
import { Product } from "../../entities/product";
import { ProductRepository } from "./product-repository";

export class PrismaProductRepository implements ProductRepository {
    async create(product: Product): Promise<Product> {
        return prisma.product.create({
            data: product
        });
    }
    async findAll(): Promise<Product[]> {
        return prisma.product.findMany();
    }
    async findByName(name: string): Promise<Product | null> {
        return prisma.product.findUnique({
            where: { name }
        });
    }
    async update(id: string, data: Partial<Product>): Promise<Product> {
        return prisma.product.update({
            where: {id},
            data
        });
    }
    delete(id: string): Promise<Product> {
        return prisma.product.delete({
            where: {id}
        })
    }    
}
