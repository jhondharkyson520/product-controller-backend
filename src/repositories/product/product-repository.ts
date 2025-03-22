import { Product } from "../../entities/product";

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByName(name: string): Promise<Product | null>;
    findById(id: string): Promise<Product | null>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<Product>;
}
