import { ApolloClient, gql } from '@apollo/client/core';
import { cache, SocialNetworkState, SocialNetworkStateReactive, timelineVar } from '../../domain/cache';
import {
  PublishMessageToTimelineUseCase,
  PublishMessageToTimelineUseCaseRequest
} from './publish-message-to-timeline.use-case';
import { TimelineGateway } from '../../gateways/timeline-gateway';
import { InMemoryTimelineGateway } from '../../adapters/secondary/gateways/in-memory-timeline-gateway';

const GET_TIMELINE = gql`
  query GetTimeline {
    timeline @client {
      messages  {
        content
      }
      loading
    }
  }
`;
describe('Publish message to Timeline', () => {
  let client: ApolloClient<any>;
  let socialNetworkState: SocialNetworkState;
  let timelineGateway: TimelineGateway;
  beforeEach(() => {
    socialNetworkState = new SocialNetworkStateReactive();
    timelineGateway = new InMemoryTimelineGateway();
    const cacheClient = cache;
    client = new ApolloClient({
      cache: cacheClient,
      connectToDevTools: true
    });
  });


  test('Should not publish empty message', async () => {
    const useCase = new PublishMessageToTimelineUseCase(socialNetworkState, timelineGateway);
    const message: PublishMessageToTimelineUseCaseRequest = { message: '', user: { name: 'John doe' } };
    const response = await useCase.execute(message);
    expect(response).toBe(false);
    expect(timelineVar().messages.length).toBe(0);
    expect(timelineVar().publishErrors).toEqual('msg_empty');
  });

  test('Should post a message as John doe', async () => {
    const useCase = new PublishMessageToTimelineUseCase(socialNetworkState, timelineGateway);
    const message: PublishMessageToTimelineUseCaseRequest = { message: 'Salut toi', user: { name: 'John doe' } };
    const response = await useCase.execute(message);
    expect(response).toBe(true);
    expect(timelineVar().messages.length).toBe(1);
    expect(timelineVar().messages[0].content).toContain('Salut toi');
    expect(timelineVar().messages[0].user.name).toContain('John doe');
  });
  test('Should not post a message as Unknow user', async () => {
    const useCase = new PublishMessageToTimelineUseCase(socialNetworkState, timelineGateway);
    const message: PublishMessageToTimelineUseCaseRequest = { message: 'Salut toi', user: { name: '' } };
    const response = await useCase.execute(message);
    expect(response).toBe(false);
    expect(timelineVar().publishErrors).toContain('user_empty');
  });
});
