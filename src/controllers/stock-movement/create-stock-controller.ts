
import { Request, Response } from 'express';
import { PrismaStockMovementRepository } from '../../repositories/stock/prisma-stock-repository';
import { CreateStock } from '../../use-cases/stock/create-stock';


const stockMovementRepository = new PrismaStockMovementRepository();
const createStock = new CreateStock(stockMovementRepository);

export const createStockController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {productId, product, quantity, type, reason} = req.body;
        const stock =  await createStock.execute(productId, product, quantity, type, reason);

        return res.status(201).json({
            sucess: 'Stock created',
            stock: {
                id: stock.id, 
                productId: stock.productId,
                product: stock.product?.name,
                quantity: stock.quantity,
                type: stock.type,
                reason: stock.reason
            }
        });
    } catch(error: any) {
        console.error(error);
        if(error.message === 'Product with this name already exists') {
            return res.status(409).json({error: 'Product with this name already exists'});
        }
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}
