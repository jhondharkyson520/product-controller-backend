import { Stock} from "./stock";

export interface Product {
    id: string;
    name: string;
    amount: number;    
    value: number;
    createdAt: Date;
    updatedAt: Date;
    stockMovements?: Stock[];
}
