export default class Product {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly volume: number,
    readonly density: number,
    readonly value: number,
    readonly id?: string,
  ) {
    this.validateFields()
  }

  validateFields() {
    if (!this.name)
      throw new Error('Undefined name');

    if (!this.description)
      throw new Error('Undefined description');

    if (!this.volume)
      throw new Error('Undefined volume');

    if (!this.density)
      throw new Error('Undefined density');

    if (!this.value)
      throw new Error('Undefined value');
  }
}