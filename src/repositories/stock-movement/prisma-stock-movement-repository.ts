import { prisma } from "../../database/prisma-client";
import { StockMovement } from "../../entities/stock-movement";
import { StockMovementRepository } from "./stock-movement-repository";

export class PrismaStockMovementRepository implements StockMovementRepository {    
    async create(stock: Omit<StockMovement, 'product'>): Promise<StockMovement> {
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

    async findAll(): Promise<StockMovement[]> {
        const stockMovements = await prisma.stockMovement.findMany({
            include: {
                product: true,
            }
        });
        console.log('Resultados do Prisma:', stockMovements);
        return stockMovements.map(stock => ({
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
