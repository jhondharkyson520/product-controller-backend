import { StockRepository } from '../../repositories/stock/stock-repository';

export class GetAllStocks {
    constructor(
        private stockRepository: StockRepository
    ) {}

    async execute() {
        try {
            const allStocks = await this.stockRepository.findAll();
            //console.log('allstocks service: ', allStocks);            
            return allStocks;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }
            throw new Error('Error to create product');
        }
    }
}
