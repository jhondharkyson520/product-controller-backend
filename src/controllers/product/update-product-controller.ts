
import { Request, Response } from 'express';
import { PrismaProductRepository } from '../../repositories/product/prisma-product-repository';
import { UpdateProduct } from '../../use-cases/product/update-product';

const productRepository = new PrismaProductRepository;
const updateProduct = new UpdateProduct(productRepository);

export const updateProductController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const {name, amount, value} = req.body;
        const product = await updateProduct.execute(id, name, amount, value);

        if (product) {
            return res.status(200).json({ 
                message: 'Product update successfully', 
                product
            });
        }
        return res.status(404).json({ error: 'Product not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
