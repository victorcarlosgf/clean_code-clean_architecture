export default interface IQueueConsumer {
	connect (): Promise<void>;
	close (): Promise<void>;
	consume (exchangeName: string, queueName: string, callback: Function): Promise<void>;
}