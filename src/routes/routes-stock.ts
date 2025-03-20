import { Request, Response, Router } from "express";
import authenticateToken  from "../middlewares/authorization-routes";
import { createStockController } from "../controllers/stock-movement/create-stock-controller";
const routesStock = Router();

routesStock.post('/create', authenticateToken, async (req: Request, res: Response) => {
    await createStockController(req, res);
});
export default routesStock;
