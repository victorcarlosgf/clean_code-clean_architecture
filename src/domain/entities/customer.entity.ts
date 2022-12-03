export default class Customer {
  constructor(
    readonly name: string,
    readonly document: string,
    readonly id?: string,
  ) {
    this.validateFields()
    this.validateDocument()
  }

  validateFields() {
    if (!this.name)
      throw new Error('Undefined name');

    if (!this.document)
      throw new Error('Undefined document');
  }

  validateDocument() {
    if (!this.document)
      throw new Error('Undefined document');

    this.document.replace(/\D/g, '');

    if (this.isInvalidLength())
      throw new Error('Document invalid length');

    if (this.allDigitsEqual())
      throw new Error('Document invalid');

    const dg1 = this.calculateDigit(this.document, 10);
    const dg2 = this.calculateDigit(this.document, 11);
    const isInvalid = this.document.slice(9) !== `${dg1}${dg2}`;

    if (isInvalid)
      throw new Error('Document invalid');
  }

  private calculateDigit(document: string, factor: number) {
    let total = 0;
    for (const digit of document) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return (rest < 2) ? 0 : 11 - rest;
  }

  private isInvalidLength() {
    return this.document.length !== 11;
  }

  private allDigitsEqual() {
    const [firstDigit] = this.document;
    return [...this.document].every(digit => digit === firstDigit);
  }
}