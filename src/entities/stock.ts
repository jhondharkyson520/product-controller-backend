import { Product } from "./product";

export interface StockMovement {
    id: string;
    productId: string;
    product?: Product;
    quantity: number;
    dateTime: Date;
    type: 'entrada' | 'saida';
    reason?: string;    
}
