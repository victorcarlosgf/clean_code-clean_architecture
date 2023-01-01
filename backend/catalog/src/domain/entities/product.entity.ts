export type Dimension = {
  width: number
  height: number
  length: number
};

export default class Product {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly dimension: Dimension,
    readonly weight: number,
    readonly value: number,
    readonly currency: string = 'BRL',
    readonly currencyValue: number = 1,
  ) {
    this.validateFields();
  }

  validateFields() {
    if (!this.name)
      throw new Error('Undefined name');

    if (!this.description)
      throw new Error('Undefined description');

    if (!this.dimension)
      throw new Error('Undefined dimension');

    if (!this.weight)
      throw new Error('Undefined weight');

    if (!this.value)
      throw new Error('Undefined value');
  }

  getTotal(): number {
    return this.value * this.currencyValue;
  }

  getVolume(): number {
    return (this.dimension.width / 100)
      * (this.dimension.height / 100)
      * (this.dimension.length / 100);
  }

  getDensity(): number {
    return this.weight / this.getVolume();
  }
}