import IQueueConsumer from './queue-consumer.interface';
import amqp from 'amqplib';

export default class RabbitMQAdapter implements IQueueConsumer {
  connection: any;

  async connect(): Promise<void> {
    this.connection = await amqp.connect('amqp://localhost');
  }

  async close(): Promise<void> {
    await this.connection.close();
  }

  async consume(exchangeName: string, queueName: string, callback: Function): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertExchange(exchangeName, 'direct', { durable: true });
    await channel.assertQueue(queueName, { durable: true });
    await channel.bindQueue(queueName, exchangeName, '');
    await channel.consume(queueName, async function (msg: any) {
      await callback(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    });
  }
}