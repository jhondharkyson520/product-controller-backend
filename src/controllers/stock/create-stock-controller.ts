
import { Request, Response } from 'express';
import { CreateStock } from '../../use-cases/stock/create-stock';
import { PrismaStockRepository } from '../../repositories/stock/prisma-stock-repository';
import { PrismaProductRepository } from '../../repositories/product/prisma-product-repository';


const stockRepository = new PrismaStockRepository();
const productRepository = new PrismaProductRepository();
const createStock = new CreateStock(productRepository, stockRepository);

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
        if(error.message === 'The product is already zeroed') {
            return res.status(409).json({error: 'The product is already zeroed'});
        }
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}
