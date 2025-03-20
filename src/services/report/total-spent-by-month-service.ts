import { Product } from '../../entities/product';
import { ProductRepository } from '../../repositories/product/product-repository';
import { TotalSpentByMonthReport } from '../interfaces/total-spent-by-month-report-interface';

export class TotalSpentByMonthService {
  constructor(private productRepository: ProductRepository) {}

  async execute(startDate: Date, endDate: Date): Promise<TotalSpentByMonthReport[]> {
    const products = await this.productRepository.findAll();
    const filteredProducts = products.filter(
      (product) => product.createdAt >= startDate && product.createdAt <= endDate
    );
    const monthlyTotals: {[month: string]: number} = {};

    filteredProducts.forEach((product: Product) => {
      const month = product.createdAt.toISOString().slice(0, 7); //YYYY-MM
      const total = product.amount * product.value;

      if (monthlyTotals[month]) {
        monthlyTotals[month] += total;
      } else {
        monthlyTotals[month] = total;
      }
    });

    const report: TotalSpentByMonthReport[] = Object.entries(monthlyTotals).map(
      ([month, totalSpent]) => ({
        month,
        totalSpent,
      })
    );

    return report;
  }
}
