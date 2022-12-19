export type CreateCustomerInput = {
  name: string
  document: string
  email: string
}

export type CreateCustomerOutput = {
  name: string
  document: string
  email: string
  createdAt: string
}