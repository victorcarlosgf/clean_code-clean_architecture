export type CreateProductInput = {
  name: string
  description: string
  dimension: CreateProductDimensionInput
  weight: number
  value: number
  currency: string
}

export type CreateProductDimensionInput = {
  width: number
  height: number
  length: number
}