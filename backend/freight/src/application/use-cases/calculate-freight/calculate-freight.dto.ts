export type CalculateFreightInput = {
  from?: string
  to?: string
  volume: number
  density: number
}

export type CalculateFreightOutput = {
  total: number
}