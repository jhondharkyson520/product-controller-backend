import { StockMovement } from "../../entities/stock";
import { StockMovementRepository } from "../../repositories/stock/stock-repository";
import { ProductUsageByPeriod } from "../interfaces/product-usage-by-period-interface";

export class ProductUsageByPeriodService {
  constructor(private stockMovement: StockMovementRepository) {}

  async execute(startDate: Date, endDate: Date): Promise<ProductUsageByPeriod[]> {
    const stockMovements = await this.stockMovement.findAll();
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    const filteredStocks = stockMovements.filter((stock) => {
      console.log(
        `Checking: ${stock.dateTime} - (${stock.dateTime >= startDate && stock.dateTime <= endDate ? "✅ Pass" : "❌ Fail"})`
      );
      return stock.dateTime >= startDate && stock.dateTime <= endDate;
    });
    
    console.log("Filtered Stocks:", filteredStocks);
    const productTotals: {[name: string]: number} = {};

    filteredStocks.forEach((stock: StockMovement) => {
      const name = stock.product?.name;
      const total = stock.quantity;
      
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
