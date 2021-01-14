import { ApolloClient, gql } from '@apollo/client/core';
import { cache, SocialNetworkState, SocialNetworkStateReactive, timelineVar } from '../../domain/cache';
import {
  PublishMessageToTimelineUseCase,
  PublishMessageToTimelineUseCaseRequest
} from './publish-message-to-timeline.use-case';
import { TimelineGateway } from '../../gateways/timeline-gateway';
import { InMemoryTimelineGateway } from '../../adapters/secondary/gateways/in-memory-timeline-gateway';

describe('Publish message to Timeline', () => {
  const client = new ApolloClient({
    cache,
    connectToDevTools: true
  });
  let socialNetworkState: SocialNetworkState;
  let timelineGateway: TimelineGateway;
  beforeEach(() => {
    socialNetworkState = new SocialNetworkStateReactive();
    timelineGateway = new InMemoryTimelineGateway();
  });


  test('Should not publish empty message', async () => {
    const useCase = new PublishMessageToTimelineUseCase(socialNetworkState, timelineGateway);
    const message: PublishMessageToTimelineUseCaseRequest = { message: '', user: { id: 'John doe' } };
    const response = await useCase.execute(message);
    expect(response).toBe(false);
    expect(timelineVar().messages.length).toBe(0);
  });

  test('Should post a message as John doe', async () => {
    const useCase = new PublishMessageToTimelineUseCase(socialNetworkState, timelineGateway);
    const message: PublishMessageToTimelineUseCaseRequest = { message: 'Salut toi', user: { id: 'John doe' } };
    const response = await useCase.execute(message);
    expect(response).toBe(true);
    expect(timelineVar().messages.length).toBe(1);
    expect(timelineVar().messages).toContain({ content: 'Salut toi' });
  });

});
