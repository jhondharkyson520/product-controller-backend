
import { Request, Response } from 'express';
import { PrismaProductRepository } from '../../repositories/product/prisma-product-repository';
import { CreateProduct } from '../../use-cases/product/create-product';

const productRepository = new PrismaProductRepository
const createProduct = new CreateProduct(productRepository);

export const createProductController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {name, amount, value, createdAt, updatedAt} = req.body;
        const product=  await createProduct.execute(name, amount, value, createdAt, updatedAt);

        return res.status(201).json({
            sucess: 'Product created',
            user: {
                id: product.id, 
                name: product.name, 
                amount: product.amount, 
                value: product.value, 
                createdAt: product.createdAt, 
                updatedAt: product.updatedAt
            }
        });
    } catch(error) {
        console.error(error);        
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}
