import { Request, Router } from 'express';
import { Response } from 'express-serve-static-core';
import authenticateToken from '../middlewares/authorization-routes';
import { getTotalSpentByMonthController } from '../controllers/report/get-total-spent-by-month-controller';
import { getTotalProductStockByPeriodController } from '../controllers/report/get-product-total-in-stock-period-controller';

const routesReport = Router();

routesReport.get('/total-spent-by-month', authenticateToken, async (req: Request, res: Response) => {
    await getTotalSpentByMonthController(req, res);
});

routesReport.get('/product-stock-period', authenticateToken, async(req: Request, res: Response) => {
    await getTotalProductStockByPeriodController(req, res);
});

export {routesReport};
