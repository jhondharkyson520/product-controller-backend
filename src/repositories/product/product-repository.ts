import { Product } from "../../entities/product";

export interface ProductRepository {
    create(product: Product): Promise<Product>;
    findAll(): Promise<Product[]>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<Product>;
}
