export type CreateOrderInput = {
  customerDocument: string
  items: OrderItemInput[]
  couponId?: string
}

export type OrderItemInput = {
  productId: string
  quantity: number
}

export type CreateOrderOutput = {}