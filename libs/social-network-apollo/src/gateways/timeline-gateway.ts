export interface TimelineGateway {
  publishMessage(message: string): Promise<boolean>;
}
