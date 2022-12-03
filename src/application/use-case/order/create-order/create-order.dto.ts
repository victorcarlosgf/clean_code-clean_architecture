export type CreateOrderInput = {
  customerId: string
  items: OrderItemInput[]
  couponId?: string
}

export type OrderItemInput = {
  productId: string
  quantity: number
}

export type CreateOrderOutput = {}