import { Request, Response } from "express";
import { PrismaStockMovementRepository } from "../../repositories/stock-movement/prisma-stock-movement-repository";
import { ProductUsageByPeriodService } from "../../services/report/product-usage-by-period-service";


export const getTotalProductUsageByPeriodController = async (req: Request, res: Response) => {
  try {
    const {startDate, endDate} = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    const startDateParsed = new Date(startDate.toString());
    const endDateParsed = new Date(endDate.toString());
    const stockRepository = new PrismaStockMovementRepository();
    const service = new ProductUsageByPeriodService(stockRepository);
    const report = await service.execute(startDateParsed, endDateParsed);
    console.log(report);
    
    return res.status(200).json(report);
  } catch (error) {
    console.error('Error in getTotalSpentByMonthController:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
