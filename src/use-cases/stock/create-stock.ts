import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import { StockRepository } from '../../repositories/stock/stock-repository';
import { Product } from '../../entities/product';
import { ProductRepository } from '../../repositories/product/product-repository';

dotenv.config();

export class CreateStock {
    constructor(
        private productRepository: ProductRepository,
        private stockRepository: StockRepository
    ) {}

    async execute(productId: string, product: Product, quantity: number, type: 'entrada' | 'saida', reason: string) {
        try {

            const newStockMovement = await this.stockRepository.create({
                id: uuidv4(),
                productId: productId,
                product: product,
                quantity: quantity,
                dateTime: new Date(),
                type: type,
                reason: reason
            });

            const existingProduct = await this.productRepository.findById(productId);
            if (!existingProduct) {
                throw new Error('Product not found');
            }
            
            const newAmount = type === 'entrada' 
                ? existingProduct.amount + quantity 
                : existingProduct.amount + (quantity);        
            
            if(newAmount < 0){
                throw new Error('The product is already zeroed')
            }

            await this.productRepository.update(productId, { amount: newAmount });

            return newStockMovement;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }
            throw new Error('Error to create product');
        }
    }
}
