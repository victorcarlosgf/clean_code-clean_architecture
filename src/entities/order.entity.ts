import Client from './client.entity';
import Product from './product.entity';

export default class Order {
  constructor(
    readonly client: Client,
    readonly products: Product[]
  ) { }

  getTotal() {
    let total = 0;
    for (const product of this.products) {
      total += product.value;
    }
    return total;
  }
}