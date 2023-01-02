export type CreateOrderInput = {
  customerDocument: string
  items: CreateOrderItemInput[]
  couponCode?: string
  from?: string
  to?: string
};

export type CreateOrderItemInput = {
  productName: string
  quantity: number
};

export type CreateOrderOutput = {
  data: any
  status: number
};