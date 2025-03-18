import { ProductRepository } from '../../repositories/product/product-repository';

export class UpdateProduct {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: string, name: string, amount: number, value: number) {
        try {
            const updatedProduct = await this.productRepository.update(id, {name, amount, value});
            return updatedProduct;
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            throw new Error("Error to update product.");
        }
    }
}
