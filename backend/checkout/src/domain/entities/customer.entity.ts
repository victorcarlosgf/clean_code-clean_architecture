export default class Customer {
  constructor(
    readonly name: string,
    readonly document: string,
    readonly email: string,
    readonly id?: string,
    readonly createdAt?: Date
  ) {
    this.document = document;
    this.validateFields()
    this.validateDocument()
  }

  private validateFields() {
    if (!this.name)
      throw new Error('Undefined name');

    if (!this.document)
      throw new Error('Undefined document');

    if (!this.email)
      throw new Error('Undefined email');
  }

  private validateDocument() {
    let tempDocument = this.document;

    tempDocument = tempDocument.replace(/\D/g, '');

    if (this.isInvalidLength(tempDocument))
      throw new Error('Document invalid length');

    if (this.allDigitsEqual(tempDocument))
      throw new Error('Document invalid');

    const dg1 = this.calculateDigit(tempDocument, 10);
    const dg2 = this.calculateDigit(tempDocument, 11);
    const isInvalid = tempDocument.slice(9) !== `${dg1}${dg2}`;

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

  private isInvalidLength(document: string) {
    return document.length !== 11;
  }

  private allDigitsEqual(document: string) {
    const [firstDigit] = document;
    return [...document].every(digit => digit === firstDigit);
  }
}