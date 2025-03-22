import { Request, Response } from "express";
import { PrismaStockRepository } from "../../repositories/stock/prisma-stock-repository";
import { GetAllStocks } from "../../use-cases/stock/get-all-stocks-release";

const stockRepository = new PrismaStockRepository();
const findAllStocks = new GetAllStocks(stockRepository);

export const getAllStocksController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const stock = await findAllStocks.execute();
        console.log('stock controller: ', stock);
        

        return res.status(200).json({
            success: 'Stocks list',
            stock,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
