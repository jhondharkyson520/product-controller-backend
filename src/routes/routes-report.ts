import { Request, Router } from 'express';
import { Response } from 'express-serve-static-core';
import authenticateToken from '../middlewares/authorization-routes';
import { getTotalSpentByMonthController } from '../controllers/report/get-total-spent-by-month-controller';
import { getTotalProductUsageByPeriodController } from '../controllers/report/get-total-product-usage-by-period-controller';

const routesReport = Router();

routesReport.get('/total-spent-by-month', authenticateToken, async (req: Request, res: Response) => {
    await getTotalSpentByMonthController(req, res);
});

routesReport.get('/total-product-usage-by-period', authenticateToken, async(req: Request, res: Response) => {
    await getTotalProductUsageByPeriodController(req, res);
});

export {routesReport};
