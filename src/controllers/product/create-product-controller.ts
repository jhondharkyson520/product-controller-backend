import { Request, Response } from 'express';
import { PrismaProductRepository } from '../../repositories/product/prisma-product-repository';
import { CreateProduct } from '../../use-cases/product/create-product';
import { PrismaStockRepository } from '../../repositories/stock/prisma-stock-repository';

const productRepository = new PrismaProductRepository();
const stockMovementRepository = new PrismaStockRepository();
const createProduct = new CreateProduct(productRepository, stockMovementRepository);

export const createProductController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const todayDate = new Date();
        const {name, amount, value} = req.body;
        const product=  await createProduct.execute(name, amount, value);

        return res.status(201).json({
            sucess: 'Product created',
            product: {
                id: product.id, 
                name: product.name, 
                amount: product.amount, 
                value: product.value, 
                createdAt: todayDate, 
                updatedAt: todayDate
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
