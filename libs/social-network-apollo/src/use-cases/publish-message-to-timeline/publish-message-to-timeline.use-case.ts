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
    timeline.loading = true;
    this._state.timelineVar({
      ...timeline,
      loading: true,
      publishErrors : 'mdidh'
    });
    await this._timelineGateway.publishMessage(message);


    const newMsg = {
      content: `${user.id} : ${message}`,
      id: Date.now().toString(),
      user
    };
    // timeline.messages = [
    //   ...timeline.messages,
    //   timeline.messages.push({
    //     content: `${user.id} : ${message}`,
    //     id: Date.now().toString(),
    //     user
    //   })];
    timeline.loading = false;
    timeline.publishErrors = 'dsksksks';
    this._state.timelineVar({
      ...timeline,
      messages: [...timeline.messages, newMsg]
    });
    return true;
  }

}
