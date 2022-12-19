export type SimulateFreightInput = {
  items: SimulateFreightItemInput[]
}

export type SimulateFreightItemInput = {
  productName: string
  quantity: number
}

export type SimulateFreightOutput = {
  data: {
    total: number
  },
  status: number
}