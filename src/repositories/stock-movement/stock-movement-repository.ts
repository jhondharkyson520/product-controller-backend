import { StockMovement } from "../../entities/stock-movement"; 

export interface StockMovementRepository {
    create(stock: StockMovement): Promise<StockMovement>;
}
