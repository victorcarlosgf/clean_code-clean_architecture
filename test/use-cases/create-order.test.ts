import CreateOrder from "../../src/application/use-cases/order/create-order/create-order.usecase";
import { CreateOrderInput } from "../../src/application/use-cases/order/create-order/create-order.dto";
import ICustomerRepository from "../../src/domain/repository/customer.interface.rep";
import IProductRepository from "../../src/domain/repository/product.interface.rep";
import IOrderRepository from "../../src/domain/repository/order.interface.rep";
import ICouponRepository from "../../src/domain/repository/coupon.interface.rep";

const product1: any = {
  id: '1',
  name: "Tenis nike",
  description: "Tenis nike 39",
  volume: 20,
  density: 3,
  value: 50
};

const product2: any = {
  id: '2',
  name: "Tenis adidas",
  description: "Tenis nike 39",
  volume: 20,
  density: 3,
  value: 50
};

const product3: any = {
  id: '3',
  name: "Tenis adidas",
  description: "Tenis nike 39",
  volume: 20,
  density: 3,
  value: 50
};

const item1: any = {
  productId: product1.id,
  quantity: 3,
};

const item2: any = {
  productId: product2.id,
  quantity: 5
};

const item3: any = {
  productId: product3.id,
  quantity: 5
};

const items: any = [];
items.push(item1);
items.push(item2);
items.push(item3);

const createOrderInput: CreateOrderInput = {
  customerDocument: '714.602.380-01',
  items: items,
}

