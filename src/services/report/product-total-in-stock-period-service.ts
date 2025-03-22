import { Stock } from "../../entities/stock";
import { StockRepository } from "../../repositories/stock/stock-repository";
import { ProductUsageByPeriod } from "../interfaces/product-usage-by-period-interface";

export class ProductUsageByPeriodService {
  constructor(private stockMovement: StockRepository) {}

  async execute(startDate: Date, endDate: Date): Promise<ProductUsageByPeriod[]> {
    const stockMovements = await this.stockMovement.findAll();
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    const filteredStocks = stockMovements.filter((stock) => {
      return stock.dateTime >= startDate && stock.dateTime <= endDate && stock.quantity <= 0;
    });
    
    //console.log("Filtered Stocks:", filteredStocks);
    const productTotals: {[name: string]: number} = {};

    filteredStocks.forEach((stock: Stock) => {
      const name = stock.product?.name;
      const total = stock.quantity * (-1);
      
      if(name) {
        if(productTotals[name]) {
          productTotals[name] += total;
        } else {
          productTotals[name] = total;
        }
      }

    });

    const report: ProductUsageByPeriod[] = Object.entries(productTotals).map(
      ([name, totalUsage]) => ({
        name,
        totalUsage,
      })
    );    

    return report;
  }
}
