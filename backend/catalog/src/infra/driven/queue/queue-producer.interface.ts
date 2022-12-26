export default interface IQueueProducer {
	connect (): Promise<void>;
	close (): Promise<void>;
	publish (exchangeName: string, data: any): Promise<void>;
}