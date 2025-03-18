import { Request, Response, Router } from "express";
import authenticateToken  from "../middlewares/authorization-routes";
import { createProductController } from "../controllers/product/create-product-controller";
import { getAllProductsController } from "../controllers/product/get-all-products-controller";
import { updateProductController } from "../controllers/product/update-product-controller";
import { deleteProductController } from "../controllers/product/delete-product-controller";

const routesProduct = Router();

routesProduct.post('/create', authenticateToken, async (req: Request, res: Response) => {
    await createProductController(req, res);
});
routesProduct.get('/all-products', authenticateToken, async (req: Request, res: Response) => {    
    await getAllProductsController(req, res);
});
routesProduct.put('/update/:id', authenticateToken, async (req: Request, res: Response) => {    
    await updateProductController(req, res);
});
routesProduct.delete('/delete/:id', authenticateToken, async (req: Request, res: Response) => {    
    await deleteProductController(req, res);
});

export default routesProduct;
