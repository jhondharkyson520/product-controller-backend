import { v4 as uuidv4 } from 'uuid';
import dotenv from "dotenv";
import { StockMovementRepository } from '../../repositories/stock/stock-repository';

dotenv.config();

export class CreateStock {
    constructor(
        private stockMovementRepository: StockMovementRepository
    ) {}

    async execute(productId: string, product: string, quantity: number, type: 'entrada' | 'saida', reason: string) {
        try {

            const newStockMovement = await this.stockMovementRepository.create({
                id: uuidv4(),
                productId: productId,
                product: product,
                quantity: quantity,
                dateTime: new Date(),
                type: type,
                reason: reason
            });

            return newStockMovement;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }
            throw new Error('Error to create product');
        }
    }
}
