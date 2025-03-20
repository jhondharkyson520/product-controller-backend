import { StockMovement } from "./stock-movement";

export interface Product {
    id: string;
    name: string;
    amount: number;    
    value: number;
    createdAt: Date;
    updatedAt: Date;
    stockMovements?: StockMovement[];
}