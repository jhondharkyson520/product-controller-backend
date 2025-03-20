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
}
