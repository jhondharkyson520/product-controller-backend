import { Request, Response } from "express";
import { PrismaStockMovementRepository } from "../../repositories/stock/prisma-stock-repository";
import { ProductUsageByPeriodService } from "../../services/report/product-total-in-stock-period-service";


export const getTotalProductStockByPeriodController = async (req: Request, res: Response) => {
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
    console.log('teste',report);
    if(report.length == 0){
      console.log('passooou');
      
      return res.status(404).json({ error: 'Not data for this date' });
    }
    
    return res.status(200).json(report);
  } catch (error) {
    console.error('Error in getTotalSpentByMonthController:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
