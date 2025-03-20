import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import { ProductRepository } from '../../repositories/product/product-repository';
import { StockMovementRepository } from '../../repositories/stock-movement/stock-movement-repository';

dotenv.config();

export class CreateProduct {
    constructor(
        private productRepository: ProductRepository,
        private stockMovementRepository: StockMovementRepository
    ) {}

    async execute(name: string, amount: number, value: number) {
        try {
            const existingProduct = await this.productRepository.findByName(name);

            if (existingProduct) {
                throw new Error('Product with this name already exists');
            }


            const product = await this.productRepository.create({
                id: uuidv4(), 
                name, 
                amount,
                value,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            await this.stockMovementRepository.create({
                id: uuidv4(),
                productId: product.id,
                quantity: amount,
                dateTime: new Date(),
                type: 'entrada',
                reason: 'Criação inicial do produto'
            });
    
            return product;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }
            throw new Error('Error to create product');
        }
    }
}
