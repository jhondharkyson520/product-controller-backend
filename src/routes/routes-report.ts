import { Request, Router } from 'express';
import { Response } from 'express-serve-static-core';
import authenticateToken from '../middlewares/authorization-routes';
import { getTotalSpentByMonthController } from '../controllers/report/get-total-spent-by-month-controller';

const routesReport = Router();

routesReport.get('/total-spent-by-month', authenticateToken, async (req: Request, res: Response) => {
    await getTotalSpentByMonthController(req, res);
});

export {routesReport};
