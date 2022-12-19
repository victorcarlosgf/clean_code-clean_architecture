export type CreateOrderInput = {
  customerDocument: string
  items: CreateOrderItemInput[]
  couponCode?: string
}

export type CreateOrderItemInput = {
  productName: string
  quantity: number
}

export type CreateOrderOutput = {}