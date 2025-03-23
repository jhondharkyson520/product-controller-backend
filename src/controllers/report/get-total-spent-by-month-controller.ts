import { Request, Response } from 'express';
import { PrismaProductRepository } from '../../repositories/product/prisma-product-repository';
import { TotalSpentByMonthService } from '../../services/report/total-spent-by-month-service';

export const getTotalSpentByMonthController = async (req: Request, res: Response) => {
  try {
    const {startDate, endDate} = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    const startDateParsed = new Date(startDate.toString());
    const endDateParsed = new Date(endDate.toString());
    const productRepository = new PrismaProductRepository();
    const service = new TotalSpentByMonthService(productRepository);
    const report = await service.execute(startDateParsed, endDateParsed);

    return res.status(200).json(report);
  } catch (error) {
    //console.error('Error in getTotalSpentByMonthController:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
