import { PrismaClient } from '@prisma/client';

export default class PrismaAdapter {
  prisma: any;

  constructor() {
    this.prisma = new PrismaClient({
      log: ['query']
    });
  }

  async connection(): Promise<void> {
    return this.prisma;
  }
}