import { Request, Response } from 'express';
import { GetAllProducts } from '../../use-cases/product/get-all-products';
import { PrismaProductRepository } from '../../repositories/product/prisma-product-repository';

const productRepository = new PrismaProductRepository;
const findAllProducts = new GetAllProducts(productRepository);

export const getAllProductsController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {product} =  await findAllProducts.execute();

        return res.status(200).json({
            sucess: 'Products list',
            product
        });
    } catch(error) {
        //console.error(error);        
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}
