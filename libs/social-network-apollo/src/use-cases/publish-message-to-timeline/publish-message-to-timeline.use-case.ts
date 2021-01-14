import { User } from '@poc-clean-archi-state-management/social-network-core';
import { SocialNetworkState } from '../../domain/cache';
import { TimelineGateway } from '../../gateways/timeline-gateway';


export type PublishMessageToTimelineUseCaseResponse = boolean;

export interface PublishMessageToTimelineUseCaseRequest {
  message: string;
  user: User;
}

export class PublishMessageToTimelineUseCase {

  constructor(private readonly _state: SocialNetworkState, private readonly _timelineGateway: TimelineGateway) {
  }

  async execute({ message, user }: PublishMessageToTimelineUseCaseRequest):
    Promise<PublishMessageToTimelineUseCaseResponse> {
    if (message == '') {
      return false;
    }
    const timeline = this._state.timelineVar();
    await this._timelineGateway.publishMessage(message);


    timeline.messages.push({
      content: message,
      id: Date.now().toString(),
      user
    });
    this._state.timelineVar(timeline);
    return true;
  }

}
