import { TimelineGateway } from '../../../gateways/timeline-gateway';

export class InMemoryTimelineGateway implements TimelineGateway {
  publishMessage(message: string): Promise<boolean> {
    return Promise.resolve(false);
  }

}
