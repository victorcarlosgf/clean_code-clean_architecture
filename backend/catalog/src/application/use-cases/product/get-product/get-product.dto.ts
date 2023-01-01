import Product from '../../../../domain/entities/product.entity';

export type GetProductInput = {
  name: string
};

export type GetProductOutput = Product;