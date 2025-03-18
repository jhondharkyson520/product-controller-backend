import { ProductRepository } from '../../repositories/product/product-repository';

export class GetAllProducts {
    constructor(private productRepository: ProductRepository) {}

    async execute() {        
        const product = await this.productRepository.findAll();
        return {product};
    }
}
