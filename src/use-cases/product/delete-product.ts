import { ProductRepository } from "../../repositories/product/product-repository";

export class DeleteProduct {
    constructor(private productRepository: ProductRepository) {}

    async execute(id: string) {
        try {
            const deletedProduct = await this.productRepository.delete(id);
            if (!deletedProduct) {
                throw new Error("Product not found.");
            }
            return deletedProduct;
        } catch (error: any) {
            console.error("Erro ao deletar o produto:", error);
            if (error.code === 'P2025') {
                return null;
            }
            throw new Error("Error delete product.");
        }
    }
}
