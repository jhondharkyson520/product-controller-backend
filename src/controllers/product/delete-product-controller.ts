
import { Request, Response } from 'express';
import { DeleteProduct } from '../../use-cases/product/delete-product';
import { PrismaProductRepository } from '../../repositories/product/prisma-product-repository';

const productRepository = new PrismaProductRepository
const deleteProduct = new DeleteProduct(productRepository);

export const deleteProductController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const deletedProduct = await deleteProduct.execute(id);

        if (deletedProduct) {
            return res.status(200).json({ 
                message: 'Product deleted successfully', 
                deletedProduct
            });
        }
        return res.status(404).json({ error: 'Product not found' });
    } catch (error: any) {
        console.error(error);
        if(error.message === 'Error delete product.'){
            return res.status(500).json({ error: 'Error deleting product' });
        } else if(error.message === 'User not found.') {
            return res.status(500).json({ error: 'Product not found.' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
