import { StockMovement } from "../../entities/stock-movement";
import { StockMovementRepository } from "../../repositories/stock-movement/stock-movement-repository";
import { ProductUsageByPeriod } from "../interfaces/product-usage-by-period-interface";

export class ProductUsageByPeriodService {
  constructor(private stockMovement: StockMovementRepository) {}

  async execute(startDate: Date, endDate: Date): Promise<ProductUsageByPeriod[]> {
    const stockMovements = await this.stockMovement.findAll();
    const filteredStocks = stockMovements.filter(
      (stock) => stock.dateTime >= startDate && stock.dateTime <= endDate
    );
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
