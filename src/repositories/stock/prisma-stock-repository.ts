import { prisma } from "../../database/prisma-client";
import { Stock } from "../../entities/stock";
import { StockRepository } from "./stock-repository";

export class PrismaStockRepository implements StockRepository {    
    async create(stock: Omit<Stock, 'product'>): Promise<Stock> {
        const createdStock = await prisma.stockMovement.create({
            data: {
                id: stock.id,
                productId: stock.productId,
                quantity: stock.quantity,
                dateTime: stock.dateTime,
                type: stock.type,
                reason: stock.reason,
            },
        });

        return {
            id: createdStock.id,
            productId: createdStock.productId,
            quantity: createdStock.quantity,
            dateTime: createdStock.dateTime,
            type: createdStock.type as 'entrada' | 'saida',
            reason: createdStock.reason || undefined,
        };
    }

    async findAll(): Promise<Stock[]> {
        const stock = await prisma.stockMovement.findMany({
            include: {
                product: true,
            }
        });
        //console.log('Resultados do Prisma:', stock);
        return stock.map(stock => ({
            id: stock.id,
            productId: stock.productId,
            product: stock.product,
            quantity: stock.quantity,
            dateTime: stock.dateTime,
            type: stock.type as 'entrada' | 'saida',
            reason: stock.reason || undefined
        }));
    }
}