describe('Create Order', () => {
  test("Não deve fazer um pedido com cpf inválido", async () => {

    const customerRepository: ICustomerRepository = {
      async findByDocument(customerDocument: string): Promise<any> {
        const customer = {
          id: '0418c364-91cd-4ddf-af47-fadcba998496',
          name: "Victor Freitas",
          document: "67192650160",
          email: "batman@gmail.com",
          createdAt: "2022-11-24T18:27:08.087Z"
        };

        return customer;
      },
      async save() { }
    }

    const productRepository: IProductRepository = {
      async findByName() { return product1 },
      async save() { }
    }

    const orderRepository: IOrderRepository = {
      async save() { },
      async findByCode() { },
      async findByDocument() { },
    }

    const createOrder = new CreateOrder(
      customerRepository,
      productRepository,
      orderRepository
    );
    await expect(async () => await createOrder.execute(createOrderInput))
      .rejects
      .toThrow(new Error('Document invalid'));
  });

  // test("Deve fazer um pedido com 3 produtos", async function () {
  //   const input = {
  //     cpf: "987.654.321-00",
  //     items: [
  //       { idProduct: 1, quantity: 1 },
  //       { idProduct: 2, quantity: 1 },
  //       { idProduct: 3, quantity: 3 }
  //     ]
  //   };

  //   const customerRepository: ICustomerRepository = {
  //     async findByDocument(customerDocument: string): Promise<any> {
  //       const customer = {
  //         id: '0418c364-91cd-4ddf-af47-fadcba998496',
  //         name: "Victor Freitas",
  //         document: "67192650160",
  //         createdAt: "2022-11-24T18:27:08.087Z"
  //       };

  //       return customer;
  //     },
  //     async save() { }
  //   };

  //   const productRepository: IProductRepository = {
  //     async save() { },
  //     async findByName(productName: string): Promise<any> {
  //       const products: { [productName: string]: any } = {
  //         1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3 },
  //         2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22 },
  //         3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9 }
  //       }
  //       return products[productName];
  //     }
  //   };

  //   const couponRepository: ICouponRepository = {
  //     async save(order: any): Promise<void> {
  //     },
  //     async findByCode(code: string): Promise<any> {
  //       const coupons: any = {
  //         "VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00") },
  //         "VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00") }
  //       }
  //       return coupons[code];
  //     }
  //   }

  //   const orderRepository: IOrderRepository = {
  //     async save(order: any): Promise<void> {
  //     },
  //     async findByDocument(cpf: string): Promise<any> {
  //     },
  //   }
  //   const checkout = new CreateOrder(
  //     customerRepository,
  //     productRepository,
  //     couponRepository,
  //     orderRepository
  //   );
  //   const output = await checkout.execute(input);
  //   expect(output.total).toBe(6350);
  // });

  // test("Deve fazer um pedido com 4 produtos com moedas diferentes", async function () {
  //   const currencies = new Currencies();
  //   currencies.addCurrency("USD", 2);
  //   currencies.addCurrency("BRL", 1);
  //   // const currencyGatewayStub = sinon.stub(CurrencyGateway.prototype, "getCurrencies").resolves(currencies);
  //   // const mailerSpy = sinon.spy(MailerConsole.prototype, "send");
  //   const input = {
  //     cpf: "987.654.321-00",
  //     email: "rodrigo@branas.io",
  //     items: [
  //       { idProduct: 1, quantity: 1 },
  //       { idProduct: 2, quantity: 1 },
  //       { idProduct: 3, quantity: 3 },
  //       { idProduct: 4, quantity: 1 }
  //     ]
  //   };
  //   // const productData = new ProductDataDatabase();
  //   // const couponData = new CouponDataDatabase();
  //   const productData: ProductData = {
  //     async getProduct(idProduct: number): Promise<any> {
  //       const products: { [idProduct: number]: any } = {
  //         1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3, currency: "BRL" },
  //         2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22, currency: "BRL" },
  //         3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9, currency: "BRL" },
  //         4: { idProduct: 4, description: "D", price: 100, width: 100, height: 30, length: 10, weight: 3, currency: "USD" },

  //       }
  //       return products[idProduct];
  //     }
  //   }
  //   const couponData: CouponData = {
  //     async getCoupon(code: string): Promise<any> {
  //       const coupons: any = {
  //         "VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00") },
  //         "VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00") }
  //       }
  //       return coupons[code];
  //     }
  //   }
  //   const orderData: OrderData = {
  //     async save(order: any): Promise<void> {
  //     },
  //     async getByCpf(cpf: string): Promise<any> {
  //     },
  //     async count(): Promise<number> {
  //       return 1;
  //     }
  //   }
  //   const checkout = new Checkout(productData, couponData, orderData);
  //   const output = await checkout.execute(input);
  //   expect(output.total).toBe(6580);
  //   // expect(mailerSpy.calledOnce).toBeTruthy();
  //   // expect(mailerSpy.calledWith("rodrigo@branas.io", "Checkout Success", "ABCDEF")).toBeTruthy();
  //   currencyGatewayStub.restore();
  //   mailerSpy.restore();
  // });

  // test("Deve fazer um pedido com 4 produtos com moedas diferentes com mock", async function () {
  //   const currencies = new Currencies();
  //   currencies.addCurrency("USD", 2);
  //   currencies.addCurrency("BRL", 1);
  //   const currencyGatewayMock = sinon.mock(CurrencyGateway.prototype)
  //   currencyGatewayMock.expects("getCurrencies")
  //     .once()
  //     .resolves(currencies);
  //   // const mailerMock = sinon.mock(MailerConsole.prototype);
  //   // mailerMock.expects("send")
  //   // 	.once()
  //   // 	.withArgs("rodrigo@branas.io", "Checkout Success", "ABCDEF");
  //   const input = {
  //     cpf: "987.654.321-00",
  //     email: "rodrigo@branas.io",
  //     items: [
  //       { idProduct: 1, quantity: 1 },
  //       { idProduct: 2, quantity: 1 },
  //       { idProduct: 3, quantity: 3 },
  //       { idProduct: 4, quantity: 1 }
  //     ]
  //   };
  //   // const productData = new ProductDataDatabase();
  //   // const couponData = new CouponDataDatabase();
  //   const productData: ProductData = {
  //     async getProduct(idProduct: number): Promise<any> {
  //       const products: { [idProduct: number]: any } = {
  //         1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3, currency: "BRL" },
  //         2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22, currency: "BRL" },
  //         3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9, currency: "BRL" },
  //         4: { idProduct: 4, description: "D", price: 100, width: 100, height: 30, length: 10, weight: 3, currency: "USD" },

  //       }
  //       return products[idProduct];
  //     }
  //   }
  //   const couponData: CouponData = {
  //     async getCoupon(code: string): Promise<any> {
  //       const coupons: any = {
  //         "VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00") },
  //         "VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00") }
  //       }
  //       return coupons[code];
  //     }
  //   }
  //   const orderData: OrderData = {
  //     async save(order: any): Promise<void> {
  //     },
  //     async getByCpf(cpf: string): Promise<any> {
  //     },
  //     async count(): Promise<number> {
  //       return 1;
  //     }
  //   }
  //   const checkout = new Checkout(productData, couponData, orderData);
  //   const output = await checkout.execute(input);
  //   expect(output.total).toBe(6580);
  //   // mailerMock.verify();
  //   // mailerMock.restore();
  //   currencyGatewayMock.verify();
  //   currencyGatewayMock.restore();
  // });

  // test("Deve fazer um pedido com 4 produtos com moedas diferentes com fake", async function () {
  //   const input = {
  //     cpf: "987.654.321-00",
  //     email: "rodrigo@branas.io",
  //     items: [
  //       { idProduct: 1, quantity: 1 },
  //       { idProduct: 2, quantity: 1 },
  //       { idProduct: 3, quantity: 3 },
  //       { idProduct: 4, quantity: 1 }
  //     ]
  //   };
  //   // const productData = new ProductDataDatabase();
  //   // const couponData = new CouponDataDatabase();
  //   const productData: ProductData = {
  //     async getProduct(idProduct: number): Promise<any> {
  //       const products: { [idProduct: number]: any } = {
  //         1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3, currency: "BRL" },
  //         2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22, currency: "BRL" },
  //         3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9, currency: "BRL" },
  //         4: { idProduct: 4, description: "D", price: 100, width: 100, height: 30, length: 10, weight: 3, currency: "USD" },

  //       }
  //       return products[idProduct];
  //     }
  //   }
  //   const couponData: CouponData = {
  //     async getCoupon(code: string): Promise<any> {
  //       const coupons: any = {
  //         "VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00") },
  //         "VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00") }
  //       }
  //       return coupons[code];
  //     }
  //   }
  //   const currencies = new Currencies();
  //   currencies.addCurrency("USD", 2);
  //   currencies.addCurrency("BRL", 1);
  //   const currencyGateway: CurrencyGateway = {
  //     async getCurrencies(): Promise<any> {
  //       return currencies;
  //     }
  //   }
  //   const log: { to: string, subject: string, message: string }[] = [];
  //   const mailer: Mailer = {
  //     async send(to: string, subject: string, message: string): Promise<any> {
  //       log.push({ to, subject, message });
  //     }
  //   }
  //   const orderData: OrderData = {
  //     async save(order: any): Promise<void> {
  //     },
  //     async getByCpf(cpf: string): Promise<any> {
  //     },
  //     async count(): Promise<number> {
  //       return 1;
  //     }
  //   }
  //   const checkout = new Checkout(productData, couponData, orderData, currencyGateway, mailer);
  //   const output = await checkout.execute(input);
  //   expect(output.total).toBe(6580);
  //   // expect(log).toHaveLength(1);
  //   // expect(log[0].to).toBe("rodrigo@branas.io");
  //   // expect(log[0].subject).toBe("Checkout Success");
  //   // expect(log[0].message).toBe("ABCDEF");
  // });

  // test("Deve fazer um pedido com 3 produtos com código do pedido", async function () {
  //   const input = {
  //     cpf: "987.654.321-00",
  //     items: [
  //       { idProduct: 1, quantity: 1 },
  //       { idProduct: 2, quantity: 1 },
  //       { idProduct: 3, quantity: 3 }
  //     ]
  //   };
  //   // const productData = new ProductDataDatabase();
  //   // const couponData = new CouponDataDatabase();
  //   const productData: ProductData = {
  //     async getProduct(idProduct: number): Promise<any> {
  //       const products: { [idProduct: number]: any } = {
  //         1: { idProduct: 1, description: "A", price: 1000, width: 100, height: 30, length: 10, weight: 3 },
  //         2: { idProduct: 2, description: "B", price: 5000, width: 50, height: 50, length: 50, weight: 22 },
  //         3: { idProduct: 3, description: "C", price: 30, width: 10, height: 10, length: 10, weight: 0.9 }
  //       }
  //       return products[idProduct];
  //     }
  //   }
  //   const couponData: CouponData = {
  //     async getCoupon(code: string): Promise<any> {
  //       const coupons: any = {
  //         "VALE20": { code: "VALE20", percentage: 20, expire_date: new Date("2022-12-01T10:00:00") },
  //         "VALE20_EXPIRED": { code: "VALE20_EXPIRED", percentage: 20, expire_date: new Date("2022-10-01T10:00:00") }
  //       }
  //       return coupons[code];
  //     }
  //   }
  //   const orderData: OrderData = {
  //     async save(order: any): Promise<void> {
  //     },
  //     async getByCpf(cpf: string): Promise<any> {
  //     },
  //     async count(): Promise<number> {
  //       return 0;
  //     }
  //   }
  //   const checkout = new Checkout(productData, couponData, orderData);
  //   const output = await checkout.execute(input);
  //   expect(output.code).toBe("202200000001");
  // });
});
