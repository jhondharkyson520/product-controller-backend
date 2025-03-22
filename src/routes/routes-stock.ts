import { Request, Response, Router } from "express";
import authenticateToken  from "../middlewares/authorization-routes";
import { createStockController } from "../controllers/stock/create-stock-controller";
import { getAllStocksController } from "../controllers/stock/get-all-stocks-controller";

const routesStock = Router();

routesStock.post('/create', authenticateToken, async (req: Request, res: Response) => {
    await createStockController(req, res);
});
routesStock.get('/get-all-stocks', authenticateToken, async (req: Request, res: Response) => {
    await getAllStocksController(req, res);
});
export default routesStock;
