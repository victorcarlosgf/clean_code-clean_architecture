import IQueueProducer from './queue-producer.interface';
import amqp from 'amqplib';

export default class RabbitMQAdapter implements IQueueProducer {
  connection: any;

  async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost');
  }

  async close(): Promise<void> {
    await this.connection.close();
  }

  async publish(exchangeName: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    channel.publish(exchangeName, '', Buffer.from(JSON.stringify(data)));
  }
}