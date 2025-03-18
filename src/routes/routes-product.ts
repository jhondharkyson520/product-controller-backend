import { Request, Response, Router } from "express";
import authenticateToken  from "../middlewares/authorization-routes";
import { createProductController } from "../controllers/product/create-product-controller";

const routesProduct = Router();
routesProduct.post('/create', authenticateToken, async (req, res) => {
    await createProductController(req, res);
});
routesProduct.get('/hello', authenticateToken, (req: Request, res: Response) => {    
  res.status(200).json({ message: 'Hello world' });
});
export default routesProduct;
