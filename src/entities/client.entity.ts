export default class Client {
  constructor(
    readonly name: string,
    readonly document: string
  ) {
    this.validateDocument()
  }

  validateDocument() {
    if (this.document == null || this.document == undefined)
      throw new Error('Undefined document');

    this.document
      .replace('.', '')
      .replace('-', '')
      .replace(" ", '');

    if (this.document.length != 11)
      throw new Error('Document with invalid length');

    [9, 10].forEach((j) => {
      var soma = 0, r;
      this.document.split(/(?=)/).splice(0, j).forEach((e: any, i: any) => {
        soma += parseInt(e) * ((j + 2) - (i + 1));
      });
      r = soma % 11;
      r = (r < 2) ? 0 : 11 - r;
      if (r != Number(this.document.substring(j, j + 1)))
        throw new Error('Invalid document');
    });
  }
}