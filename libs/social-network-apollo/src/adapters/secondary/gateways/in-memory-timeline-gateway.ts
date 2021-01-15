import { TimelineGateway } from '../../../gateways/timeline-gateway';

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export class InMemoryTimelineGateway implements TimelineGateway {
  async publishMessage(message: string): Promise<boolean> {

    await timeout(2000);
    return Promise.resolve(false);
  }

}
