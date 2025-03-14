import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import { ProductRepository } from '../../repositories/product/product-repository';

dotenv.config();

export class CreateProduct {
    constructor(private productRepository: ProductRepository) {}

    async execute(name: string, amount: number, value: number, createdAt: Date, updatedAt: Date) {
        const product = await this.productRepository.create({
            id: uuidv4(), 
            name, 
            amount,
            value,
            createdAt: new Date(),
            updatedAt
        });

        return product;
    }
}
