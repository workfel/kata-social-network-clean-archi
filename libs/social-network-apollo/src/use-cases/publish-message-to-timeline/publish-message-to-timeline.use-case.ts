import { Message, Timeline, UserProps } from '@poc-clean-archi-state-management/social-network-core';
import { SocialNetworkState } from '../../domain/cache';
import { TimelineGateway } from '../../gateways/timeline-gateway';


export type PublishMessageToTimelineUseCaseResponse = boolean;

export interface PublishMessageToTimelineUseCaseRequest {
  message: string;
  user: UserProps;
}

export class PublishMessageToTimelineUseCase {

  constructor(private readonly _state: SocialNetworkState, private readonly _timelineGateway: TimelineGateway) {
  }

  async execute({ message, user }: PublishMessageToTimelineUseCaseRequest):
    Promise<PublishMessageToTimelineUseCaseResponse> {
    const timelineVar = this._state.timelineVar();
    const timeline = new Timeline(timelineVar);
    if (!timeline.isMessageValid(message)) {
      this._state.timelineVar({
        ...timelineVar,
        publishErrors: timeline.getMessageError(message)
      });
      return false;
    }

    if (user.name === '') {
      this._state.timelineVar({
        ...timelineVar,
        publishErrors: 'user_empty'
      });
      return false;
    }

    this._state.timelineVar({
      ...timelineVar,
      loading: true
    });
    await this._timelineGateway.publishMessage(message);

    const newMsg = Message.create(user, message);
    timeline.addMessage(newMsg);
    timelineVar.loading = false;
    this._state.timelineVar({
      ...timelineVar,
      messages: timeline.getMessages()
    });
    return true;
  }

}
